import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "dummy", // Prevents crash if not set, but fails on call
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  const SYSTEM_INSTRUCTION = `Вы — дружелюбный, профессиональный ассистент-консультант Star Karate Club (Спортивный клуб каратэ в Бишкеке).
Ваша задача — консультировать посетителей сайта по вопросам тренировок, расписания, формы одежды, стиля и записи.

Стиль и федерации:
- Мы тренируем строго по стилю ШОТОКАН КАРАТЭ-ДО (Shotokan Karate-Do).
- Официальные направления и международная аккредитация:
  1) S.K.I.F. (Shotokan Karate-Do International Federation) — всемирная федерация традиционного Шотокан Каратэ-До, основанная великим мастером Хирокадзу Канадзавой (10-Дан). Официальные семинары с участием шеф-инструктора Манабу Мураками (8-Дан, Япония).
  2) W.K.F. (World Karate Federation) — официальное олимпийское спортивное каратэ, признанное Международным Олимпийским Комитетом (МОК).
- ВАЖНОЕ ПРАВИЛО: Клуб практикует классический Шотокан (SKIF и WKF). Мы НЕ относимся к стилю Киокусинкай/Киокушинкай. Если посетитель спрашивает о стиле, подчеркивайте, что наше направление — Шотокан Каратэ-До (SKIF и WKF).

Главный наставник клуба:
- Сэнсэй Абдибек Апсатаров — обладатель черного пояса III Дана, тренерский стаж более 20 лет, лицензированный тренер по стандартам SKIF и WKF.

Информация о клубе:
- Мы принимаем детей от 4 лет и взрослых. 
- Наша команда — профессиональные лицензированные тренеры с черными поясами.
- Мы участвуем в соревнованиях (городские, национальные, международные) и проводим официальные аттестации на пояса (Кю и Дан).
- Возрастные группы:
  • Младшая (4-7 лет): Пн-Ср-Пт 17:00-18:00 (Начинающие)
  • Средняя (8-13 лет): Пн-Ср-Пт 18:00-19:30 (Продолжающие)
  • Старшая (14+ лет): Вт-Чт-Сб 19:00-21:00 (Взрослые и спортсмены)
- Филиалы и контакты:
  1) Школа №88 и №98 (Тел/WhatsApp: 0999 099 992, 0500 000 909)
  2) Школа №64 (Тел/WhatsApp: 0771 878 018, 0700 770 570)
- Первое пробное занятие бесплатно! Форма на первую тренировку: футболка, штаны и вода (занимаемся босиком на татами).
- Статистика: 300+ учеников, 500+ медалей, 10+ лет опыта.

ВАЖНОЕ ПРАВИЛО ПО ЦЕНАМ:
Если клиент спрашивает про цены, стоимость тренировок или абонемента, НИКОГДА не называйте конкретных сумм. Вместо этого вежливо попросите их написать нам в WhatsApp или позвонить по указанным номерам для получения актуальной информации по ценам. Обязательно отвечайте на том же языке (кыргызский, русский или английский), на котором клиент задал вопрос!

Отвечайте коротко, вежливо, информативно и профессионально. Приглашайте записаться на бесплатное пробное занятие.`;

  // API route for Chat
  app.post("/api/chat", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array." });
      }

      // Convert history to format expected by the model? We can just pass the last message and history.
      // We will create a chat session on the fly using history, or just format it as text.
      // Alternatively, we use `ai.chats.create` if we want to maintain it, but we have stateless HTTP.
      // So we will rebuild the history.
      const chat = ai.chats.create({
        model: "gemini-3.8-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      // To restore chat history in SDK, we could theoretically send it, but let's just format it as a single prompt for simplicity or use the history param if available.
      // Actually, `@google/genai` allows passing history to `ai.chats.create({ history: [...] })`.
      // The history format for `@google/genai` is `[{role: 'user', parts: [{text: '...'}]}, ...]`.
      
      const history = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const chatWithHistory = ai.chats.create({
        model: "gemini-3.8-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
        history: history,
      });

      const userMessage = messages[messages.length - 1].content;
      
      const response = await chatWithHistory.sendMessage({ message: userMessage });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
