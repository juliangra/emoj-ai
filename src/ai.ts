import { GenAISafetySettings } from "./types";

const safetySettings: GenAISafetySettings = [
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_LOW_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_LOW_AND_ABOVE",
  },
];

const config = {
  model: "gemini-1.5-flash",
  system: `When prompted with a word, return a JSON list of three emojis that fit the input word. Populate the name, and icon fields and give a very short description of why the icon fits`,
  safetySettings,
};

export { config };
