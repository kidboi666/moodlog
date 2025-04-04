import { GeminiService } from '@/core/services/ai.service';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

let gemini: GeminiService | undefined = undefined;

export const getGemini = () => {
  if (!gemini) {
    gemini = new GeminiService(apiKey);
  }
  return gemini;
};
