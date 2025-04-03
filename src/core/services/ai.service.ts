import {
  AI_DAILY_PROMPT,
  AI_SYSTEM_CONTEXT,
  generateComfortPrompt,
} from '@/core/constants/prompt';
import { GoogleGenAI } from '@google/genai';

export class GeminiService {
  private gemini: GoogleGenAI;
  private model: string = 'gemini-2.0-flash';

  constructor(apiKey: string = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '') {
    this.gemini = new GoogleGenAI({ apiKey });
  }

  public async initialize() {
    try {
      const response = await this.gemini.models.generateContent({
        model: this.model,
        contents: 'hello',
        config: {
          systemInstruction: AI_SYSTEM_CONTEXT,
        },
      });
      console.log(response);
    } catch (err) {
      console.error();
    }
  }

  public async getComfortPrompt(content: string) {
    const prompt = generateComfortPrompt(content);

    return await this.gemini.models.generateContent({
      model: this.model,
      contents: prompt,
    });
  }

  public async getDailyPrompt() {
    return await this.gemini.models.generateContent({
      model: this.model,
      contents: AI_DAILY_PROMPT,
    });
  }
}
