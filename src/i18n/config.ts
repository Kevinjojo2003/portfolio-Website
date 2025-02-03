import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Hero Section
      "hero.title": "Kevin Jojo",
      "hero.subtitle": "AI & Machine Learning Engineer",
      "hero.description1": "I'm Kevin Jojo, a passionate AI & Machine Learning Engineer and a final-year engineering student specializing in Artificial Intelligence and Machine Learning. With a strong foundation in Python, data analysis, and intelligent systems development, I thrive on solving complex problems and driving innovation through technology.",
      "hero.description2": "Explore my journey, projects, and contributions to the world of AI and discover how I blend technical expertise with a drive to create impactful solutions. Let's shape the future together!",
      "hero.viewWork": "View My Work",
      
      // Navigation
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.blogs": "Blogs",
      "nav.booking": "Book a Chat",
      "nav.contact": "Contact",
      "nav.resume": "Resume",

      // About Section
      "about.title": "Experience & Responsibilities",
      "about.education": "Education",
      "about.experience": "Experience",
      "about.responsibilities": "Positions of Responsibility",
      "about.certifications": "Certifications",

      // Skills Section
      "skills.title": "Skills & Technologies",
      "skills.programming": "Programming & Development",
      "skills.ai": "AI & Machine Learning",
      "skills.deepLearning": "Deep Learning",
      "skills.dataScience": "Data Science & Analytics",
      "skills.visualization": "Data Visualization",
      "skills.mathematics": "Mathematics & Statistics",

      // Projects Section
      "projects.title": "Featured Projects",
      "projects.liveDemo": "Live Demo",
      "projects.viewCode": "View Code",

      // Blogs Section
      "blogs.title": "My Blog Posts",

      // LinkedIn Posts Section
      "linkedin.title": "Featured LinkedIn Posts",

      // Booking Section
      "booking.title": "Book a Consultation",
      "booking.subtitle": "Schedule a Chat Session",
      "booking.services": "My Services",
      "booking.business": "Business Services",
      "booking.technical": "Technical Services",

      // Contact Form
      "contact.title": "Get In Touch",
      "contact.info": "Contact Information",
      "contact.name": "Your Name",
      "contact.email": "Your Email",
      "contact.message": "Your Message",
      "contact.send": "Send Message",
      "contact.sending": "Sending...",
      "contact.success": "Message sent successfully!",
      "contact.error": "Failed to send message. Please try again."
    }
  },
  es: {
    translation: {
      // Hero Section
      "hero.title": "Kevin Jojo",
      "hero.subtitle": "Ingeniero de IA y Aprendizaje Automático",
      "hero.description1": "Soy Kevin Jojo, un apasionado ingeniero de IA y Aprendizaje Automático y estudiante de último año especializado en Inteligencia Artificial y Aprendizaje Automático. Con una sólida base en Python, análisis de datos y desarrollo de sistemas inteligentes, me destaco en resolver problemas complejos e impulsar la innovación a través de la tecnología.",
      "hero.description2": "Explora mi trayectoria, proyectos y contribuciones al mundo de la IA y descubre cómo combino la experiencia técnica con el impulso para crear soluciones impactantes. ¡Demos forma al futuro juntos!",
      "hero.viewWork": "Ver mi trabajo",

      // Navigation
      "nav.about": "Sobre mí",
      "nav.skills": "Habilidades",
      "nav.projects": "Proyectos",
      "nav.blogs": "Blog",
      "nav.booking": "Reservar Chat",
      "nav.contact": "Contacto",
      "nav.resume": "Currículum",

      // About Section
      "about.title": "Experiencia y Responsabilidades",
      "about.education": "Educación",
      "about.experience": "Experiencia",
      "about.responsibilities": "Posiciones de Responsabilidad",
      "about.certifications": "Certificaciones",

      // Skills Section
      "skills.title": "Habilidades y Tecnologías",
      "skills.programming": "Programación y Desarrollo",
      "skills.ai": "IA y Aprendizaje Automático",
      "skills.deepLearning": "Aprendizaje Profundo",
      "skills.dataScience": "Ciencia de Datos y Análisis",
      "skills.visualization": "Visualización de Datos",
      "skills.mathematics": "Matemáticas y Estadística",

      // Projects Section
      "projects.title": "Proyectos Destacados",
      "projects.liveDemo": "Demo en Vivo",
      "projects.viewCode": "Ver Código",

      // Blogs Section
      "blogs.title": "Mis Publicaciones del Blog",

      // LinkedIn Posts Section
      "linkedin.title": "Publicaciones Destacadas de LinkedIn",

      // Booking Section
      "booking.title": "Reservar una Consulta",
      "booking.subtitle": "Programar una Sesión de Chat",
      "booking.services": "Mis Servicios",
      "booking.business": "Servicios Empresariales",
      "booking.technical": "Servicios Técnicos",

      // Contact Form
      "contact.title": "Contacto",
      "contact.info": "Información de Contacto",
      "contact.name": "Tu Nombre",
      "contact.email": "Tu Email",
      "contact.message": "Tu Mensaje",
      "contact.send": "Enviar Mensaje",
      "contact.sending": "Enviando...",
      "contact.success": "¡Mensaje enviado con éxito!",
      "contact.error": "Error al enviar el mensaje. Por favor, inténtalo de nuevo."
    }
  },
  fr: {
    translation: {
      // Hero Section
      "hero.title": "Kevin Jojo",
      "hero.subtitle": "Ingénieur en IA et Apprentissage Automatique",
      "hero.description1": "Je suis Kevin Jojo, un ingénieur passionné en IA et Apprentissage Automatique, étudiant en dernière année spécialisé en Intelligence Artificielle et Apprentissage Automatique. Avec une solide base en Python, analyse de données et développement de systèmes intelligents, j'excelle dans la résolution de problèmes complexes et l'innovation technologique.",
      "hero.description2": "Découvrez mon parcours, mes projets et mes contributions au monde de l'IA et découvrez comment je combine expertise technique et volonté de créer des solutions impactantes. Construisons l'avenir ensemble !",
      "hero.viewWork": "Voir mon travail",

      // Navigation
      "nav.about": "À propos",
      "nav.skills": "Compétences",
      "nav.projects": "Projets",
      "nav.blogs": "Blog",
      "nav.booking": "Réserver",
      "nav.contact": "Contact",
      "nav.resume": "CV",

      // About Section
      "about.title": "Expérience et Responsabilités",
      "about.education": "Formation",
      "about.experience": "Expérience",
      "about.responsibilities": "Postes à Responsabilité",
      "about.certifications": "Certifications",

      // Skills Section
      "skills.title": "Compétences et Technologies",
      "skills.programming": "Programmation et Développement",
      "skills.ai": "IA et Apprentissage Automatique",
      "skills.deepLearning": "Apprentissage Profond",
      "skills.dataScience": "Science des Données et Analyse",
      "skills.visualization": "Visualisation des Données",
      "skills.mathematics": "Mathématiques et Statistiques",

      // Projects Section
      "projects.title": "Projets en Vedette",
      "projects.liveDemo": "Démo en Direct",
      "projects.viewCode": "Voir le Code",

      // Blogs Section
      "blogs.title": "Mes Articles de Blog",

      // LinkedIn Posts Section
      "linkedin.title": "Publications LinkedIn en Vedette",

      // Booking Section
      "booking.title": "Réserver une Consultation",
      "booking.subtitle": "Planifier une Session de Chat",
      "booking.services": "Mes Services",
      "booking.business": "Services aux Entreprises",
      "booking.technical": "Services Techniques",

      // Contact Form
      "contact.title": "Contact",
      "contact.info": "Informations de Contact",
      "contact.name": "Votre Nom",
      "contact.email": "Votre Email",
      "contact.message": "Votre Message",
      "contact.send": "Envoyer",
      "contact.sending": "Envoi en cours...",
      "contact.success": "Message envoyé avec succès !",
      "contact.error": "Échec de l'envoi du message. Veuillez réessayer."
    }
  },
  zh: {
    translation: {
      "hero.title": "Kevin Jojo",
      "hero.subtitle": "人工智能与机器学习工程师",
      "hero.description1": "我是Kevin Jojo，一位热衷于人工智能和机器学习的工程师，目前是人工智能和机器学习专业的应届工程学生。凭借扎实的Python、数据分析和智能系统开发基础，我擅长解决复杂问题并通过技术推动创新。",
      "hero.description2": "探索我在人工智能领域的旅程、项目和贡献，了解我如何将技术专长与创造有影响力的解决方案的动力相结合。让我们一起塑造未来！",
      "hero.viewWork": "查看我的作品",
      "nav.about": "关于",
      "nav.skills": "技能",
      "nav.projects": "项目",
      "nav.blogs": "博客",
      "nav.booking": "预约",
      "nav.contact": "联系",
      "nav.resume": "简历",
      "about.title": "经验与职责",
      "about.education": "教育背景",
      "about.experience": "工作经验",
      "about.responsibilities": "职责",
      "about.certifications": "证书",
      "skills.title": "技能与技术",
      "skills.programming": "编程与开发",
      "skills.ai": "人工智能与机器学习",
      "skills.deepLearning": "深度学习",
      "skills.dataScience": "数据科学与分析",
      "skills.visualization": "数据可视化",
      "skills.mathematics": "数学与统计",
      "projects.title": "精选项目",
      "projects.liveDemo": "在线演示",
      "projects.viewCode": "查看代码",
      "blogs.title": "我的博客文章",
      "linkedin.title": "精选领英文章",
      "booking.title": "预约咨询",
      "booking.subtitle": "安排聊天会话",
      "booking.services": "我的服务",
      "booking.business": "商业服务",
      "booking.technical": "技术服务",
      "contact.title": "联系我",
      "contact.info": "联系信息",
      "contact.name": "您的姓名",
      "contact.email": "您的邮箱",
      "contact.message": "您的留言",
      "contact.send": "发送留言",
      "contact.sending": "发送中...",
      "contact.success": "留言发送成功！",
      "contact.error": "发送失败，请重试。"
    }
  },
  de: {
    translation: {
      "hero.title": "Kevin Jojo",
      "hero.subtitle": "KI & Maschinelles Lernen Ingenieur",
      "hero.description1": "Ich bin Kevin Jojo, ein leidenschaftlicher KI & Machine Learning Ingenieur und Informatikstudent im letzten Jahr mit Spezialisierung auf Künstliche Intelligenz und Maschinelles Lernen. Mit fundierten Kenntnissen in Python, Datenanalyse und der Entwicklung intelligenter Systeme löse ich komplexe Probleme und treibe Innovation durch Technologie voran.",
      "hero.description2": "Entdecken Sie meine Reise, Projekte und Beiträge zur Welt der KI und erfahren Sie, wie ich technische Expertise mit dem Antrieb verbinde, wirkungsvolle Lösungen zu schaffen. Lassen Sie uns gemeinsam die Zukunft gestalten!",
      "hero.viewWork": "Meine Arbeit ansehen",
      "nav.about": "Über mich",
      "nav.skills": "Fähigkeiten",
      "nav.projects": "Projekte",
      "nav.blogs": "Blog",
      "nav.booking": "Termin buchen",
      "nav.contact": "Kontakt",
      "nav.resume": "Lebenslauf",
      "about.title": "Erfahrung & Verantwortlichkeiten",
      "about.education": "Ausbildung",
      "about.experience": "Erfahrung",
      "about.responsibilities": "Verantwortlichkeiten",
      "about.certifications": "Zertifizierungen",
      "skills.title": "Fähigkeiten & Technologien",
      "skills.programming": "Programmierung & Entwicklung",
      "skills.ai": "KI & Maschinelles Lernen",
      "skills.deepLearning": "Deep Learning",
      "skills.dataScience": "Data Science & Analytik",
      "skills.visualization": "Datenvisualisierung",
      "skills.mathematics": "Mathematik & Statistik",
      "projects.title": "Ausgewählte Projekte",
      "projects.liveDemo": "Live Demo",
      "projects.viewCode": "Code ansehen",
      "blogs.title": "Meine Blogbeiträge",
      "linkedin.title": "Ausgewählte LinkedIn-Beiträge",
      "booking.title": "Beratung buchen",
      "booking.subtitle": "Chat-Session planen",
      "booking.services": "Meine Dienstleistungen",
      "booking.business": "Business Services",
      "booking.technical": "Technische Services",
      "contact.title": "Kontakt aufnehmen",
      "contact.info": "Kontaktinformationen",
      "contact.name": "Ihr Name",
      "contact.email": "Ihre E-Mail",
      "contact.message": "Ihre Nachricht",
      "contact.send": "Nachricht senden",
      "contact.sending": "Wird gesendet...",
      "contact.success": "Nachricht erfolgreich gesendet!",
      "contact.error": "Fehler beim Senden. Bitte versuchen Sie es erneut."
    }
  },
  hi: {
    translation: {
      "hero.title": "केविन जोजो",
      "hero.subtitle": "एआई और मशीन लर्निंग इंजीनियर",
      "hero.description1": "मैं केविन जोजो हूं, एक जुनूनी एआई और मशीन लर्निंग इंजीनियर और आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग में विशेषज्ञता वाला अंतिम वर्ष का इंजीनियरिंग छात्र। पायथन, डेटा विश्लेषण और बुद्धिमान सिस्टम विकास में मजबूत आधार के साथ, मैं जटिल समस्याओं को हल करने और प्रौद्योगिकी के माध्यम से नवाचार को आगे बढ़ाने में सफल हूं।",
      "hero.description2": "एआई की दुनिया में मेरी यात्रा, परियोजनाओं और योगदान का पता लगाएं और जानें कि मैं कैसे तकनीकी विशेषज्ञता को प्रभावशाली समाधान बनाने के जुनून के साथ जोड़ता हूं। आइए मिलकर भविष्य को आकार दें!",
      "hero.viewWork": "मेरा काम देखें",
      "nav.about": "परिचय",
      "nav.skills": "कौशल",
      "nav.projects": "प्रोजेक्ट्स",
      "nav.blogs": "ब्लॉग",
      "nav.booking": "बुकिंग",
      "nav.contact": "संपर्क",
      "nav.resume": "रेज्यूमे",
      "about.title": "अनुभव और जिम्मेदारियां",
      "about.education": "शिक्षा",
      "about.experience": "अनुभव",
      "about.responsibilities": "जिम्मेदारियां",
      "about.certifications": "प्रमाणपत्र",
      "skills.title": "कौशल और तकनीक",
      "skills.programming": "प्रोग्रामिंग और विकास",
      "skills.ai": "एआई और मशीन लर्निंग",
      "skills.deepLearning": "डीप लर्निंग",
      "skills.dataScience": "डेटा साइंस और विश्लेषण",
      "skills.visualization": "डेटा विजुअलाइजेशन",
      "skills.mathematics": "गणित और सांख्यिकी",
      "projects.title": "विशेष प्रोजेक्ट्स",
      "projects.liveDemo": "लाइव डेमो",
      "projects.viewCode": "कोड देखें",
      "blogs.title": "मेरे ब्लॉग पोस्ट",
      "linkedin.title": "विशेष लिंक्डइन पोस्ट",
      "booking.title": "परामर्श बुक करें",
      "booking.subtitle": "चैट सेशन शेड्यूल करें",
      "booking.services": "मेरी सेवाएं",
      "booking.business": "व्यावसायिक सेवाएं",
      "booking.technical": "तकनीकी सेवाएं",
      "contact.title": "संपर्क करें",
      "contact.info": "संपर्क जानकारी",
      "contact.name": "आपका नाम",
      "contact.email": "आपका ईमेल",
      "contact.message": "आपका संदेश",
      "contact.send": "संदेश भेजें",
      "contact.sending": "भेजा जा रहा है...",
      "contact.success": "संदेश सफलतापूर्वक भेजा गया!",
      "contact.error": "संदेश भेजने में विफल। कृपया पुनः प्रयास करें।"
    }
  },
  ar: {
    translation: {
      "hero.title": "كيفن جوجو",
      "hero.subtitle": "مهندس الذكاء الاصطناعي وتعلم الآلة",
      "hero.description1": "أنا كيفن جوجو، مهندس متحمس في مجال الذكاء الاصطناعي وتعلم الآلة وطالب هندسة في السنة النهائية متخصص في الذكاء الاصطناعي وتعلم الآلة. مع أساس قوي في بايثون وتحليل البيانات وتطوير الأنظمة الذكية، أتفوق في حل المشكلات المعقدة ودفع الابتكار من خلال التكنولوجيا.",
      "hero.description2": "اكتشف رحلتي ومشاريعي ومساهماتي في عالم الذكاء الاصطناعي واكتشف كيف أمزج بين الخبرة التقنية والدافع لإنشاء حلول مؤثرة. دعنا نشكل المستقبل معاً!",
      "hero.viewWork": "عرض أعمالي",
      "nav.about": "نبذة عني",
      "nav.skills": "المهارات",
      "nav.projects": "المشاريع",
      "nav.blogs": "المدونة",
      "nav.booking": "حجز موعد",
      "nav.contact": "اتصل بي",
      "nav.resume": "السيرة الذاتية",
      "about.title": "الخبرة والمسؤوليات",
      "about.education": "التعليم",
      "about.experience": "الخبرة",
      "about.responsibilities": "المسؤوليات",
      "about.certifications": "الشهادات",
      "skills.title": "المهارات والتقنيات",
      "skills.programming": "البرمجة والتطوير",
      "skills.ai": "الذكاء الاصطناعي وتعلم الآلة",
      "skills.deepLearning": "التعلم العميق",
      "skills.dataScience": "علوم البيانات والتحليلات",
      "skills.visualization": "تصور البيانات",
      "skills.mathematics": "الرياضيات والإحصاء",
      "projects.title": "مشاريع مميزة",
      "projects.liveDemo": "عرض حي",
      "projects.viewCode": "عرض الكود",
      "blogs.title": "مقالاتي",
      "linkedin.title": "منشورات لينكد إن المميزة",
      "booking.title": "حجز استشارة",
      "booking.subtitle": "جدولة جلسة محادثة",
      "booking.services": "خدماتي",
      "booking.business": "الخدمات التجارية",
      "booking.technical": "الخدمات التقنية",
      "contact.title": "تواصل معي",
      "contact.info": "معلومات الاتصال",
      "contact.name": "اسمك",
      "contact.email": "بريدك الإلكتروني",
      "contact.message": "رسالتك",
      "contact.send": "إرسال الرسالة",
      "contact.sending": "جاري الإرسال...",
      "contact.success": "تم إرسال الرسالة بنجاح!",
      "contact.error": "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى."
    }
  },
  pt: {
    translation: {
      "hero.title": "Kevin Jojo",
      "hero.subtitle": "Engenheiro de IA e Aprendizado de Máquina",
      "hero.description1": "Sou Kevin Jojo, um engenheiro apaixonado por IA e Aprendizado de Máquina e estudante do último ano de engenharia especializado em Inteligência Artificial e Aprendizado de Máquina. Com uma base sólida em Python, análise de dados e desenvolvimento de sistemas inteligentes, destaco-me na resolução de problemas complexos e impulsiono a inovação através da tecnologia.",
      "hero.description2": "Explore minha jornada, projetos e contribuições para o mundo da IA e descubra como combino expertise técnica com o impulso para criar soluções impactantes. Vamos moldar o futuro juntos!",
      "hero.viewWork": "Ver Meu Trabalho",
      "nav.about": "Sobre",
      "nav.skills": "Habilidades",
      "nav.projects": "Projetos",
      "nav.blogs": "Blog",
      "nav.booking": "Agendar",
      "nav.contact": "Contato",
      "nav.resume": "Currículo",
      "about.title": "Experiência e Responsabilidades",
      "about.education": "Educação",
      "about.experience": "Experiência",
      "about.responsibilities": "Responsabilidades",
      "about.certifications": "Certificações",
      "skills.title": "Habilidades e Tecnologias",
      "skills.programming": "Programação e Desenvolvimento",
      "skills.ai": "IA e Aprendizado de Máquina",
      "skills.deepLearning": "Deep Learning",
      "skills.dataScience": "Ciência de Dados e Análise",
      "skills.visualization": "Visualização de Dados",
      "skills.mathematics": "Matemática e Estatística",
      "projects.title": "Projetos em Destaque",
      "projects.liveDemo": "Demo ao Vivo",
      "projects.viewCode": "Ver Código",
      "blogs.title": "Meus Posts do Blog",
      "linkedin.title": "Posts em Destaque do LinkedIn",
      "booking.title": "Agendar Consulta",
      "booking.subtitle": "Agendar Sessão de Chat",
      "booking.services": "Meus Serviços",
      "booking.business": "Serviços Empresariais",
      "booking.technical": "Serviços Técnicos",
      "contact.title": "Entre em Contato",
      "contact.info": "Informações de Contato",
      "contact.name": "Seu Nome",
      "contact.email": "Seu Email",
      "contact.message": "Sua Mensagem",
      "contact.send": "Enviar Mensagem",
      "contact.sending": "Enviando...",
      "contact.success": "Mensagem enviada com sucesso!",
      "contact.error": "Falha ao enviar mensagem. Por favor, tente novamente."
    }
  },
  ru: {
    translation: {
      "hero.title": "Кевин Джоджо",
      "hero.subtitle": "Инженер по ИИ и машинному обучению",
      "hero.description1": "Я Кевин Джоджо, увлеченный инженер по ИИ и машинному обучению, студент последнего курса инженерного факультета, специализирующийся на искусственном интеллекте и машинном обучении. С прочной основой в Python, анализе данных и разработке интеллектуальных систем, я преуспеваю в решении сложных задач и продвижении инноваций через технологии.",
      "hero.description2": "Исследуйте мой путь, проекты и вклад в мир ИИ и узнайте, как я сочетаю техническую экспертизу со стремлением создавать влиятельные решения. Давайте вместе формировать будущее!",
      "hero.viewWork": "Посмотреть мои работы",
      "nav.about": "Обо мне",
      "nav.skills": "Навыки",
      "nav.projects": "Проекты",
      "nav.blogs": "Блог",
      "nav.booking": "Бронирование",
      "nav.contact": "Контакты",
      "nav.resume": "Резюме",
      "about.title": "Опыт и обязанности",
      "about.education": "Образование",
      "about.experience": "Опыт",
      "about.responsibilities": "Обязанности",
      "about.certifications": "Сертификаты",
      "skills.title": "Навыки и технологии",
      "skills.programming": "Программирование и разработка",
      "skills.ai": "ИИ и машинное обучение",
      "skills.deepLearning": "Глубокое обучение",
      "skills.dataScience": "Наука о данных и аналитика",
      "skills.visualization": "Визуализация данных",
      "skills.mathematics": "Математика и статистика",
      "projects.title": "Избранные проекты",
      "projects.liveDemo": "Живая демонстрация",
      "projects.viewCode": "Посмотреть код",
      "blogs.title": "Мои блог-посты",
      "linkedin.title": "Избранные посты LinkedIn",
      "booking.title": "Записаться на консультацию",
      "booking.subtitle": "Запланировать чат-сессию",
      "booking.services": "Мои услуги",
      "booking.business": "Бизнес-услуги",
      "booking.technical": "Технические услуги",
      "contact.title": "Связаться со мной",
      "contact.info": "Контактная информация",
      "contact.name": "Ваше имя",
      "contact.email": "Ваш email",
      "contact.message": "Ваше сообщение",
      "contact.send": "Отправить сообщение",
      "contact.sending": "Отправка...",
      "contact.success": "Сообщение успешно отправлено!",
      "contact.error": "Не удалось отправить сообщение. Пожалуйста, попробуйте снова."
    }
  },
  ja: {
    translation: {
      "hero.title": "ケビン・ジョジョ",
      "hero.subtitle": "AI＆機械学習エンジニア",
      "hero.description1": "私はケビン・ジョジョ、情熱的なAI＆機械学習エンジニアで、人工知能と機械学習を専攻する最終学年の工学生です。Python、データ分析、インテリジェントシステム開発の強固な基盤を持ち、複雑な問題解決と技術を通じたイノベーションの推進に長けています。",
      "hero.description2": "AIの世界における私の旅、プロジェクト、貢献を探索し、技術的専門知識とインパクトのあるソリューションを生み出す原動力をどのように組み合わせているかをご覧ください。一緒に未来を形作りましょう！",
      "hero.viewWork": "作品を見る",
      "nav.about": "概要",
      "nav.skills": "スキル",
      "nav.projects": "プロジェクト",
      "nav.blogs": "ブログ",
      "nav.booking": "予約",
      "nav.contact": "連絡先",
      "nav.resume": "履歴書",
      "about.title": "経験と責任",
      "about.education": "教育",
      "about.experience": "経験",
      "about.responsibilities": "責任",
      "about.certifications": "資格",
      "skills.title": "スキルと技術",
      "skills.programming": "プログラミングと開発",
      "skills.ai": "AIと機械学習",
      "skills.deepLearning": "ディープラーニング",
      "skills.dataScience": "データサイエンスと分析",
      "skills.visualization": "データ可視化",
      "skills.mathematics": "数学と統計",
      "projects.title": "注目のプロジェクト",
      "projects.liveDemo": "ライブデモ",
      "projects.viewCode": "コードを見る",
      "blogs.title": "ブログ投稿",
      "linkedin.title": "注目のLinkedIn投稿",
      "booking.title": "相談予約",
      "booking.subtitle": "チャットセッションの予約",
      "booking.services": "サービス",
      "booking.business": "ビジネスサービス",
      "booking.technical": "技術サービス",
      "contact.title": "お問い合わせ",
      "contact.info": "連絡先情報",
      "contact.name": "お名前",
      "contact.email": "メールアドレス",
      "contact.message": "メッセージ",
      "contact.send": "送信",
      "contact.sending": "送信中...",
      "contact.success": "メッセージを送信しました！",
      "contact.error": "送信に失敗しました。もう一度お試しください。"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
