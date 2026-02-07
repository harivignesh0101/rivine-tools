export type ToolSeoData = {
  overview: {
    title: string;
    paragraphs: string[];
  };
  howTo: {
    title: string;
    steps: string[];
  };
  useCases: {
    title: string;
    bullets: string[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
};

export const toolSeoContent: Record<string, ToolSeoData> = {
  characterCounter: {
    overview: {
      title: "Character counter overview",
      paragraphs: [
        "Count characters, words, and spaces instantly for drafts, captions, and form fields.",
        "This tool runs in your browser, so your text stays private while you check limits fast.",
      ],
    },
    howTo: {
      title: "How to use the character counter",
      steps: [
        "Paste or type your text in the editor.",
        "Review live totals for characters, words, and spaces.",
        "Adjust the text until it fits your target length.",
      ],
    },
    useCases: {
      title: "Common character counter use cases",
      bullets: [
        "Social posts with strict character limits.",
        "Meta descriptions and SEO snippets.",
        "SMS, ads, and short-form copy constraints.",
      ],
    },
    faq: {
      title: "Character counter FAQ",
      items: [
        {
          question: "Does the counter include spaces and punctuation?",
          answer:
            "Yes, the character total includes spaces and punctuation so the count matches most platform limits.",
        },
        {
          question: "Is my text uploaded anywhere?",
          answer:
            "No. The counter runs locally in your browser and does not upload your text.",
        },
        {
          question: "Can I use it for multi-language text?",
          answer:
            "Yes. It works with any language and counts characters exactly as entered.",
        },
      ],
    },
  },
  wordCounter: {
    overview: {
      title: "Word counter overview",
      paragraphs: [
        "Track word totals instantly for articles, essays, and marketing copy.",
        "Get a fast word count without installing anything or sharing your text.",
      ],
    },
    howTo: {
      title: "How to use the word counter",
      steps: [
        "Paste or type your text in the editor.",
        "Check the live word total as you write.",
        "Trim or expand content to match your target length.",
      ],
    },
    useCases: {
      title: "Common word counter use cases",
      bullets: [
        "Blog posts and articles with minimum word targets.",
        "Academic writing with strict word limits.",
        "Marketing copy, reports, and summaries.",
      ],
    },
    faq: {
      title: "Word counter FAQ",
      items: [
        {
          question: "How are words counted?",
          answer:
            "Words are counted based on spaces between terms, which matches standard word counting.",
        },
        {
          question: "Does it work for long documents?",
          answer:
            "Yes. You can paste large blocks of text and see instant totals.",
        },
        {
          question: "Is the tool free to use?",
          answer:
            "Yes, it is free and works directly in your browser.",
        },
      ],
    },
  },
  textCompare: {
    overview: {
      title: "Text compare overview",
      paragraphs: [
        "Compare two blocks of text to spot differences quickly and accurately.",
        "Great for proofreading, editing, and verifying changes between versions.",
      ],
    },
    howTo: {
      title: "How to compare text",
      steps: [
        "Paste the original text into the first panel.",
        "Paste the updated text into the second panel.",
        "Review highlights to see what changed.",
      ],
    },
    useCases: {
      title: "Common text compare use cases",
      bullets: [
        "Proofreading revisions and content updates.",
        "Checking code snippets or configuration changes.",
        "Comparing contracts, emails, or legal drafts.",
      ],
    },
    faq: {
      title: "Text compare FAQ",
      items: [
        {
          question: "Does it show additions and deletions?",
          answer:
            "Yes. Differences are highlighted so you can see both added and removed text.",
        },
        {
          question: "Can I compare large texts?",
          answer:
            "Yes. The tool is designed to handle long passages efficiently.",
        },
        {
          question: "Is my data saved anywhere?",
          answer:
            "No. Text stays in your browser and is not uploaded.",
        },
      ],
    },
  },
  textToHandwriting: {
    overview: {
      title: "Text to handwriting overview",
      paragraphs: [
        "Convert typed text into handwriting-style output for notes, assignments, or mockups.",
        "Generate a clean handwritten look without installing any font packs.",
      ],
    },
    howTo: {
      title: "How to convert text to handwriting",
      steps: [
        "Enter or paste your text into the input area.",
        "Choose a handwriting style and formatting options.",
        "Generate and download the handwritten result.",
      ],
    },
    useCases: {
      title: "Common text to handwriting use cases",
      bullets: [
        "Creating handwritten study notes quickly.",
        "Designing handwritten-style posters or mockups.",
        "Presenting assignments with a handwritten look.",
      ],
    },
    faq: {
      title: "Text to handwriting FAQ",
      items: [
        {
          question: "Can I change the handwriting style?",
          answer:
            "Yes. You can pick from available styles and adjust formatting options.",
        },
        {
          question: "Does it support multiple pages?",
          answer:
            "Yes. Longer text can be split into multiple pages for export.",
        },
        {
          question: "Is my text stored on a server?",
          answer:
            "No. Your text is processed in the browser and not uploaded.",
        },
      ],
    },
  },
  passwordGenerator: {
    overview: {
      title: "Password generator overview",
      paragraphs: [
        "Create strong, unique passwords instantly for accounts and applications.",
        "Use length and character options to match security requirements.",
      ],
    },
    howTo: {
      title: "How to generate a password",
      steps: [
        "Choose the desired password length.",
        "Select character types like letters, numbers, and symbols.",
        "Generate and copy a secure password.",
      ],
    },
    useCases: {
      title: "Common password generator use cases",
      bullets: [
        "Securing new accounts with strong passwords.",
        "Rotating credentials for work or shared systems.",
        "Creating unique passwords for password managers.",
      ],
    },
    faq: {
      title: "Password generator FAQ",
      items: [
        {
          question: "Are generated passwords stored anywhere?",
          answer:
            "No. Passwords are generated locally in your browser and are not saved.",
        },
        {
          question: "Can I exclude similar characters?",
          answer:
            "Yes. Adjust the options to avoid characters that look alike.",
        },
        {
          question: "What length should I use?",
          answer:
            "Use at least 12 to 16 characters for strong security, or more for sensitive accounts.",
        },
      ],
    },
  },
  timer: {
    overview: {
      title: "Online timer overview",
      paragraphs: [
        "Set a simple online timer for focus sessions, workouts, or reminders.",
        "Run the timer in your browser with a clean, distraction-free layout.",
      ],
    },
    howTo: {
      title: "How to use the timer",
      steps: [
        "Set the desired time duration.",
        "Start the timer and keep the tab open.",
        "Reset or pause as needed.",
      ],
    },
    useCases: {
      title: "Common timer use cases",
      bullets: [
        "Pomodoro focus sessions and study blocks.",
        "Cooking, workouts, and short breaks.",
        "Meeting or presentation time tracking.",
      ],
    },
    faq: {
      title: "Timer FAQ",
      items: [
        {
          question: "Will the timer keep running in the background?",
          answer:
            "Yes, as long as the browser tab remains open.",
        },
        {
          question: "Can I set multiple timers?",
          answer:
            "This page focuses on a single timer for simplicity and clarity.",
        },
        {
          question: "Is it free to use?",
          answer:
            "Yes. The timer is free and works directly in your browser.",
        },
      ],
    },
  },
  jsonEditor: {
    overview: {
      title: "JSON editor overview",
      paragraphs: [
        "Edit, format, and validate JSON with a clean online editor.",
        "Use it to clean up API responses, configs, and data files quickly.",
      ],
    },
    howTo: {
      title: "How to use the JSON editor",
      steps: [
        "Paste your JSON into the editor.",
        "Format or validate to detect errors.",
        "Copy the cleaned JSON for your project.",
      ],
    },
    useCases: {
      title: "Common JSON editor use cases",
      bullets: [
        "Formatting API responses for readability.",
        "Fixing syntax errors in config files.",
        "Preparing JSON for docs or testing.",
      ],
    },
    faq: {
      title: "JSON editor FAQ",
      items: [
        {
          question: "Does it validate JSON syntax?",
          answer:
            "Yes. The editor detects common JSON errors and formatting issues.",
        },
        {
          question: "Can I work with large JSON files?",
          answer:
            "Yes, but extremely large files may be slower in the browser.",
        },
        {
          question: "Is my JSON stored anywhere?",
          answer:
            "No. Your data stays in the browser and is not uploaded.",
        },
      ],
    },
  },
  imageMerge: {
    overview: {
      title: "Image merge overview",
      paragraphs: [
        "Combine multiple images into one file with a few clicks.",
        "Useful for creating collages, before-and-after comparisons, or simple layouts.",
      ],
    },
    howTo: {
      title: "How to merge images",
      steps: [
        "Upload the images you want to combine.",
        "Choose layout options and order.",
        "Export a single merged image.",
      ],
    },
    useCases: {
      title: "Common image merge use cases",
      bullets: [
        "Creating product comparison images.",
        "Building simple collages for social media.",
        "Merging screenshots for documentation.",
      ],
    },
    faq: {
      title: "Image merge FAQ",
      items: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Images are processed in the browser and are not uploaded.",
        },
        {
          question: "What image formats are supported?",
          answer:
            "Common formats like PNG and JPG are supported.",
        },
        {
          question: "Can I control the output size?",
          answer:
            "Yes. You can adjust layout and export size options before saving.",
        },
      ],
    },
  },
  instagramPostGenerator: {
    overview: {
      title: "Instagram post generator overview",
      paragraphs: [
        "Create clean Instagram-ready post layouts quickly in your browser.",
        "Use templates and spacing controls to keep designs consistent.",
      ],
    },
    howTo: {
      title: "How to generate an Instagram post",
      steps: [
        "Add your text, images, or brand colors.",
        "Adjust layout and spacing to fit the canvas.",
        "Export the post image for upload.",
      ],
    },
    useCases: {
      title: "Common Instagram post generator use cases",
      bullets: [
        "Creating daily quotes or announcements.",
        "Designing promotional posts and events.",
        "Keeping a consistent visual brand style.",
      ],
    },
    faq: {
      title: "Instagram post generator FAQ",
      items: [
        {
          question: "Does it export the correct size for Instagram?",
          answer:
            "Yes. The tool uses common Instagram post dimensions.",
        },
        {
          question: "Can I use custom colors or fonts?",
          answer:
            "Yes. Use the available controls to style your post.",
        },
        {
          question: "Is my content uploaded anywhere?",
          answer:
            "No. Your content is processed locally in the browser.",
        },
      ],
    },
  },
  qrCodeUrl: {
    overview: {
      title: "QR code generator for URLs",
      paragraphs: [
        "Generate QR codes for links so users can scan and open pages instantly.",
        "Ideal for marketing materials, flyers, menus, and product packaging.",
      ],
    },
    howTo: {
      title: "How to generate a URL QR code",
      steps: [
        "Enter the website link you want to share.",
        "Customize size or styling if available.",
        "Download the QR code image.",
      ],
    },
    useCases: {
      title: "Common URL QR code use cases",
      bullets: [
        "Linking printed materials to landing pages.",
        "Sharing event pages or digital menus.",
        "Adding quick links to business cards.",
      ],
    },
    faq: {
      title: "URL QR code FAQ",
      items: [
        {
          question: "Will the QR code still work if I change the URL?",
          answer:
            "Static QR codes point to the exact URL provided, so update the QR code if the link changes.",
        },
        {
          question: "Can I scan it from a phone camera?",
          answer:
            "Yes. Most modern phones can scan QR codes directly from the camera app.",
        },
        {
          question: "Is the QR code downloadable?",
          answer:
            "Yes. You can download the QR code as an image for printing or sharing.",
        },
      ],
    },
  },
  qrCodeText: {
    overview: {
      title: "QR code generator for text",
      paragraphs: [
        "Create QR codes that contain plain text for quick sharing or offline notes.",
        "Useful for short instructions, Wi-Fi labels, or event details.",
      ],
    },
    howTo: {
      title: "How to generate a text QR code",
      steps: [
        "Enter the text you want to encode.",
        "Adjust size and styling options if needed.",
        "Download the QR code image.",
      ],
    },
    useCases: {
      title: "Common text QR code use cases",
      bullets: [
        "Sharing short instructions without a URL.",
        "Embedding contact details or codes.",
        "Labeling physical items with quick notes.",
      ],
    },
    faq: {
      title: "Text QR code FAQ",
      items: [
        {
          question: "How much text can a QR code hold?",
          answer:
            "QR codes support limited text length, so keep it concise for reliable scanning.",
        },
        {
          question: "Does it work without internet?",
          answer:
            "Yes. Text QR codes can be scanned offline because no URL is required.",
        },
        {
          question: "Can I style the QR code?",
          answer:
            "Yes, use available options to adjust size and appearance.",
        },
      ],
    },
  },
  qrCodePhone: {
    overview: {
      title: "QR code generator for phone numbers",
      paragraphs: [
        "Create QR codes that launch phone calls when scanned.",
        "Great for posters, storefronts, and event signage.",
      ],
    },
    howTo: {
      title: "How to generate a phone QR code",
      steps: [
        "Enter the phone number with country code.",
        "Generate and preview the QR code.",
        "Download the QR code for print or sharing.",
      ],
    },
    useCases: {
      title: "Common phone QR code use cases",
      bullets: [
        "Customer support contact cards.",
        "Restaurant or venue call-to-book signage.",
        "Quick dial links on printed materials.",
      ],
    },
    faq: {
      title: "Phone QR code FAQ",
      items: [
        {
          question: "Do I need a country code?",
          answer:
            "Including the country code improves compatibility across devices.",
        },
        {
          question: "Will it open the phone app directly?",
          answer:
            "Yes. Scanning the code opens the dialer with the number filled in.",
        },
        {
          question: "Can I reuse the same QR code?",
          answer:
            "Yes, as long as the phone number stays the same.",
        },
      ],
    },
  },
};
