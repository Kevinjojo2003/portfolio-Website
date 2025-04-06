
# Kevin Jojo Portfolio

![Kevin Jojo Portfolio](public/og-image.png)

A modern, responsive portfolio website showcasing Kevin Jojo's skills, projects, and experiences as an AI & Machine Learning Engineer.

## 🚀 Features

- **Responsive Design**: Fully responsive across all device sizes
- **Multilingual Support**: Available in multiple languages including English, French, German, Arabic and more
- **Dark/Light Mode**: Toggle between dark and light themes
- **Interactive UI**: Engaging animations and transitions
- **Project Showcase**: Detailed display of AI and ML projects with live demos
- **Contact Form**: Direct messaging capability for inquiries and collaborations
- **Booking System**: Schedule consultations through Calendly integration
- **Blog Section**: Featured blog posts and LinkedIn content

## 💻 Technologies Used

- **React**: Frontend library for building the user interface
- **TypeScript**: For type-safe code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn UI**: Component library for UI elements
- **i18next**: Internationalization framework
- **EmailJS**: For contact form functionality
- **React Router**: For navigation
- **Three.js**: For 3D animations
- **Lucide Icons**: For beautiful SVG icons

## 🔧 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🌐 Deployment

The site is deployed using Netlify with continuous deployment from the main branch.

## 📱 Mobile App

This portfolio is also available as a mobile application for both Android and iOS, built using Capacitor.

To build the mobile app:

1. Install Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/cli
   ```

2. Add platforms:
   ```bash
   npx cap add ios
   npx cap add android
   ```

3. Build the web app:
   ```bash
   npm run build
   ```

4. Sync with Capacitor:
   ```bash
   npx cap sync
   ```

5. Open in respective IDE:
   ```bash
   npx cap open ios     # For iOS (requires macOS)
   npx cap open android # For Android
   ```

## 🧩 Project Structure

```
src/
├── components/        # UI components
├── pages/             # Page components
├── i18n/              # Translation files
│   └── languages/     # Language-specific translations
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── main.tsx           # Application entry point
```

## 🌍 Language Support

Currently supported languages:
- English (en)
- French (fr)
- German (de)
- Arabic (ar)
- Spanish (es)
- Portuguese (pt)
- Russian (ru)
- Japanese (ja)
- Chinese (zh)
- Hindi (hi)
- And more...

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- Special thanks to [Shadcn](https://ui.shadcn.com/) for the amazing UI components
- [Lucide Icons](https://lucide.dev/) for the beautiful SVG icons
- [i18next](https://www.i18next.com/) for internationalization support

## 📬 Contact

For any inquiries, please reach out through the contact form on the website or via email.

---

Made with ❤️ by Kevin Jojo
