/* Privacy Policy and Terms of Use text.
   Each page is a list of sections: { h: heading, p: [paragraphs], ul: [bullets] }.
   Have these reviewed by a qualified professional before relying on them. */
(function () {
  'use strict';
  var C = window.RR_CONFIG;
  var NAME = C.operatorName || 'Rewind & Renew';

  function contact() {
    return C.contactEmail
      ? { h: 'Contact', p: ['Questions about this page? Email ' + C.contactEmail + '.'], mail: C.contactEmail }
      : null;
  }

  function privacy() {
    var s = [
      { h: 'The short version', p: [
        NAME + ' does not store, save, or sell your answers, stories, or images. We have no accounts, no database, and no copy of anything you write. Everything you create stays in your own web browser, on your own device.' +
        (C.imageEndpoint ? ' The one exception is your picture: to create it with AI, a short description built from your hopes is sent, through our server, to ElevenLabs. We don’t keep it, and you can choose a drawn image instead so that nothing is sent.' : ' Nothing leaves your device unless you choose to send it.')
      ] },
      { h: 'What stays on your device', p: [
        'While you reflect, the site saves your progress in your browser’s local storage so you can leave and come back. That includes your answers, the stories you edit, your chosen word, and your image settings (mood, color temperature, and time of day).',
        'This copy lives only on the device and browser you are using. It is never sent to us or to anyone else. Because we don’t hold a copy, we can’t see it, recover it, or restore it for you.'
      ] },
      { h: 'What we don’t do', ul: [
        'No accounts or sign-ups.',
        'No analytics, tracking pixels, advertising, or marketing cookies.',
        'No selling or sharing of your information. We don’t keep any of it' + (C.imageEndpoint ? ', and the only thing sent out is the image description described below.' : '.'),
        'No using your words for public content, and no using them to train AI models.'
      ] },
      { h: 'How your stories and images are made', p: [
        'Your stories are written on your device from your own words. Nothing is sent over the internet to write them.'
      ].concat(C.imageEndpoint ? [
        'Your image is different. When AI images are switched on for this site, the site builds a short description from the hopes you shared for the coming year (your answers about what to make room for, try, feel, and your chosen word) plus the mood you picked. You can see this exact text on the screen before and while it is used.',
        'That description is sent over an encrypted connection to our server, which passes it to ElevenLabs, the AI image provider, and returns the picture to you. Our server does not log, store, or cache the description or the picture. ElevenLabs handles what it receives under its own terms and privacy policy, so please avoid putting names or private details in your hopes.',
        'You can choose “Use a drawn image instead” at any time. Then your image is drawn on your device and nothing is sent. If you do nothing, the AI image is used when it is available. To prevent abuse, our server may briefly count how many images one connection requests per hour, without keeping what was asked for.'
      ] : ['Your image is drawn on your device too, so nothing is sent anywhere to make it.']) },
      { h: 'Things outside our control', p: [
        'A few technical details are worth knowing, even though none of them include your answers:'
      ], ul: [
        'Fonts. This site loads its typefaces from Google Fonts. When your browser requests them, Google receives standard connection information such as your IP address and browser type. Google’s own privacy policy covers that.',
        'Hosting. The company that serves this website may keep ordinary server logs (such as your IP address, the time, and which files were requested). Those logs do not contain what you write.',
        'Your device. Anyone who can use your device and browser could open this site and see a saved reflection. If you share a device, use “Delete my reflection” when you are done.'
      ] },
      { h: 'When you choose to share or save', p: [
        'Saving a keepsake, saving the image, printing, copying text, or using your device’s share menu are all actions you take. Before sharing, the site shows you exactly what will be included and lets you choose each part. After that, the content goes wherever you send it, and the privacy rules of that app or person apply.',
        'The site does not create public links and does not upload anything.'
      ] }
    ];
    if (C.aiEndpoint) {
      s.splice(4, 0, { h: 'Optional writing service (enabled on this site)', p: [
        'This site has been set up to send your answers to a separate writing service when you ask for a story. They are sent only to write that story. The operator of this site is responsible for how that service handles them, and must not use them for training or public content without your clear, informed consent.'
      ] });
    }
    s.push(
      { h: 'Locked letters and earlier keepsakes', p: [
        'If you choose “Send a locked letter”, the parts you select are packed inside the link itself. We do not receive, store, or keep a copy. Anyone who has the link can read the letter once it opens, and a technically skilled person could read it earlier, because the lock is a gentle one kept by the page using the device’s clock. The text after the “#” in a link is not sent to our server by your browser, but the app you use to send the link (a messaging app or email, for example) will see it. Share it only with people you trust.',
        'Keepsakes from earlier years stay in your own browser. You can open, download, or delete each one at any time from “Your earlier keepsakes” on the first page. Calendar reminders are created on your device; if you use the Google Calendar button, only the reminder’s title, date, and (for a locked letter) its link are sent to Google when you choose to open it.'
      ] },
      { h: 'Language and fonts', p: [
        'Your chosen language is remembered in your browser so the site opens the way you left it. For some languages, the site loads a matching font from Google Fonts, which receives standard connection details such as your IP address.'
      ] },
      { h: 'Voice typing (optional)', p: [
        'Some browsers offer a “Speak your answer” button. If you use it, your browser asks for microphone permission and turns your speech into text using its own speech service. Depending on your browser, that service (for example Google’s in Chrome, or Apple’s in Safari) may receive your audio. That happens between your browser and its provider, not through us, and we never receive or store your audio. If you prefer, type your answers instead. Nothing about voice typing is used unless you press the button.'
      ] },
      { h: 'Support messages', p: [
        'If your words suggest you may be struggling or thinking about harming yourself or others, the site shows a support message with helpline numbers. This check happens only in your browser, on your device. Nothing is sent, recorded, or reported to anyone. We never ask for your precise location automatically. Only if you tap “Use my location” in the support message will your browser ask for permission. If you agree, your coordinates are matched to a country on your device to pick the right numbers. They are never sent to us or anyone else, and never saved. When you arrive, our server reads the country that your hosting provider or network has already attached to your visit (without calling any other service, and without logging or storing it), and falls back to your browser’s time zone and language settings. This is used only to show the right numbers, and you can change the country. If a message includes anything that looks like that, the site also keeps it out of AI image descriptions.'
      ] },
      { h: 'Your choices', ul: [
        'Delete everything at any time with the “Delete my reflection” button, which clears all saved data for this site from your browser.',
        'Or clear this site’s data in your browser settings. Either way, it can’t be undone, and we can’t bring it back.',
        'You can skip any question. Nothing is required to continue.'
      ] },
      { h: 'Children', p: [
        'This site is not designed for children under 13. We don’t knowingly collect information from anyone, and nothing you enter is sent to us.'
      ] },
      { h: 'Changes to this page', p: [
        'If how the site handles data ever changes, for example if a writing service is added, we will update this page and the privacy summary inside the site first, and will ask for your clear consent before using any of your words in a new way.'
      ] }
    );
    var c = contact(); if (c) s.push(c);
    return s;
  }

  function terms() {
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var AI = !!C.imageEndpoint;
    var s = [
      { h: 'Welcome', p: [
        'These terms explain how you may use ' + NAME + '. By using the site you agree to them. If you don’t agree, please don’t use it. We’ve tried to keep them plain and short. Please also read our Privacy Policy, which explains how your information is handled.'
      ] },
      { h: 'What the site is', p: [
        NAME + ' is a personal, year-end reflection tool. It helps you write about your year, turns your own words into a story, and creates an imaginative story and image about the year ahead. It is for personal, non-commercial use.'
      ] },
      { h: 'Who can use it', p: [
        'The site is intended for people aged 13 and over. If you are under the age of majority where you live, please use it with a parent or guardian’s knowledge.'
      ] },
      { h: 'Not advice, and not a prediction', ul: [
        'The site is not therapy, counseling, medical, legal, or financial advice, and it is not a substitute for any of them.',
        'The future story and image are imaginative visualizations. They are not predictions, forecasts, fortune-telling, or promises about what will happen.',
        'If you are finding things very hard, please reach out to someone you trust or a qualified professional or local support service. If you are in immediate danger, contact your local emergency number.'
      ] },
      { h: 'Your words are yours', p: [
        'You keep all rights to what you write. We don’t store your answers, stories, or images, and we claim no rights to them. You are free to use your keepsake however you like, including sharing it.',
        'Stories are built from what you wrote and may be imperfect. Please read and edit them. You are responsible for what you choose to keep or share.'
      ] }
    ];
    if (AI) {
      s.push({ h: 'AI-generated images', p: [
        'Your image is created by a third-party AI service (ElevenLabs), reached through our server, from a short description built from your hopes. You can see that description before and while it is used, and you can choose a drawn image instead at any time.',
        'AI images can be unexpected, imperfect, or different each time. They are artistic interpretations of your hopes, not depictions of real events, and not predictions. We don’t guarantee that an image will match your expectations, that it will be unique, or that it will be free of resemblance to other works.',
        'Rights in AI-generated images depend on the law where you live and on the provider’s terms, which also apply to your use of the image. Subject to those, we claim no ownership of the image and you may use it for personal purposes. If you plan to use it commercially, please check the provider’s terms first.'
      ], ul: [
        'Please keep names, private details, and other people’s personal information out of the hopes you write, because they may be included in the image description.',
        'The provider may refuse descriptions that break its content rules. If that happens you can change your words, try again, or use a drawn image.',
        'To keep the service available to everyone, we limit how many AI images one connection can create per hour.'
      ] });
    }
    s.push(
      { h: 'Your data lives on your device', p: [
        'Your progress is saved only in your browser. We can’t recover it if you clear your browser data, switch devices, or use private browsing. To keep a lasting copy, download your keepsake. See the Privacy Policy for details.'
      ] },
      { h: 'Sharing', p: [
        'Sharing is always your choice. Please don’t share other people’s private information without their consent, and only share content you are comfortable with others seeing. Once you send something outside this site, we can’t control it or take it back.'
      ] },
      { h: 'Using the site fairly', ul: [
        'Don’t try to disrupt, overload, scrape, or break into the site, its server, or its hosting.',
        'Don’t use the site to create content that is unlawful, harassing, hateful, or that infringes someone else’s rights.',
        'Don’t try to get around the limits or safeguards in place' + (AI ? ', including the AI image limits and content checks' : '') + '.',
        'Don’t copy the site’s design, text, or code and present it as your own.',
        'The site’s design, text, code, and sample artwork belong to the site’s creators.'
      ] },
      { h: 'Third-party services', p: [
        'The site relies on third parties, such as Google Fonts for typefaces' + (AI ? ' and ElevenLabs for AI images' : '') + '. We don’t control them, and they may change or become unavailable. Their own terms and privacy policies apply to what they do.'
      ] },
      { h: 'Availability', p: [
        'The experience opens on ' + MONTHS[C.opens.month] + ' ' + C.opens.day + ' each year and is designed for the days leading up to New Year’s Eve. We may change, pause, restrict, or retire the site or any feature (including AI images) at any time, and we can’t promise it will always be available or error-free.'
      ] },
      { h: 'No warranty and limits of liability', p: [
        'The site is provided “as is” and “as available”, without promises of any kind, including about accuracy, fitness for a particular purpose, or uninterrupted service. To the fullest extent the law allows, we aren’t liable for any loss or harm arising from using the site, including lost reflections, unsuitable AI images, or the actions of third-party services. Nothing in these terms limits rights you have under the law that can’t be limited.'
      ] },
      { h: 'Ending your use', p: [
        'You can stop using the site at any time and delete everything saved on your device using “Delete my reflection”. We may restrict access for anyone who breaks these terms or misuses the site.'
      ] },
      { h: 'Changes', p: [
        'We may update these terms. The date at the top shows when they last changed. Continuing to use the site after a change means you accept the updated terms.'
      ] }
    );
    var c = contact(); if (c) s.push(c);
    return s;
  }

  window.RR_LEGAL = { privacy: privacy, terms: terms };
})();
