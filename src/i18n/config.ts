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

      // Contact Form
      "contact.title": "Get in Touch",
      "contact.name": "Your Name",
      "contact.email": "Your Email",
      "contact.message": "Your Message",
      "contact.send": "Send Message",
      "contact.sending": "Sending...",
      "contact.success": "Message sent successfully!",
      "contact.error": "Failed to send message. Please try again.",
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

      // Contact Form
      "contact.title": "Contacto",
      "contact.name": "Tu Nombre",
      "contact.email": "Tu Email",
      "contact.message": "Tu Mensaje",
      "contact.send": "Enviar Mensaje",
      "contact.sending": "Enviando...",
      "contact.success": "¡Mensaje enviado con éxito!",
      "contact.error": "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
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

      // Contact Form
      "contact.title": "Contact",
      "contact.name": "Votre Nom",
      "contact.email": "Votre Email",
      "contact.message": "Votre Message",
      "contact.send": "Envoyer",
      "contact.sending": "Envoi en cours...",
      "contact.success": "Message envoyé avec succès !",
      "contact.error": "Échec de l'envoi du message. Veuillez réessayer.",
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