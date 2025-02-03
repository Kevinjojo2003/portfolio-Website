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