import { GoogleGenAI } from '@google/genai';
import { AI_SYSTEM_CONTEXT } from '@/core/constants/prompt';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const gemini = new GoogleGenAI({ apiKey });

const initGemini = async () => {
  const response = await gemini.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: 'hello',
    config: {
      systemInstruction: AI_SYSTEM_CONTEXT,
    },
  });
  console.log(response);
};

await initGemini();
