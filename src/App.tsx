import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Menu, X, Instagram, MapPin, Phone, ChevronRight, ChevronLeft, ZoomIn, ZoomOut, Maximize2, Star, ShieldCheck, Trophy, Clock, Play, Globe, ChevronDown, Users, Medal, Calendar, MessageCircle, Send, Sparkles, Flame, Award, Dumbbell, Target, CheckCircle2, Quote } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import heroBg from './assets/images/karate_hero_bg_1788985129841.jpg'; 
import heroActionImg from './assets/images/karate_hero_action_1791655192206.jpg';
import senseiImg from './assets/images/coach_sensei_abdibek.jpeg';
import punchImg from './assets/images/karate_punch_head_1789071481673.jpg';
import kickImg from './assets/images/karate_kick_head_1789071498791.jpg';

const translations = {
  ky: {
    navAbout: 'Клуб жөнүндө',
    navSchedule: 'Жадыбал',
    navGallery: 'Галерея',
    navVideo: 'Видео',
    navContacts: 'Байланыш',
    navBook: 'Жазылуу',
    heroTag: 'Кесипкөй каратэ клубу',
    heroSingleTitle: 'Чеберчиликке карай жол дал ушул жерден башталат',
    heroTitle1: 'Чеберчиликке',
    heroTitleHighlight: 'карай жол',
    heroTitle2: 'дал ушул жерден башталат',
    heroDesc: 'Star Karate Club — жөн гана спорт эмес. Бул — бекем тартип, өзүнө болгон ишеним жана күчтүү чөйрө.',
    heroStart: 'Машыгууну баштоо',
    heroMore: 'Кененирээк',
    heroFree: 'Биринчи машыгуу акысыз',
    heroBranchHeader: 'Бишкектеги филиалдар жана түз байланыш',
    heroBranch1Schedule: 'Дш, Шр, Жм · 17:00 баштап',
    heroBranch2Schedule: 'Шш, Бш, Иш · 18:00 баштап',
    heroQuickSchedTitle: 'Тайпалар жана курактар',
    heroTrialBanner: '1-машыгуу акысыз · Кимоно талап кылынбайт',
    featTitle1: 'Эмне үчүн бизди',
    featTitleHighlight: 'тандашат',
    featDesc: 'Биз ар бир окуучунун ар тараптуу өнүгүүсү, рухун жана денесин чыңдоосу үчүн бардык шарттарды түзөбүз.',
    feat1Title: 'Кесипкөйлүк',
    feat1Desc: 'Кара кур ээлери болгон жана балдар менен чоңдорго сабак берүүдө көп жылдык тажрыйбасы бар лицензияланган машыктыруучулар.',
    feat2Title: 'Мелдештер',
    feat2Desc: 'Шаардык, республикалык жана эл аралык деңгээлдеги турнирлерге үзгүлтүксүз катышуу.',
    feat3Title: 'Аттестациялар',
    feat3Desc: 'Курларга расмий сынактар, спорттук жыйындар жана чеберлер менен өтүүчү семинарлар.',
    schedTitle1: 'Биздин',
    schedTitleHighlight: 'Жадыбал',
    schedDesc: 'Жашыңызга жана даярдык деңгээлиңизге жараша ылайыктуу тайпаны тандаңыз.',
    sched1Age: 'Кенже тайпа (4-7 жаш)',
    sched1Days: 'Дш, Шр, Жм',
    sched1Level: 'Жаңы баштагандар',
    sched2Age: 'Орто тайпа (8-13 жаш)',
    sched2Days: 'Дш, Шр, Жм',
    sched2Level: 'Улантуучулар',
    sched3Age: 'Улуу тайпа (14+ жаш)',
    sched3Days: 'Шш, Бш, Иш',
    sched3Level: 'Чоңдор жана спортчулар',
    schedTime: 'СААТЫ',
    schedCapacityTitle: 'Тайпанын толушу',
    schedEnrolledOf: 'орун толук',
    schedSpotsLeft: 'бош орун',
    schedSpotsOnly: 'гана орун калды!',
    schedSpotsLimited: 'Орундар чектелүү · Кабыл алуу жүрүүдө',
    schedHurry: 'Шашылыңыз',
    schedBookSpot: 'Орун ээлөө',
    galTitle1: 'Биздин',
    galTitleHighlight: 'Галерея',
    galDesc: 'Машыгуулардан, мелдештерден жана аттестациялардан алынган жаркын ирмемдер.',
    galZoomHint: 'Чоңойтуу үчүн басыңыз',
    galClose: 'Жабуу (Esc)',
    galNext: 'Кийинки сүрөт',
    galPrev: 'Мурунку сүрөт',
    vidTitle1: 'Видео',
    vidTitleHighlight: 'көрүү',
    vidDesc: 'Биздин машыгуулардын атмосферасын сезиңиз.',
    vidFallback: 'Браузериңиз видеону колдобойт.',
    bookTitle1: 'Бүгүн биринчи',
    bookTitleHighlight: 'кадамды',
    bookTitle2: 'таштаңыз',
    bookDesc: 'Акысыз сыноо машыгуусуна өтүнмө калтырыңыз. Биздин менеджер ыңгайлуу убакытты тандоо жана суроолорго жооп берүү үчүн сиз менен байланышат.',
    school1: '№88 жана №98 мектеп',
    school2: '№64 мектеп',
    formTitle: 'Онлайн-жазылуу',
    formName: 'Окуучунун аты-жөнү',
    formNamePl: 'Мисалы, Азамат',
    formPhone: 'Ата-эненин / өзүңүздүн телефонуңуз',
    formAge: 'Жашы',
    formAgePl: 'Мисалы, 8',
    formExp: 'Тажрыйбасы',
    formExp1: 'Жаңы баштаган',
    formExp2: 'Мурда машыккан',
    formBtn: 'Сыноо машыгуусуна жазылуу',
    formBtnSuccess: 'Өтүнмө жөнөтүлдү!',
    footerRights: 'Бардык укуктар корголгон.',
    statStudents: 'Окуучулар',
    statMedals: 'Медалдар',
    statExp: 'Жылдык тажрыйба',
    statBranches: 'Зал Бишкекте',
    coachTitle1: 'Биздин башкы',
    coachTitleHighlight: 'машыктыруучу',
    coachDesc: 'Көп жылдык тажрыйбасы бар, эл аралык деңгээлдеги кара кур устаттары.',
    coachName: 'Сэнсэй Абдибек Апсатаров',
    coachRank: 'Кара кур, III Дан · 20+ жылдык тажрыйба',
    coachBio: 'Кыргыз Республикасынын тажрыйбалуу сэнсэйи, кара кур III Дан ээси, 20 жылдан ашык машыктыруучулук стажы бар. Традициялык Шотокан Каратэ-До (SKIF) жана олимпиадалык спорттук WKF стандарттары боюнча машыктырат. Шаардык жана эл аралык мелдештердин чемпиондорун, ондогон кара кур ээлерин тарбиялаган башкы устат.',
    coachBadge1: 'SKIF & WKF Аккредитациясы',
    coachBadge2: 'Жеке мамиле',
    coachBadge3: 'Балдар психологиясы',
    calcTitle1: 'Машыгууну',
    calcTitleHighlight: 'тандоо',
    calcDesc: 'Жашыңызга жараша программаны жана ыңгайлуу убакытты көрүңүз.',
    calcTabKids: 'Балдар (4-7 жаш)',
    calcTabTeens: 'Өспүрүмдөр (8-13 жаш)',
    calcTabAdults: 'Чоңдор (14+ жаш)',
    whatsappQuick: 'WhatsApp аркылуу жазылуу',
    quickCall: 'Түз чалуу',
    badgeTopClub: 'Бишкектеги алдыңкы каратэ мектеби',
    badgeLicensed: 'Шотокан Каратэ-До · SKIF & WKF',
    faqTitle: 'Көп берилүүчү',
    faqTitleHighlight: 'суроолор',
    faq1Q: 'Кайсы курактан баштап кабыл аласыздар?',
    faq1A: 'Биз балдарды 4 жаштан баштап кабыл алабыз. Бул куракта алар кыймыл-аракетти жана тартипти мыкты өздөштүрүшөт.',
    faq2Q: 'Биринчи машыгууга эмне керек?',
    faq2A: 'Баштоо үчүн ыңгайлуу спорттук кийим (футболка жана шым) жана суу жетиштүү. Татамиде жылаңайлак машыгабыз.',
    faq3Q: 'Карате кыздарга туура келеби?',
    faq3A: 'Албетте! Карате ийкемдүүлүктү, өзүнө болгон ишенимди жана ар бир адамга пайдалуу болгон өзүн-өзү коргоо көндүмдөрүн өнүктүрөт.',
    faq4Q: 'Балдар мелдештерге катышабы?',
    faq4A: 'Ооба, биздин окуучулар дайыма шаардык жана эл аралык турнирлерге катышып турушат, бирок катышуу ар дайым өз каалоосу боюнча болот.',
    chatTitle: 'Star Karate консультанты',
    chatPlaceholder: 'Сурооңузду жазыңыз...',
    chatInitial: 'Саламатсызбы! Мен Star Karate Club клубунун онлайн жардамчысымын. Кандай жардам бере алам? Жадыбал же машыгуулар тууралуу сурасаңыз болот!',
    navReviews: 'Пикирлер',
    reviewsTitle1: 'Ата-энелер жана',
    reviewsTitleHighlight: 'окуучулардын пикирлери',
    reviewsDesc: 'Биздин клуб жөнүндө тарбиялануучулардын жана алардын ата-энелеринин чын жүрөктөн чыккан ой-пикирлери.',
    reviewsRatingLabel: 'Орточо баа',
    reviewsRatingVal: '4.9',
    reviewsTotalCount: '120+ канааттанган үй-бүлө',
    reviewsTrustBadge: '100% сунушталган клуб',
    reviewsVerified: 'Тастыкталган пикир',
    reviewsAllTab: 'Бардык пикирлер',
    reviewsParentsTab: 'Ата-энелер',
    reviewsStudentsTab: 'Окуучулар',
    reviewsCtaText: 'Балаңыздын күчтүү, өзүнө ишенимдүү жана тартиптүү болушун каалайсызбы?',
    reviewsCtaBtn: 'Акысыз машыгууга жазылуу',
    fedTag: 'Расмий багыттар жана стандарттар',
    fedTitle1: 'Шотокан Каратэ-До ·',
    fedTitleHighlight: 'SKIF жана WKF',
    fedDesc: 'Star Karate Club эки дүйнөлүк системаны айкалыштырат: Япониянын салттуу Шотокан мектебин (SKIF) жана Олимпиадалык спорттук каратэни (WKF).',
    fedShotokanTitle: 'Шотокан Каратэ-До',
    fedShotokanSub: 'Япониянын салттуу Будо мектеби (松濤館)',
    fedShotokanBadge: 'Негизги стиль',
    fedShotokanDesc: 'Гитин Фунакоси негиздеген классикалык дүйнөлүк стиль. Кихон (базалык соккулар), Ката (формалар) жана Кумитэнин (таймаш) гармониясы.',
    fedShotokanP1: 'Бекем туруктуу стойкалар (Дзенкуцу, Киба-дати) жана күчтүү сызыктуу соккулар',
    fedShotokanP2: 'Ката аркылуу координацияны, тырышчаактыкты жана дем алууну терең өздөштүрүү',
    fedShotokanP3: 'Додзё-кун этикасы: тартип, өз ара сый-урмат жана күчтүү рухий мүнөз тарбиялоо',
    fedSkifTitle: 'SKIF Федерациясы',
    fedSkifSub: 'Shotokan Karate-Do International Federation (國際松濤館)',
    fedSkifBadge: 'Эл аралык салт',
    fedSkifDesc: 'Улуу устат Хирокадзу Канадзава (10-Дан) негиздеген эң кадыр-барктуу бүткүл дүйнөлүк федерация.',
    fedSkifP1: 'Шеф-инструктор Сюсэки Сихан Манабу Мураками (8-Дан, Япония) менен расмий мастер-класстар',
    fedSkifP2: 'Японияда катталган эл аралык деңгээлдеги Кю жана Дан аттестациялары',
    fedSkifP3: 'Салттуу япониялык Будо философиясын жана анык күрөш техникасын сактоо',
    fedWkfTitle: 'WKF Федерациясы',
    fedWkfSub: 'World Karate Federation (Олимпиадалык спорт)',
    fedWkfBadge: 'Олимпиадалык спорт',
    fedWkfDesc: 'Эл аралык Олимпиада Комитети (МОК) тарабынан расмий таанылган дүйнөдөгү жалгыз каратэ федерациясы.',
    fedWkfP1: 'Олимпиадалык стандарттар боюнча спорттук кумитэ жана ката даярдыгы',
    fedWkfP2: 'Бишкек шаардык, Кыргызстандын жана эл аралык расмий чемпионаттарга катышуу',
    fedWkfP3: 'Электрондук калыстык, жогорку ылдамдык жана коопсуз профессионалдык экипировка',
    fedSynergyTitle: 'Эки багыттын айкалышы',
    fedSynergyDesc: 'Биздин окуучулар тандоо жасоого муктаж эмес: алар салттуу Шотокандын (SKIF) бекем тартиби менен бирге заманбап WKF олимпиадалык мелдештерде медалдарды жеңип алышат.',
  },
  ru: {
    navAbout: 'О клубе',
    navSchedule: 'Расписание',
    navGallery: 'Галерея',
    navVideo: 'Видео',
    navContacts: 'Контакты',
    navBook: 'Записаться',
    heroTag: 'Профессиональная спортивная команда',
    heroSingleTitle: 'Путь к совершенству начинается здесь',
    heroTitle1: 'Путь к',
    heroTitleHighlight: 'совершенству',
    heroTitle2: 'начинается здесь',
    heroDesc: 'Star Karate Club — это не просто спорт. Это дисциплина, уверенность в себе и сильное окружение.',
    heroStart: 'Начать тренировки',
    heroMore: 'Подробнее',
    heroFree: 'Первое занятие бесплатно',
    heroBranchHeader: 'Залы тренировок в Бишкеке и контакты',
    heroBranch1Schedule: 'Пн, Ср, Пт · с 17:00',
    heroBranch2Schedule: 'Вт, Чт, Сб · с 18:00',
    heroQuickSchedTitle: 'Группы и возраст',
    heroTrialBanner: '1-е занятие бесплатно · Кимоно не обязательно',
    featTitle1: 'Почему выбирают',
    featTitleHighlight: 'нас',
    featDesc: 'Мы создаем все условия для гармоничного развития, укрепления духа и тела каждого ученика.',
    feat1Title: 'Профессионализм',
    feat1Desc: 'Лицензированные тренеры с черными поясами и многолетним опытом работы с детьми и взрослыми.',
    feat2Title: 'Соревнования',
    feat2Desc: 'Регулярное участие в турнирах городского, национального и международного уровней.',
    feat3Title: 'Аттестации',
    feat3Desc: 'Официальные экзамены на пояса, спортивные сборы и семинары с мастерами.',
    schedTitle1: 'Наше',
    schedTitleHighlight: 'Расписание',
    schedDesc: 'Выберите подходящую группу в зависимости от возраста и уровня подготовки.',
    sched1Age: 'Младшая группа (4-7 лет)',
    sched1Days: 'Пн, Ср, Пт',
    sched1Level: 'Начинающие',
    sched2Age: 'Средняя группа (8-13 лет)',
    sched2Days: 'Пн, Ср, Пт',
    sched2Level: 'Продолжающие',
    sched3Age: 'Старшая группа (14+ лет)',
    sched3Days: 'Вт, Чт, Сб',
    sched3Level: 'Взрослые и спортсмены',
    schedTime: 'ЧАС',
    schedCapacityTitle: 'Заполненность группы',
    schedEnrolledOf: 'мест занято',
    schedSpotsLeft: 'мест',
    schedSpotsOnly: 'места осталось!',
    schedSpotsLimited: 'Ограниченный набор · Места тают',
    schedHurry: 'Успейте записаться',
    schedBookSpot: 'Забронировать место',
    galTitle1: 'Наша',
    galTitleHighlight: 'Галерея',
    galDesc: 'Яркие моменты с тренировок, соревнований и аттестаций.',
    galZoomHint: 'Нажмите для увеличения',
    galClose: 'Закрыть (Esc)',
    galNext: 'Следующее фото',
    galPrev: 'Предыдущее фото',
    vidTitle1: 'Смотреть',
    vidTitleHighlight: 'Видео',
    vidDesc: 'Погрузитесь в атмосферу наших тренировок.',
    vidFallback: 'Ваш браузер не поддерживает видео.',
    bookTitle1: 'Сделай первый',
    bookTitleHighlight: 'шаг',
    bookTitle2: 'сегодня',
    bookDesc: 'Оставьте заявку на бесплатное пробное занятие. Наш менеджер свяжется с вами, чтобы подобрать удобное время и ответить на вопросы.',
    school1: 'Школа №88 и №98',
    school2: 'Школа №64',
    formTitle: 'Онлайн-запись',
    formName: 'Имя ученика',
    formNamePl: 'Алексей Иванов',
    formPhone: 'Телефон родителя / ваш',
    formAge: 'Возраст',
    formAgePl: 'Например, 8',
    formExp: 'Опыт',
    formExp1: 'Новичок',
    formExp2: 'Занимался ранее',
    formBtn: 'Записаться на пробное',
    formBtnSuccess: 'Заявка отправлена!',
    footerRights: 'Все права защищены.',
    statStudents: 'Учеников',
    statMedals: 'Медалей',
    statExp: 'Лет опыта',
    statBranches: 'Филиала в Бишкеке',
    coachTitle1: 'Наш главный',
    coachTitleHighlight: 'тренер',
    coachDesc: 'Опытные наставники международного класса с черными поясами.',
    coachName: 'Сэнсэй Абдибек Апсатаров',
    coachRank: 'Черный пояс, III Дан · Более 20 лет тренерского стажа',
    coachBio: 'Опытный наставник, обладатель черного пояса III Дана со стажем более 20 лет. Обучает традиционному Шотокан Каратэ-До по стандартам международной федерации SKIF и олимпийскому спортивному каратэ WKF. Воспитал плеяду победителей городских и международных турниров, чемпионов и десятков обладателей черных поясов.',
    coachBadge1: 'Аккредитация SKIF & WKF',
    coachBadge2: 'Индивидуальный подход',
    coachBadge3: 'Детская психология',
    calcTitle1: 'Выберите',
    calcTitleHighlight: 'направление',
    calcDesc: 'Узнайте программу и расписание в зависимости от возраста.',
    calcTabKids: 'Дети (4-7 лет)',
    calcTabTeens: 'Подростки (8-13 лет)',
    calcTabAdults: 'Взрослые (14+ лет)',
    whatsappQuick: 'Записаться через WhatsApp',
    quickCall: 'Позвонить тренеру',
    badgeTopClub: 'Ведущий карате-клуб Бишкека',
    badgeLicensed: 'Шотокан Каратэ-До · SKIF & WKF',
    faqTitle: 'Часто задаваемые',
    faqTitleHighlight: 'вопросы',
    faq1Q: 'В каком возрасте лучше начинать?',
    faq1A: 'Мы принимаем детей от 4 лет. В этом возрасте они отлично усваивают координацию и дисциплину.',
    faq2Q: 'Что нужно взять на первую тренировку?',
    faq2A: 'Для начала достаточно удобной спортивной формы (футболка и штаны) и бутылки воды. Занимаемся босиком на татами.',
    faq3Q: 'Подходит ли карате для девочек?',
    faq3A: 'Абсолютно! Карате развивает гибкость, уверенность в себе и навыки самообороны, которые полезны каждому.',
    faq4Q: 'Участвуют ли дети в соревнованиях?',
    faq4A: 'Да, наши ученики регулярно выезжают на городские и международные турниры, но участие всегда по желанию.',
    chatTitle: 'Консультант Star Karate',
    chatPlaceholder: 'Напишите ваш вопрос...',
    chatInitial: 'Здравствуйте! Я интеллектуальный помощник Star Karate Club. Чем могу помочь? Спрашивайте про расписание, цены или тренировки!',
    navReviews: 'Отзывы',
    reviewsTitle1: 'Отзывы родителей',
    reviewsTitleHighlight: 'и учеников',
    reviewsDesc: 'Честные истории успехов, впечатления родителей и реальные достижения воспитанников клуба.',
    reviewsRatingLabel: 'Средняя оценка',
    reviewsRatingVal: '4.9',
    reviewsTotalCount: '120+ довольных семей',
    reviewsTrustBadge: '100% рекомендаций',
    reviewsVerified: 'Проверенный отзыв',
    reviewsAllTab: 'Все отзывы',
    reviewsParentsTab: 'Родители',
    reviewsStudentsTab: 'Ученики',
    reviewsCtaText: 'Хотите, чтобы ваш ребенок тоже рос сильным, уверенным в себе и дисциплинированным?',
    reviewsCtaBtn: 'Записаться на пробное занятие',
    fedTag: 'Официальные стандарты и федерации',
    fedTitle1: 'Шотокан Каратэ-До ·',
    fedTitleHighlight: 'SKIF и WKF',
    fedDesc: 'Star Karate Club объединяет две сильнейшие мировые системы: вековые традиции японского Шотокан (SKIF) и признанное олимпийское спортивное каратэ (WKF).',
    fedShotokanTitle: 'Шотокан Каратэ-До',
    fedShotokanSub: 'Традиционное боевое искусство Японии (松濤館)',
    fedShotokanBadge: 'Базовый стиль',
    fedShotokanDesc: 'Классический всемирно признанный стиль, основанный великим мастером Гитином Фунакоси. Гармония Кихон (база), Ката (формы) и Кумитэ (спарринг).',
    fedShotokanP1: 'Низкие устойчивые стойки (Дзенкуцу, Киба-дати), контроль дистанции и мощные взрывные удары',
    fedShotokanP2: 'Отработка традиционных ката — координация, концентрация и глубинная биомеханика',
    fedShotokanP3: 'Кодекс Додзё-кун: железная самодисциплина, уважение к старшим и соперникам, закалка характера',
    fedSkifTitle: 'Федерация SKIF',
    fedSkifSub: 'Shotokan Karate-Do International Federation (國際松濤館)',
    fedSkifBadge: 'Мировое наследие',
    fedSkifDesc: 'Всемирная федерация традиционного шотокан каратэ-до, основанная легендарным мастером Хирокадзу Канадзава (10-й Дан).',
    fedSkifP1: 'Официальные международные семинары под руководством Сюсэки Сихана Манабу Мураками (8-й Дан, Япония)',
    fedSkifP2: 'Официальная аттестация на пояса (Кю и Дан) с регистрацией в Японии и выдачей международных дипломов',
    fedSkifP3: 'Сохранение философии будо, духовной глубины и подлинной боевой эффективности',
    fedWkfTitle: 'Федерация WKF',
    fedWkfSub: 'World Karate Federation (Олимпийский спорт)',
    fedWkfBadge: 'Олимпийский спорт',
    fedWkfDesc: 'Единственная организация каратэ, официально признанная Международным Олимпийским Комитетом (МОК).',
    fedWkfP1: 'Спортивная подготовка по правилам олимпийского соревновательного кумитэ и ката',
    fedWkfP2: 'Прямой выход на городские, национальные, азиатские и мировые официальные турниры',
    fedWkfP3: 'Сертифицированное судейство WKF, электронная фиксация очков и максимальная безопасность спортсмена',
    fedSynergyTitle: 'Слияние традиции и олимпийского спорта',
    fedSynergyDesc: 'Воспитанники Star Karate Club получают непревзойденную базу: твердость духа и технику традиционного Шотокан (SKIF) вместе со скоростью, медалями и спортивными званиями WKF.',
  },
  en: {
    navAbout: 'About',
    navSchedule: 'Schedule',
    navGallery: 'Gallery',
    navVideo: 'Video',
    navContacts: 'Contacts',
    navBook: 'Sign Up',
    heroTag: 'Professional sports team',
    heroSingleTitle: 'The path to perfection begins here',
    heroTitle1: 'The path to',
    heroTitleHighlight: 'perfection',
    heroTitle2: 'begins here',
    heroDesc: 'Star Karate Club is more than just a sport. It is discipline, self-confidence, and a strong community.',
    heroStart: 'Start Training',
    heroMore: 'Learn More',
    heroFree: 'First lesson is free',
    heroBranchHeader: 'Training Dojos in Bishkek & Contacts',
    heroBranch1Schedule: 'Mon, Wed, Fri · from 17:00',
    heroBranch2Schedule: 'Tue, Thu, Sat · from 18:00',
    heroQuickSchedTitle: 'Groups & Ages',
    heroTrialBanner: '1st lesson free · No uniform required',
    featTitle1: 'Why choose',
    featTitleHighlight: 'us',
    featDesc: 'We create all conditions for the harmonious development, strengthening of the spirit and body of each student.',
    feat1Title: 'Professionalism',
    feat1Desc: 'Licensed trainers with black belts and years of experience working with children and adults.',
    feat2Title: 'Competitions',
    feat2Desc: 'Regular participation in city, national, and international tournaments.',
    feat3Title: 'Grading',
    feat3Desc: 'Official belt exams, sports camps, and seminars with masters.',
    schedTitle1: 'Our',
    schedTitleHighlight: 'Schedule',
    schedDesc: 'Choose the right group depending on age and skill level.',
    sched1Age: 'Junior group (4-7 years)',
    sched1Days: 'Mon, Wed, Fri',
    sched1Level: 'Beginners',
    sched2Age: 'Middle group (8-13 years)',
    sched2Days: 'Mon, Wed, Fri',
    sched2Level: 'Intermediate',
    sched3Age: 'Senior group (14+ years)',
    sched3Days: 'Tue, Thu, Sat',
    sched3Level: 'Adults and athletes',
    schedTime: 'TIME',
    schedCapacityTitle: 'Group Capacity',
    schedEnrolledOf: 'spots filled',
    schedSpotsLeft: 'spots',
    schedSpotsOnly: 'spots left!',
    schedSpotsLimited: 'Limited spots · Enrollment open',
    schedHurry: 'Hurry up',
    schedBookSpot: 'Reserve a spot',
    galTitle1: 'Our',
    galTitleHighlight: 'Gallery',
    galDesc: 'Bright moments from trainings, competitions, and gradings.',
    galZoomHint: 'Click to enlarge',
    galClose: 'Close (Esc)',
    galNext: 'Next photo',
    galPrev: 'Previous photo',
    vidTitle1: 'Watch',
    vidTitleHighlight: 'Video',
    vidDesc: 'Immerse yourself in the atmosphere of our training.',
    vidFallback: 'Your browser does not support video.',
    bookTitle1: 'Take the first',
    bookTitleHighlight: 'step',
    bookTitle2: 'today',
    bookDesc: 'Leave a request for a free trial lesson. Our manager will contact you to arrange a convenient time and answer your questions.',
    school1: 'School #88 and #98',
    school2: 'School #64',
    formTitle: 'Online Booking',
    formName: 'Student name',
    formNamePl: 'Alex Smith',
    formPhone: 'Parent / your phone',
    formAge: 'Age',
    formAgePl: 'e.g., 8',
    formExp: 'Experience',
    formExp1: 'Beginner',
    formExp2: 'Trained before',
    formBtn: 'Book a trial',
    formBtnSuccess: 'Request sent!',
    footerRights: 'All rights reserved.',
    statStudents: 'Students',
    statMedals: 'Medals',
    statExp: 'Years Exp.',
    statBranches: 'Dojos in Bishkek',
    coachTitle1: 'Our Head',
    coachTitleHighlight: 'Sensei',
    coachDesc: 'Experienced international-class black belt masters.',
    coachName: 'Sensei Abdibek Apsatarov',
    coachRank: 'Black Belt, 3rd Dan · Over 20 Years Experience',
    coachBio: 'Experienced head sensei and 3rd Dan black belt holder with over 20+ years of coaching mastery. Expert in authentic traditional Shotokan Karate-Do under SKIF standards and Olympic sport karate under WKF rules, raising numerous national champions and black belt masters.',
    coachBadge1: 'SKIF & WKF Accredited',
    coachBadge2: 'Personal Approach',
    coachBadge3: 'Youth Psychology',
    calcTitle1: 'Choose Your',
    calcTitleHighlight: 'Program',
    calcDesc: 'Find out the optimal training schedule and focus based on age.',
    calcTabKids: 'Kids (4-7 yo)',
    calcTabTeens: 'Teens (8-13 yo)',
    calcTabAdults: 'Adults (14+ yo)',
    whatsappQuick: 'Book via WhatsApp',
    quickCall: 'Call Sensei',
    badgeTopClub: 'Premier Karate Club in Bishkek',
    badgeLicensed: 'Shotokan Karate-Do · SKIF & WKF',
    faqTitle: 'Frequently Asked',
    faqTitleHighlight: 'Questions',
    faq1Q: 'What age is best to start?',
    faq1A: 'We accept children from 4 years old. At this age, they perfectly grasp coordination and discipline.',
    faq2Q: 'What should I bring to the first training?',
    faq2A: 'For a start, comfortable sportswear (t-shirt and pants) and a water bottle are enough. We train barefoot on the tatami.',
    faq3Q: 'Is karate suitable for girls?',
    faq3A: 'Absolutely! Karate develops flexibility, self-confidence, and self-defense skills that are useful for everyone.',
    faq4Q: 'Do children participate in competitions?',
    faq4A: 'Yes, our students regularly attend city and international tournaments, but participation is always optional.',
    chatTitle: 'Star Karate Assistant',
    chatPlaceholder: 'Type your question...',
    chatInitial: 'Hello! I am the Star Karate Club AI assistant. How can I help you today? Ask me about the schedule, prices, or training!',
    navReviews: 'Reviews',
    reviewsTitle1: 'Parent & Student',
    reviewsTitleHighlight: 'Testimonials',
    reviewsDesc: 'Real stories of success, parent feedback, and inspiring achievements of our club students.',
    reviewsRatingLabel: 'Average Rating',
    reviewsRatingVal: '4.9',
    reviewsTotalCount: '120+ happy families',
    reviewsTrustBadge: '100% recommended',
    reviewsVerified: 'Verified Review',
    reviewsAllTab: 'All Reviews',
    reviewsParentsTab: 'Parents',
    reviewsStudentsTab: 'Students',
    reviewsCtaText: 'Want your child to grow strong, confident, and disciplined?',
    reviewsCtaBtn: 'Book a Free Trial Class',
    fedTag: 'Official Standards & Affiliations',
    fedTitle1: 'Shotokan Karate-Do ·',
    fedTitleHighlight: 'SKIF & WKF',
    fedDesc: 'Star Karate Club integrates two premier global pillars: the authentic lineage of traditional Japanese Shotokan (SKIF) and official Olympic sport karate (WKF).',
    fedShotokanTitle: 'Shotokan Karate-Do',
    fedShotokanSub: 'Authentic Japanese Martial Art (松濤館)',
    fedShotokanBadge: 'Core Discipline',
    fedShotokanDesc: 'The world’s most respected traditional style, founded by Master Gichin Funakoshi. Complete harmony of Kihon (basics), Kata (forms), and Kumite (sparring).',
    fedShotokanP1: 'Deep rooted stances (Zenkutsu, Kiba-dachi), spatial distance mastery, and explosive strikes',
    fedShotokanP2: 'Traditional Kata mastery fostering focus, breathing dynamics, and core body mechanics',
    fedShotokanP3: 'Dojo Kun code: unwavering discipline, respect for seniors, character forging, and honor',
    fedSkifTitle: 'SKIF Federation',
    fedSkifSub: 'Shotokan Karate-Do International Federation (國際松濤館)',
    fedSkifBadge: 'Global Lineage',
    fedSkifDesc: 'Worldwide traditional Shotokan organization founded by legendary Master Hirokazu Kanazawa (10th Dan).',
    fedSkifP1: 'Direct technical seminars led by Shuseki Shihan Manabu Murakami (8th Dan, Japan)',
    fedSkifP2: 'Internationally recognized Kyu and Dan black belt diplomas registered and certified in Japan',
    fedSkifP3: 'Preservation of pure Japanese Budo spirit, precision biomechanics, and combat efficiency',
    fedWkfTitle: 'WKF Federation',
    fedWkfSub: 'World Karate Federation (Olympic Sport)',
    fedWkfBadge: 'Olympic Sport',
    fedWkfDesc: 'The sole global karate governing body recognized by the International Olympic Committee (IOC).',
    fedWkfP1: 'Elite athletic conditioning under official Olympic Kumite and Kata competition rules',
    fedWkfP2: 'Official pathway to Bishkek city, Kyrgyzstan national, Asian, and World championships',
    fedWkfP3: 'WKF certified refereeing, electronic points tracking, and athlete-first safety gear',
    fedSynergyTitle: 'Harmony of Tradition & Olympic Sport',
    fedSynergyDesc: 'Students at Star Karate Club develop an uncompromising foundation: traditional Shotokan (SKIF) character and mental fortitude paired with modern WKF sports tournament speed and medals.',
  }
};

type LangType = keyof typeof translations;

const LangContext = createContext<{
  lang: LangType;
  setLang: (lang: LangType) => void;
  t: typeof translations['ru'];
}>({
  lang: 'ky',
  setLang: () => {},
  t: translations['ky'],
});

const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [lang, setLang] = useState<LangType>('ky');
  
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

const LanguageSwitcher = () => {
  const { lang, setLang } = useContext(LangContext);
  
  const languages: { code: LangType; label: string }[] = [
    { code: 'ky', label: 'KG' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <div 
      className="inline-flex items-center bg-zinc-900/90 p-0.5 sm:p-1 rounded-xl border border-zinc-800/80 backdrop-blur-md shadow-inner"
      role="group"
      aria-label="Language selector"
    >
      {languages.map((l) => {
        const isActive = lang === l.code;
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`px-2.5 py-1 text-xs font-black uppercase rounded-lg transition-all duration-200 tracking-wider flex items-center justify-center min-w-[34px] ${
              isActive
                ? 'bg-brand-red text-white shadow-[0_0_12px_rgba(230,57,70,0.5)] scale-[1.02]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
};

const Header = () => {
  const { t } = useContext(LangContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navAbout, href: '#about' },
    { name: t.navSchedule, href: '#schedule' },
    { name: t.navGallery, href: '#gallery' },
    { name: t.navReviews, href: '#testimonials' },
    { name: t.navVideo, href: '#video' },
    { name: t.navContacts, href: '#contacts' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zinc-950/90 backdrop-blur-md py-4 border-b border-zinc-800/50 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-black text-xl group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(230,57,70,0.5)]">
            S
          </div>
          <span className="font-black text-xl tracking-wide uppercase">
            Star Karate <span className="text-brand-red">Club</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-300 hover:text-white transition-colors text-sm tracking-wider uppercase"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#booking"
            className="bg-brand-red hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(230,57,70,0.4)]"
          >
            {t.navBook}
          </a>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a href="https://www.instagram.com/starkarateclub/" target="_blank" rel="noreferrer" className="flex items-center justify-center text-zinc-300 hover:text-brand-red transition-colors bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800 hover:bg-zinc-800" title="Instagram">
              <Instagram size={18} />
            </a>
          </div>
        </nav>

        {/* Mobile Nav toggle and Lang */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitcher />
          <a href="https://www.instagram.com/starkarateclub/" target="_blank" rel="noreferrer" className="flex items-center justify-center text-zinc-300 hover:text-brand-red transition-colors bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800 hover:bg-zinc-800" title="Instagram">
            <Instagram size={18} />
          </a>
          <button
            className="text-zinc-300 hover:text-white p-1 ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 py-6 px-6 flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-300 hover:text-white text-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-brand-red hover:bg-red-700 text-white text-center px-6 py-3 rounded-xl font-bold uppercase tracking-wider w-full mt-2"
            >
              {t.formBtn}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const { t } = useContext(LangContext);
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-28 md:pb-14">
      {/* Background with layered gradients and dynamic spotlights */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Karate Master"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/50" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-red/15 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Main Hero Content - Left Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-brand-red/30 text-white font-medium text-xs tracking-wider uppercase mb-3 shadow-lg backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-brand-red font-bold">Star Karate Club</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">Бишкек · {t.badgeLicensed}</span>
            </motion.div>

            {/* Single Line Title (compact, as requested) */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mb-2.5 truncate max-w-full drop-shadow-md"
              title={t.heroSingleTitle}
            >
              {t.heroSingleTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl mb-5 font-normal leading-relaxed"
            >
              {t.heroDesc}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full mb-6"
            >
              <a
                href="#booking"
                className="px-6 py-3 bg-brand-red hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:scale-105 active:scale-95"
              >
                <Flame size={16} />
                <span>{t.heroStart}</span>
                <ChevronRight size={14} />
              </a>

              <a
                href="https://wa.me/996999099992?text=%D0%A1%D0%B0%D0%BB%D0%B0%D0%BC%D0%B0%D1%82%D1%81%D1%8B%D0%B7%D0%B1%D1%8B!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B1%D0%BD%D1%83%D1%8E%20%D1%82%D1%80%D0%B5%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D1%83%20%D0%B2%20Star%20Karate%20Club"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-zinc-900 border border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-600/20 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <MessageCircle size={16} />
                <span>WhatsApp: 0999 099 992</span>
              </a>

              <a
                href="tel:0771878018"
                className="px-4 py-3 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <Phone size={15} className="text-brand-red" />
                <span>0771 878 018</span>
              </a>
            </motion.div>

            {/* Direct Branch Cards (Immediate answers to Where & When) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full text-left"
            >
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 justify-center lg:justify-start">
                <MapPin size={13} className="text-brand-red" />
                <span>{t.heroBranchHeader}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Branch 1 */}
                <div className="bg-zinc-900/80 border border-zinc-800 hover:border-brand-red/40 p-3 rounded-2xl transition-colors shadow-md">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-brand-red uppercase">Зал 1</span>
                    <span className="text-zinc-400 font-semibold">{t.heroBranch1Schedule}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5">{t.school1}</h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <Phone size={12} className="text-zinc-500 shrink-0" />
                    <a href="tel:0999099992" className="hover:text-brand-red transition-colors font-medium">0999 099 992</a>
                    <span className="text-zinc-600">·</span>
                    <a href="tel:0500000909" className="hover:text-brand-red transition-colors text-zinc-400">0500 000 909</a>
                  </div>
                </div>

                {/* Branch 2 */}
                <div className="bg-zinc-900/80 border border-zinc-800 hover:border-brand-red/40 p-3 rounded-2xl transition-colors shadow-md">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-brand-red uppercase">Зал 2</span>
                    <span className="text-zinc-400 font-semibold">{t.heroBranch2Schedule}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5">{t.school2}</h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <Phone size={12} className="text-zinc-500 shrink-0" />
                    <a href="tel:0771878018" className="hover:text-brand-red transition-colors font-medium">0771 878 018</a>
                    <span className="text-zinc-600">·</span>
                    <a href="tel:0700770570" className="hover:text-brand-red transition-colors text-zinc-400">0700 770 570</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Live Sports Information Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-3"
          >
            {/* Sensei Spotlight Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 shadow-xl backdrop-blur-md flex items-center gap-3.5">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-zinc-700 bg-zinc-950">
                <img src={senseiImg} alt={t.coachName} className="w-full h-full object-cover object-top" />
                <span className="absolute bottom-0 inset-x-0 bg-brand-red text-[8px] text-center font-black text-white uppercase">III Дан</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-brand-red/10 border border-brand-red/20 text-brand-red uppercase tracking-wider mb-0.5">
                  Башкы машыктыруучу
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">{t.coachName}</h4>
                <p className="text-[11px] text-zinc-400 truncate">{t.coachRank}</p>
              </div>
              <a href="#about" className="p-2 rounded-lg bg-zinc-800/90 hover:bg-brand-red text-zinc-300 hover:text-white transition-colors shrink-0">
                <ChevronRight size={16} />
              </a>
            </div>

            {/* Express Schedule & Age groups list */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800 mb-2.5 text-xs font-bold uppercase tracking-wider">
                <span className="text-white flex items-center gap-1.5">
                  <Clock size={13} className="text-brand-red" />
                  {t.heroQuickSchedTitle}
                </span>
                <a href="#schedule" className="text-brand-red hover:underline text-[11px] normal-case font-semibold">
                  {t.navSchedule} →
                </a>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/70 border border-zinc-800/70">
                  <div>
                    <span className="font-bold text-white block">4–7 жаш / лет</span>
                    <span className="text-[11px] text-zinc-400">Дш, Шр, Жм (Пн, Ср, Пт)</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-brand-red/10 border border-brand-red/20 text-brand-red font-bold text-xs">
                    17:00 - 18:00
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/70 border border-zinc-800/70">
                  <div>
                    <span className="font-bold text-white block">8–13 жаш / лет</span>
                    <span className="text-[11px] text-zinc-400">Дш, Шр, Жм (Пн, Ср, Пт)</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-brand-red/10 border border-brand-red/20 text-brand-red font-bold text-xs">
                    18:00 - 19:30
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/70 border border-zinc-800/70">
                  <div>
                    <span className="font-bold text-white block">14+ жаш / чоңдор (взрослые)</span>
                    <span className="text-[11px] text-zinc-400">Шш, Бш, Иш (Вт, Чт, Сб)</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-brand-red/10 border border-brand-red/20 text-brand-red font-bold text-xs">
                    19:00 - 21:00
                  </span>
                </div>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-zinc-800/70 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 size={13} />
                  {t.heroTrialBanner}
                </span>
                <span className="text-zinc-500 font-bold">SKIF &amp; WKF</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { t } = useContext(LangContext);
  const features = [
    {
      icon: <ShieldCheck size={32} className="text-brand-red" />,
      title: t.feat1Title,
      desc: t.feat1Desc
    },
    {
      icon: <Trophy size={32} className="text-brand-red" />,
      title: t.feat2Title,
      desc: t.feat2Desc
    },
    {
      icon: <Star size={32} className="text-brand-red" />,
      title: t.feat3Title,
      desc: t.feat3Desc
    }
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">{t.featTitle1} <span className="text-brand-red">{t.featTitleHighlight}</span></h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{t.featDesc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-brand-red/50 transition-colors group"
            >
              <div className="w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Schedule = () => {
  const { t } = useContext(LangContext);
  const groups = [
    {
      age: t.sched1Age,
      days: t.sched1Days,
      time: "17:00 - 18:00",
      level: t.sched1Level,
      enrolled: 18,
      capacity: 20,
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      barGradient: 'from-amber-500 via-orange-500 to-brand-red'
    },
    {
      age: t.sched2Age,
      days: t.sched2Days,
      time: "18:00 - 19:30",
      level: t.sched2Level,
      enrolled: 22,
      capacity: 25,
      badgeColor: 'border-red-500/40 text-red-400 bg-red-500/10',
      barGradient: 'from-red-500 via-brand-red to-orange-500'
    },
    {
      age: t.sched3Age,
      days: t.sched3Days,
      time: "19:00 - 21:00",
      level: t.sched3Level,
      enrolled: 16,
      capacity: 20,
      badgeColor: 'border-orange-500/40 text-orange-400 bg-orange-500/10',
      barGradient: 'from-orange-500 via-amber-500 to-yellow-500'
    }
  ];

  return (
    <section id="schedule" className="py-14 md:py-16 bg-zinc-900 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-brand-red/30 text-zinc-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
            <Flame size={14} className="text-brand-red fill-brand-red animate-pulse" />
            <span className="text-brand-red">{t.schedSpotsLimited}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            {t.schedTitle1} <span className="text-brand-red">{t.schedTitleHighlight}</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{t.schedDesc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g, i) => {
            const spotsRemaining = g.capacity - g.enrolled;
            const percentage = Math.round((g.enrolled / g.capacity) * 100);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-zinc-950 p-7 md:p-8 rounded-3xl border-l-4 border-brand-red border border-zinc-800/90 hover:border-brand-red/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{g.age}</h3>
                    <div className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${g.badgeColor}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                      <span>{spotsRemaining} {t.schedSpotsOnly}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-zinc-800/70">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Clock size={16} className="text-brand-red" />
                      </div>
                      <span className="font-medium text-white text-sm">{g.days}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-red font-bold text-[10px]">{t.schedTime}</span>
                      </div>
                      <span className="font-medium text-white text-sm">{g.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Star size={16} className="text-brand-red" />
                      </div>
                      <span className="text-zinc-300 text-sm">{g.level}</span>
                    </div>
                  </div>

                  {/* Visual Progress Indicator (Enrolled vs Capacity) */}
                  <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 mb-6 shadow-inner">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                        <Users size={14} className="text-brand-red" />
                        <span>{t.schedCapacityTitle}</span>
                      </div>
                      <span className="text-xs font-semibold text-zinc-400">
                        <strong className="text-white font-bold text-sm tabular-nums">{g.enrolled}</strong>
                        <span className="text-zinc-600"> / </span>
                        <span className="text-zinc-300 tabular-nums">{g.capacity}</span> {t.schedEnrolledOf}
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full bg-zinc-950 rounded-full h-3 p-0.5 border border-zinc-800 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${g.barGradient} relative shadow-[0_0_10px_rgba(230,57,70,0.3)]`}
                      />
                    </div>

                    {/* Urgency Callout row */}
                    <div className="flex items-center justify-between mt-2.5 text-[11px]">
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Flame size={12} className="text-brand-red fill-brand-red animate-pulse" />
                        <span>{t.schedHurry}: {spotsRemaining} {t.schedSpotsLeft}</span>
                      </span>
                      <span className="text-zinc-400 font-bold tabular-nums">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Booking Link */}
                <a
                  href="#booking"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 bg-zinc-900 hover:bg-brand-red text-zinc-200 hover:text-white border border-zinc-800 hover:border-brand-red shadow-lg group-hover:border-brand-red/50"
                >
                  <span>{t.schedBookSpot}</span>
                  <ChevronRight size={14} className="text-brand-red group-hover:text-white transition-colors" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { t } = useContext(LangContext);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const photos = [
    {
      src: "/assets/aistudio/photo_2026-11-01_17.25.28_327ffdb7.jpeg",
      caption: "S.K.I.F. Master Class · Shihan Manabu Murakami (8-Дан, Япония) & Sensei Abdibek"
    },
    {
      src: "/assets/aistudio/photo_2026-11-01_17.25.24_34bcae9d.jpeg",
      caption: "S.K.I.F. Seminar · Shihan Manabu Murakami & Sensei Abdibek"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Gichin_Funakoshi.jpg",
      caption: "Master Gichin Funakoshi (Шотокандын негиздөөчүсү)"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Kanchu_Kanazawa_by_JPCasainho.jpg",
      caption: "Soke Hirokazu Kanazawa (SKIF 10th Dan)"
    },
    {
      src: punchImg,
      caption: "Shotokan Kumite (Gyaku Tsuki)"
    },
    {
      src: kickImg,
      caption: "Shotokan Keri (Mawashi Geri)"
    }
  ];

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
  };

  return (
    <section id="gallery" className="py-14 md:py-16 bg-zinc-950 relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">{t.galTitle1} <span className="text-brand-red">{t.galTitleHighlight}</span></h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{t.galDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                setLightboxIndex(i);
                setIsZoomed(false);
              }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-brand-red/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(230,57,70,0.2)]"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-85 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Hover Zoom pill badge */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xl">
                  <ZoomIn size={13} className="text-brand-red" />
                  <span>{t.galZoomHint}</span>
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-bold tracking-wide text-sm md:text-base leading-snug">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Zoom & Navigation */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6 select-none"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div
              className="flex items-center justify-between z-20 w-full max-w-7xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-bold text-zinc-300">
                <span className="text-brand-red">{lightboxIndex + 1}</span>
                <span className="text-zinc-600">/</span>
                <span>{photos.length}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`p-2.5 rounded-full border transition-all ${
                    isZoomed
                      ? 'bg-brand-red text-white border-brand-red shadow-[0_0_15px_rgba(230,57,70,0.5)]'
                      : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800'
                  }`}
                  title={isZoomed ? "100%" : "Zoom 150%"}
                >
                  {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                </button>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-zinc-900/90 hover:bg-brand-red text-zinc-300 hover:text-white border border-zinc-800 hover:border-brand-red transition-all"
                  title={t.galClose}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Stage with Image & Navigation Controls */}
            <div
              className="relative flex-1 flex items-center justify-center overflow-hidden my-3 w-full max-w-6xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label={t.galPrev}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/70 hover:bg-brand-red border border-white/10 hover:border-brand-red text-white transition-all duration-200 shadow-2xl backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Image Viewport */}
              <div
                className="overflow-auto max-h-[78vh] max-w-full flex items-center justify-center cursor-pointer"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].caption}
                  referrerPolicy="no-referrer"
                  className={`max-h-[75vh] w-auto max-w-[85vw] object-contain rounded-2xl shadow-2xl border border-zinc-800/80 transition-transform duration-300 ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label={t.galNext}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/70 hover:bg-brand-red border border-white/10 hover:border-brand-red text-white transition-all duration-200 shadow-2xl backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div
              className="z-20 w-full max-w-3xl mx-auto text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="inline-block bg-zinc-900/90 border border-zinc-800 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md">
                <p className="text-white font-bold text-sm md:text-base">
                  {photos[lightboxIndex].caption}
                </p>
                <p className="text-zinc-500 text-[11px] mt-1 font-medium">
                  {isZoomed ? "Кликни для уменьшения · " : "Кликни на фото для зума · "}
                  ← / → клавиатура · Esc для закрытия
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const VideoSection = () => {
  const { t } = useContext(LangContext);
  const videos = [
    {
      src: "/promo.mp4",
      poster: "https://images.unsplash.com/photo-1542838686-37ed7a9df1b3?auto=format&fit=crop&q=80"
    },
    {
      src: "/promo2.mp4",
      poster: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section id="video" className="py-14 md:py-16 bg-zinc-900 relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">{t.vidTitle1} <span className="text-brand-red">{t.vidTitleHighlight}</span></h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{t.vidDesc}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {videos.map((video, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-video shadow-2xl"
            >
              <video 
                controls 
                className="w-full h-full object-cover"
                poster={video.poster}
              >
                <source src={video.src} type="video/mp4" />
                {t.vidFallback}
              </video>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonialsData = [
  {
    id: 1,
    name: 'Айдана Бакытова',
    avatar: 'АБ',
    rating: 5,
    date: {
      ky: 'Октябрь 2024',
      ru: 'Октябрь 2024',
      en: 'October 2024',
    },
    role: {
      ky: 'Апасы (Уулу Эмир, 7 жашта)',
      ru: 'Мама (Сын Эмир, 7 лет)',
      en: 'Mother (Son Emir, 7 yo)',
    },
    tag: {
      ky: 'Кенже тайпа · 1 жыл клубда',
      ru: 'Младшая группа · 1 год в клубе',
      en: 'Junior group · 1 year in club',
    },
    branch: {
      ky: '№88 мектеп филиалы',
      ru: 'Филиал школы №88',
      en: 'School #88 branch',
    },
    highlight: {
      ky: '«Биринчи медаль жана бекем тартип»',
      ru: '«Первая медаль и железная дисциплина»',
      en: '«First medal and iron discipline»',
    },
    content: {
      ky: 'Уулум сэнсэй Абдибекке машыгууга бир жылдан бери барат. Балабыз укмуштуудай тартиптүү, шамдагай жана өзүнө ишенимдүү болуп калды! Мурда тартынчаак болчу, эми шаардык мелдеште биринчи коло медалын жеңип алды. Машыктыруучунун жеке мамилесине терең ыраазычылык!',
      ru: 'Сын ходит к сэнсэю Абдибеку уже год. Ребёнок стал невероятно дисциплинированным, собранным и физически крепким! Раньше был застенчивым, а сейчас уверен в себе и уже выиграл свою первую бронзовую медаль на турнире Бишкека. Огромное спасибо тренерам за заботу и правильное воспитание!',
      en: 'My son has been training with Sensei Abdibek for a year. He has become remarkably disciplined, agile, and confident! He used to be shy, but recently won his first bronze medal in Bishkek. Huge thanks to the coaches for their care and dedication!',
    },
    category: 'parent' as const,
    beltAccent: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
  },
  {
    id: 2,
    name: 'Азамат Темиров',
    avatar: 'АТ',
    rating: 5,
    date: {
      ky: 'Сентябрь 2024',
      ru: 'Сентябрь 2024',
      en: 'September 2024',
    },
    role: {
      ky: 'Окуучу (13 жашта, Көк кур)',
      ru: 'Ученик (13 лет, Синий пояс)',
      en: 'Student (13 yo, Blue Belt)',
    },
    tag: {
      ky: 'Өспүрүмдөр · 3 жыл клубда',
      ru: 'Подростки · 3 года в клубе',
      en: 'Teens group · 3 years in club',
    },
    branch: {
      ky: '№64 мектеп филиалы',
      ru: 'Филиал школы №64',
      en: 'School #64 branch',
    },
    highlight: {
      ky: '«Көк кур жана республикалык кубок»',
      ru: '«Синий пояс и республиканский кубок»',
      en: '«Blue belt and Republic Cup»',
    },
    content: {
      ky: 'Бул клуб мен үчүн экинчи үй-бүлөдөй болуп калды. Бизге жөн эле сокку урууну эмес, атаандашты сыйлоону, акыл менен күрөшүүнү жана эч качан багынбоону үйрөтүшөт. Көк курга сынактан ийгиликтүү өтүп, республикалык кубокту уттум. Татамидеги атмосфера эң мыкты!',
      ru: 'Клуб стал для меня второй семьёй! Здесь учат не просто драться, а уважать соперника, думать тактически и преодолевать любые трудности. Успешно сдал экзамен на синий пояс и взял кубок Кыргызстана. Тренировки мотивируют развиваться каждый день!',
      en: 'The club has become my second family! They don’t just teach you to punch, but to respect opponents, think tactically, and never give up. I passed my blue belt exam and won the republic cup. The spirit on the tatami is unmatched!',
    },
    category: 'student' as const,
    beltAccent: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
  },
  {
    id: 3,
    name: 'Елена и Дмитрий Соколовы',
    avatar: 'ДС',
    rating: 5,
    date: {
      ky: 'Август 2024',
      ru: 'Август 2024',
      en: 'August 2024',
    },
    role: {
      ky: 'Ата-энелер (Балдары 6 жана 10 жашта)',
      ru: 'Родители (Сыновья 6 и 10 лет)',
      en: 'Parents (Sons 6 and 10 yo)',
    },
    tag: {
      ky: 'Үй-бүлөлүк программа · 2 жыл клубда',
      ru: 'Семейная программа · 2 года в клубе',
      en: 'Family program · 2 years in club',
    },
    branch: {
      ky: '№88 мектеп филиалы',
      ru: 'Филиал школы №88',
      en: 'School #88 branch',
    },
    highlight: {
      ky: '«Таза зал, коопсуздук жана тартип»',
      ru: '«Чистый зал, безопасность и подход к детям»',
      en: '«Clean dojo, safety & approach to kids»',
    },
    content: {
      ky: 'Эки уулубузду тең Star Karate клубуна бергенбиз, бул эң туура чечим болду! Зал абдан таза, коопсуздукка чоң көңүл бурулат. Машыктыруучулар кыйкырбай, балдарга мээрим жана бекем тартип менен мамиле кылышат. Балдар машыгууга ашыгып барышат!',
      ru: 'Отдали сразу двоих сыновей и ни разу не пожалели! Зал чистый, светлый, татами профессиональные. Тренерский состав потрясающий: находят подход к каждому без криков, но с настоящей самурайской дисциплиной. Дети бегут на занятия с горящими глазами!',
      en: 'We enrolled both our sons and never regretted it! The dojo is pristine and safety is paramount. The coaching team is phenomenal: finding a bond with every kid without yelling, maintaining genuine discipline. The boys run to practice with excitement!',
    },
    category: 'parent' as const,
    beltAccent: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
  },
  {
    id: 4,
    name: 'Нурсултан Касымов',
    avatar: 'НК',
    rating: 5,
    date: {
      ky: 'Июль 2024',
      ru: 'Июль 2024',
      en: 'July 2024',
    },
    role: {
      ky: 'Студент (19 жашта, Күрөң кур)',
      ru: 'Студент (19 лет, Коричневый пояс)',
      en: 'Student (19 yo, Brown Belt)',
    },
    tag: {
      ky: 'Чоңдор тайпасы · 5 жыл клубда',
      ru: 'Взрослая группа · 5 лет в клубе',
      en: 'Adult group · 5 years in club',
    },
    branch: {
      ky: '№98 мектеп филиалы',
      ru: 'Филиал школы №98',
      en: 'School #98 branch',
    },
    highlight: {
      ky: '«Ак курдан күрөң курга чейинки жол»',
      ru: '«Путь от новичка до коричневого пояса»',
      en: '«From beginner to brown belt»',
    },
    content: {
      ky: '14 жашымда ден соолукту чыңдоо жана өзүмдү коргоо үчүн келгем. 5 жыл ичинде ак курдан күрөң курга чейин жеттим, денем да, эрким да чыңдалды. Star Karate Club адамдын мүнөзүн түптөйт. Спортту сүйгөн бардык адамдарга сунуштайм!',
      ru: 'Пришел в клуб в 14 лет, чтобы научиться постоять за себя и улучшить форму. За 5 лет прошел путь от новичка до коричневого пояса. Карате научило хладнокровию, стрессоустойчивости и упорству в учёбе. Лучший клуб в городе для тех, кто ищет результат!',
      en: 'I joined at 14 to learn self-defense and improve fitness. Over 5 years I grew from a novice to a brown belt. Karate taught me calmness, stress resistance, and relentless perseverance. The best club in the city for anyone looking for real growth!',
    },
    category: 'student' as const,
    beltAccent: 'border-amber-700/40 text-amber-600 bg-amber-700/10',
  },
];

const Testimonials = () => {
  const { t, lang } = useContext(LangContext);
  const [filter, setFilter] = useState<'all' | 'parent' | 'student'>('all');

  const filteredList = testimonialsData.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="testimonials" className="py-14 md:py-16 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Subtle martial arts glow background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-red/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-brand-red/30 text-white font-medium text-xs tracking-wider uppercase mb-4 shadow-lg backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-brand-red font-bold">100% WKF</span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-300">{t.reviewsTrustBadge}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            {t.reviewsTitle1} <span className="text-brand-red">{t.reviewsTitleHighlight}</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg">
            {t.reviewsDesc}
          </p>
        </div>

        {/* Social Proof Trust & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 mb-10 max-w-4xl mx-auto backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
              {t.reviewsRatingVal}
              <span className="text-sm font-bold text-zinc-500">/ 5.0</span>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-400 font-semibold">{t.reviewsTotalCount}</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-brand-red text-white shadow-[0_0_12px_rgba(230,57,70,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.reviewsAllTab}
            </button>
            <button
              onClick={() => setFilter('parent')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filter === 'parent'
                  ? 'bg-brand-red text-white shadow-[0_0_12px_rgba(230,57,70,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.reviewsParentsTab}
            </button>
            <button
              onClick={() => setFilter('student')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filter === 'student'
                  ? 'bg-brand-red text-white shadow-[0_0_12px_rgba(230,57,70,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.reviewsStudentsTab}
            </button>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredList.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/90 border border-zinc-800/90 hover:border-brand-red/50 transition-all duration-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative group hover:shadow-[0_0_30px_rgba(230,57,70,0.15)]"
            >
              {/* Quote Watermark Icon */}
              <Quote
                size={54}
                className="absolute right-6 top-6 text-zinc-800/40 group-hover:text-brand-red/15 transition-colors pointer-events-none"
              />

              <div>
                {/* Author Info Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-brand-red font-black text-base shadow-inner group-hover:border-brand-red/40 transition-colors">
                      {item.avatar}
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-white group-hover:text-red-400 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-medium">
                        {item.role[lang as keyof typeof item.role] || item.role.ru}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${item.beltAccent}`}>
                    {item.tag[lang as keyof typeof item.tag] || item.tag.ru}
                  </span>
                </div>

                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 py-3 border-y border-zinc-800/60 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      5.0
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 size={14} className="shrink-0" />
                    <span>{t.reviewsVerified}</span>
                  </div>
                </div>

                {/* Highlight Quote Pill */}
                <p className="text-sm font-bold text-white mb-2.5">
                  {item.highlight[lang as keyof typeof item.highlight] || item.highlight.ru}
                </p>

                {/* Full Review Text */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {item.content[lang as keyof typeof item.content] || item.content.ru}
                </p>
              </div>

              {/* Card Footer with Branch & Date */}
              <div className="pt-6 mt-6 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-brand-red" />
                  {item.branch[lang as keyof typeof item.branch] || item.branch.ru}
                </span>
                <span>{item.date[lang as keyof typeof item.date] || item.date.ru}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-brand-red/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
              {t.reviewsCtaText}
            </h3>
            <p className="text-zinc-400 text-sm">
              {t.heroFree} · {t.school1} &amp; {t.school2}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href="#booking"
              className="w-full sm:w-auto px-7 py-3.5 bg-brand-red hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(230,57,70,0.4)] hover:shadow-[0_0_35px_rgba(230,57,70,0.6)] flex items-center justify-center gap-2"
            >
              <span>{t.reviewsCtaBtn}</span>
              <ChevronRight size={18} />
            </a>
            <a
              href="https://wa.me/996999099992?text=%D0%A1%D0%B0%D0%BB%D0%B0%D0%BC%D0%B0%D1%82%D1%81%D1%8B%D0%B7%D0%B1%D1%8B!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%BE%D0%B1%20%D0%BE%D1%82%D0%B7%D1%8B%D0%B2%D0%B0%D1%85%20%D0%B8%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%B2%20Star%20Karate%20Club"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900 border border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-600/20 font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BookingSection = () => {
  const { t } = useContext(LangContext);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="booking" className="py-14 md:py-16 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Decorative bg */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-tight">
              {t.bookTitle1} <span className="text-brand-red">{t.bookTitleHighlight}</span> {t.bookTitle2}
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-md">
              {t.bookDesc}
            </p>
            
            <div className="space-y-6">
              {/* Зал 1 */}
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 hover:border-brand-red/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-red" size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white leading-tight">{t.school1}</h4>
                </div>
                <div className="pl-14 flex flex-col gap-2 text-sm md:text-base">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone size={16} className="text-zinc-500 shrink-0" />
                    <a href="tel:0999099992" className="hover:text-brand-red transition-colors">0999 099 992 (WhatsApp)</a>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone size={16} className="text-zinc-500 shrink-0 opacity-0" />
                    <a href="tel:0500000909" className="hover:text-brand-red transition-colors">0500 000 909</a>
                  </div>
                </div>
                <div className="mt-5 rounded-xl overflow-hidden h-40 border border-zinc-800">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    referrerPolicy="no-referrer-when-downgrade" 
                    src="https://maps.google.com/maps?q=Школа%2088%20Бишкек&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  ></iframe>
                </div>
              </div>

              {/* Зал 2 */}
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 hover:border-brand-red/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-red" size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white leading-tight">{t.school2}</h4>
                </div>
                <div className="pl-14 flex flex-col gap-2 text-sm md:text-base">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone size={16} className="text-zinc-500 shrink-0" />
                    <a href="tel:0771878018" className="hover:text-brand-red transition-colors">0771 878 018 (WhatsApp)</a>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone size={16} className="text-zinc-500 shrink-0 opacity-0" />
                    <a href="tel:0700770570" className="hover:text-brand-red transition-colors">0700 770 570</a>
                  </div>
                </div>
                <div className="mt-5 rounded-xl overflow-hidden h-40 border border-zinc-800">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    referrerPolicy="no-referrer-when-downgrade" 
                    src="https://maps.google.com/maps?q=Школа%2064%20Бишкек&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl relative">
            <h3 className="text-2xl font-bold mb-6">{t.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">{t.formName}</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                  placeholder={t.formNamePl}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">{t.formPhone}</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                  placeholder="0555 000 000"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">{t.formAge}</label>
                  <input 
                    required
                    type="number" 
                    min="4"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                    placeholder={t.formAgePl}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">{t.formExp}</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors appearance-none">
                    <option>{t.formExp1}</option>
                    <option>{t.formExp2}</option>
                  </select>
                </div>
              </div>

              <button 
                disabled={status !== 'idle'}
                type="submit" 
                className="w-full bg-brand-red hover:bg-red-700 text-white font-bold text-lg rounded-xl px-4 py-4 mt-4 uppercase tracking-wider transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center h-16"
              >
                {status === 'idle' && t.formBtn}
                {status === 'submitting' && (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {status === 'success' && t.formBtnSuccess}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useContext(LangContext);
  return (
    <footer id="contacts" className="bg-zinc-950 border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-black text-sm">
              S
            </div>
            <span className="font-black text-lg tracking-wide uppercase">
              Star Karate <span className="text-brand-red">Club</span>
            </span>
          </div>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold text-zinc-400">
            <span className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-zinc-300">Шотокан Каратэ-До</span>
            <span className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-blue-400">S.K.I.F.</span>
            <span className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-amber-400">W.K.F.</span>
          </div>
        </div>
        
        <div className="text-zinc-500 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Star Karate Club. {t.footerRights}
        </div>
      </div>
    </footer>
  );
};

interface CountUpNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({ value, suffix = '', duration = 1.8 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Smooth cubic ease-out: f(t) = 1 - (1 - t)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * value);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums inline-block">
      {displayValue}{suffix}
    </span>
  );
};

const Stats = () => {
  const { t } = useContext(LangContext);
  const stats = [
    { value: 300, suffix: "+", label: t.statStudents, icon: <Users size={24} className="text-brand-red mb-2" /> },
    { value: 500, suffix: "+", label: t.statMedals, icon: <Medal size={24} className="text-brand-red mb-2" /> },
    { value: 20, suffix: "+", label: t.statExp, icon: <Calendar size={24} className="text-brand-red mb-2" /> },
    { value: 2, suffix: "", label: t.statBranches, icon: <MapPin size={24} className="text-brand-red mb-2" /> }
  ];

  return (
    <div className="relative z-20 -mt-8 md:-mt-12 max-w-6xl mx-auto px-6 md:px-12">
      <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 backdrop-blur-md">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center p-3"
          >
            {s.icon}
            <span className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-1">
              <CountUpNumber value={s.value} suffix={s.suffix} duration={1.8} />
            </span>
            <span className="text-zinc-400 font-semibold uppercase tracking-wider text-xs md:text-sm">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CoachSection = () => {
  const { t } = useContext(LangContext);
  return (
    <section id="about" className="py-14 md:py-16 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Sensei Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
              <img
                src={senseiImg}
                alt={t.coachName}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent" />
              
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold rounded-full shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                  S.K.I.F. Master Seminar
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-red text-white text-[11px] font-black rounded-full shadow-lg">
                  SKIF & WKF
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block px-2.5 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-lg mb-1.5 shadow-md">
                  Head Sensei
                </span>
                <h4 className="text-xl md:text-2xl font-black text-white">{t.coachName}</h4>
                <p className="text-xs text-zinc-300 font-medium">{t.coachRank}</p>
              </div>
            </div>
          </motion.div>

          {/* Sensei Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-brand-red font-bold text-xs uppercase tracking-widest mb-3">
              <Award size={18} />
              <span>{t.badgeLicensed}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              {t.coachTitle1} <span className="text-brand-red">{t.coachTitleHighlight}</span>
            </h2>
            <p className="text-lg text-zinc-300 font-medium mb-4">
              {t.coachDesc}
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              {t.coachBio}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={20} className="text-brand-red shrink-0" />
                <span className="text-sm font-semibold text-white">{t.coachBadge1}</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={20} className="text-brand-red shrink-0" />
                <span className="text-sm font-semibold text-white">{t.coachBadge2}</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={20} className="text-brand-red shrink-0" />
                <span className="text-sm font-semibold text-white">{t.coachBadge3}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/996999099992?text=%D0%A1%D0%B0%D0%BB%D0%B0%D0%BC%D0%B0%D1%82%D1%81%D1%8B%D0%B7%D0%B1%D1%8B!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5%20%D0%BE%20%D1%82%D1%80%D0%B5%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0%D1%85"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl uppercase tracking-wider text-sm transition-all flex items-center gap-2"
              >
                <MessageCircle size={18} />
                <span>{t.whatsappQuick}</span>
              </a>
              <a
                href="tel:0999099992"
                className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold rounded-xl uppercase tracking-wider text-sm transition-all flex items-center gap-2"
              >
                <Phone size={18} className="text-brand-red" />
                <span>{t.quickCall}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FederationsSection = () => {
  const { t } = useContext(LangContext);

  const pillars = [
    {
      badge: t.fedShotokanBadge,
      badgeColor: 'border-red-500/40 text-red-400 bg-red-500/10',
      title: t.fedShotokanTitle,
      subtitle: t.fedShotokanSub,
      kanji: '松濤館',
      desc: t.fedShotokanDesc,
      points: [t.fedShotokanP1, t.fedShotokanP2, t.fedShotokanP3],
      accentBorder: 'border-red-500/30 hover:border-red-500/60',
      icon: <Flame size={24} className="text-brand-red" />
    },
    {
      badge: t.fedSkifBadge,
      badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
      title: t.fedSkifTitle,
      subtitle: t.fedSkifSub,
      kanji: 'S.K.I.F.',
      desc: t.fedSkifDesc,
      points: [t.fedSkifP1, t.fedSkifP2, t.fedSkifP3],
      accentBorder: 'border-blue-500/30 hover:border-blue-500/60',
      icon: <Award size={24} className="text-blue-400" />
    },
    {
      badge: t.fedWkfBadge,
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      title: t.fedWkfTitle,
      subtitle: t.fedWkfSub,
      kanji: 'W.K.F.',
      desc: t.fedWkfDesc,
      points: [t.fedWkfP1, t.fedWkfP2, t.fedWkfP3],
      accentBorder: 'border-amber-500/30 hover:border-amber-500/60',
      icon: <Trophy size={24} className="text-amber-400" />
    }
  ];

  return (
    <section className="py-14 md:py-16 bg-zinc-900/60 relative overflow-hidden border-t border-zinc-900">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/70 text-zinc-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles size={14} className="text-brand-red" />
            <span>{t.fedTag}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6"
          >
            {t.fedTitle1} <span className="text-brand-red">{t.fedTitleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-zinc-300 leading-relaxed font-normal"
          >
            {t.fedDesc}
          </motion.p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className={`group relative bg-zinc-950/90 rounded-3xl p-7 lg:p-8 border ${item.accentBorder} transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between overflow-hidden`}
            >
              {/* Kanji Watermark */}
              <div className="absolute -top-3 -right-2 text-6xl md:text-7xl font-black text-white/[0.04] select-none pointer-events-none group-hover:text-white/[0.08] transition-colors">
                {item.kanji}
              </div>

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white tracking-wide mb-1 uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-red font-semibold uppercase tracking-wider mb-4">
                  {item.subtitle}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Key Points */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal">
                      <CheckCircle2 size={15} className="text-brand-red shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">
                <span>Star Karate Dojo</span>
                <span className="text-white/40">{item.kanji}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Synergy Banner: Best of Both Worlds */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-8 md:p-10 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-full bg-brand-red/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-brand-red font-bold text-xs uppercase tracking-widest mb-2">
                <Target size={16} />
                <span>{t.fedSynergyTitle}</span>
              </div>
              <p className="text-base md:text-lg text-zinc-200 font-medium leading-relaxed">
                {t.fedSynergyDesc}
              </p>
            </div>
            <a
              href="#booking"
              className="px-8 py-4 bg-brand-red hover:bg-red-700 text-white font-bold rounded-2xl uppercase tracking-wider text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(230,57,70,0.4)] whitespace-nowrap"
            >
              {t.heroStart}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProgramFinder = () => {
  const { t } = useContext(LangContext);
  const [activeTab, setActiveTab] = useState<'kids' | 'teens' | 'adults'>('kids');

  const programs = {
    kids: {
      title: t.calcTabKids,
      focus: 'Координация, тартип, оюн түрүндө негизги соккулар жана чоюлуу көнүгүүлөрү.',
      days: 'Дүйшөмбү, Шаршемби, Жума',
      time: '17:00 - 18:00',
      benefit1: 'Ишенимдүүлүк жана өзүн коргоо',
      benefit2: 'Сылыктык жана улууларды сыйлоо',
      benefit3: 'Түз келбет жана күчтүү иммунитет'
    },
    teens: {
      title: t.calcTabTeens,
      focus: 'Ката, кумитэ техникалары, курга аттестациялар жана шаардык турнирлерге даярдык.',
      days: 'Дүйшөмбү, Шаршемби, Жума',
      time: '18:00 - 19:30',
      benefit1: 'Эрктүүлүк жана максатка умтулуу',
      benefit2: 'Турнирлерге катышуу тажрыйбасы',
      benefit3: 'Расмий курлардын ээси болуу'
    },
    adults: {
      title: t.calcTabAdults,
      focus: 'Тамешивари (соккунун күчү), реалдуу өзүн-өзү коргоо, спарринг жана жогорку деңгээлдеги чеберчилик.',
      days: 'Шейшемби, Бейшемби, Ишемби',
      time: '19:00 - 21:00',
      benefit1: 'Стресстен арылуу жана күчтүү энергия',
      benefit2: 'Реалдуу сокку техникасы',
      benefit3: 'Кара курга чейинки өсүү жолу'
    }
  };

  const current = programs[activeTab];

  return (
    <section className="py-24 bg-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            {t.calcTitle1} <span className="text-brand-red">{t.calcTitleHighlight}</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{t.calcDesc}</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('kids')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'kids'
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.calcTabKids}
            </button>
            <button
              onClick={() => setActiveTab('teens')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'teens'
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.calcTabTeens}
            </button>
            <button
              onClick={() => setActiveTab('adults')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'adults'
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.calcTabAdults}
            </button>
          </div>
        </div>

        {/* Tab Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-6">
            <div>
              <h3 className="text-2xl font-black text-white">{current.title}</h3>
              <p className="text-zinc-400 text-sm mt-1">{current.focus}</p>
            </div>
            <div className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 self-start sm:self-auto">
              <span className="text-xs text-zinc-500 uppercase font-semibold block">{t.schedTime}</span>
              <span className="text-brand-red font-bold text-base">{current.time}</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
              <span className="text-brand-red font-bold text-xs block mb-1">01 / НАТЫЙЖА</span>
              <span className="text-white text-sm font-semibold">{current.benefit1}</span>
            </div>
            <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
              <span className="text-brand-red font-bold text-xs block mb-1">02 / НАТЫЙЖА</span>
              <span className="text-white text-sm font-semibold">{current.benefit2}</span>
            </div>
            <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
              <span className="text-brand-red font-bold text-xs block mb-1">03 / НАТЫЙЖА</span>
              <span className="text-white text-sm font-semibold">{current.benefit3}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-3 text-zinc-300 text-sm">
              <Clock size={18} className="text-brand-red" />
              <span>{current.days}</span>
            </div>
            <a
              href="#booking"
              className="w-full sm:w-auto px-6 py-3 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl text-center uppercase tracking-wider text-xs transition-colors"
            >
              {t.heroStart}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const { t } = useContext(LangContext);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A }
  ];

  return (
    <section className="py-14 md:py-16 bg-zinc-950 relative border-t border-zinc-900">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">{t.faqTitle} <span className="text-brand-red">{t.faqTitleHighlight}</span></h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className="font-bold text-lg md:text-xl pr-4 group-hover:text-brand-red transition-colors">{faq.q}</span>
                <ChevronDown size={24} className={`text-zinc-500 group-hover:text-brand-red shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-brand-red' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-zinc-400 text-lg leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Chatbot = () => {
  const { t, lang } = useContext(LangContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: t.chatInitial || 'Здравствуйте! Чем могу помочь?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message when language changes if chat only has the first message
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: t.chatInitial }]);
    }
  }, [t.chatInitial, messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getFallbackReply = (text: string, currentLang: string): string => {
    const q = text.toLowerCase();
    if (q.includes('стил') || q.includes('киокус') || q.includes('киокуш') || q.includes('кёкус') || q.includes('шотокан') || q.includes('shotokan') || q.includes('wkf') || q.includes('skif') || q.includes('каратэ')) {
      if (currentLang === 'ky') {
        return 'Star Karate Club клубунда биз Шотокан Каратэ-До (Shotokan Karate-Do) стилин үйрөтөбүз. Биз расмий S.K.I.F. (эл аралык салттуу мектеп) жана W.K.F. (олимпиадалык каратэ) системалары боюнча иштейбиз. Биз Киокусинкай эмеспиз, салттуу жана спорттук Шотоканды өздөштүрөбүз!';
      }
      if (currentLang === 'en') {
        return 'Star Karate Club specializes exclusively in traditional Shotokan Karate-Do under international S.K.I.F. standards and Olympic sport karate under W.K.F. rules. We do not practice Kyokushin.';
      }
      return 'В Star Karate Club мы обучаем классическому стилю Шотокан Каратэ-До (Shotokan Karate-Do). Клуб аккредитован международной федерацией S.K.I.F. (мастера Хирокадзу Канадзава и Манабу Мураками) и олимпийской системой W.K.F. Мы не относимся к стилю Киокусинкай!';
    }
    if (q.includes('тренер') || q.includes('сэнсэй') || q.includes('сенсей') || q.includes('coach') || q.includes('sensei') || q.includes('абдибек') || q.includes('апсатаров') || q.includes('машыктыр')) {
      if (currentLang === 'ky') {
        return 'Биздин башкы машыктыруучу — Сэнсэй Абдибек Апсатаров: кара кур III Дан, 20 жылдан ашык машыктыруучулук тажрыйбасы бар, S.K.I.F. жана W.K.F. боюнча лицензияланган насаатчы.';
      }
      if (currentLang === 'en') {
        return 'Our head sensei is Abdibek Apsatarov: 3rd Dan black belt holder with over 20+ years of mastery under SKIF and WKF standards.';
      }
      return 'Наш главный наставник — Сэнсэй Абдибек Апсатаров: обладатель черного пояса III Дана, стаж тренерской работы более 20 лет, сертифицированный тренер федераций SKIF и WKF.';
    }
    if (q.includes('баа') || q.includes('цен') || q.includes('стоим') || q.includes('акча') || q.includes('price') || q.includes('cost')) {
      if (currentLang === 'ky') {
        return 'Биринчи сыноо машыгуусу акысыз! Баалар жана абонементтер боюнча так маалыматты WhatsApp аркылуу биле аласыз: +996 999 099 992 же +996 771 878 018.';
      }
      if (currentLang === 'en') {
        return 'The first trial session is completely free! For current pricing and monthly membership packages, please message us directly on WhatsApp: +996 999 099 992.';
      }
      return 'Первая пробная тренировка бесплатная! Точную стоимость абонементов уточняйте у администраторов по WhatsApp: +996 999 099 992 или +996 771 878 018.';
    }
    if (q.includes('расписан') || q.includes('жадыбал') || q.includes('убакыт') || q.includes('время') || q.includes('график') || q.includes('schedule')) {
      if (currentLang === 'ky') {
        return 'Жадыбал: Кенже тайпа (4-7 жаш) Дш-Шр-Жм 17:00-18:00; Орто тайпа (8-13 жаш) Дш-Шр-Жм 18:00-19:30; Улуу тайпа (14+) Шш-Бш-Иш 19:00-21:00.';
      }
      if (currentLang === 'en') {
        return 'Schedule: Kids (4-7) Mon-Wed-Fri 17:00-18:00; Juniors (8-13) Mon-Wed-Fri 18:00-19:30; Adults (14+) Tue-Thu-Sat 19:00-21:00.';
      }
      return 'Расписание: Младшая (4-7 лет) Пн-Ср-Пт 17:00-18:00; Средняя (8-13 лет) Пн-Ср-Пт 18:00-19:30; Старшая (14+ лет) Вт-Чт-Сб 19:00-21:00.';
    }
    if (currentLang === 'ky') {
      return 'Star Karate Club — Бишкектеги Шотокан Каратэ-До (SKIF & WKF) клубу. Суроолоруңуз болсо, WhatsApp аркылуу түз байланышыңыз: +996 999 099 992.';
    }
    if (currentLang === 'en') {
      return 'Star Karate Club teaches authentic Shotokan Karate-Do (SKIF & WKF) in Bishkek. Contact us anytime on WhatsApp: +996 999 099 992!';
    }
    return 'Star Karate Club обучает Шотокан Каратэ-До (SKIF & WKF) для детей от 4 лет и взрослых. Главный тренер — Сэнсэй Абдибек Апсатаров (III Дан). Записаться на пробное занятие: WhatsApp +996 999 099 992!';
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      
      const data = await response.json();
      
      if (data.error || !data.text) {
        throw new Error(data.error || 'Empty response');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch {
      const reply = getFallbackReply(userMessage, lang);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:scale-110 transition-transform z-50"
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center">
                  <Star size={20} className="text-white fill-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">{t.chatTitle}</h3>
                  <span className="text-xs text-brand-red font-medium">Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-950/50 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-brand-red text-white rounded-tr-sm' 
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-5 py-4 flex gap-2 items-center">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800 shrink-0">
              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chatPlaceholder}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-5 pr-14 py-4 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-red hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <Send size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-zinc-950 selection:bg-brand-red/30 selection:text-brand-red font-sans">
        <Header />
        <main>
          <Hero />
          <Stats />
          <CoachSection />
          <FederationsSection />
          <Schedule />
          <Gallery />
          <VideoSection />
          <Testimonials />
          <FAQ />
          <BookingSection />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}
