
import { GoogleGenAI, Type } from "@google/genai";

export interface ParsedMetric {
  name: string;
  spend: number;
  clicks: number;
  conversions: number;
  platform: 'Facebook' | 'Google' | 'TikTok' | 'Instagram';
  date: string;
}

/**
 * Motor de Inteligência Carniçal.
 * Otimizado para decifrar gírias de gestores de tráfego (ex: "bati 1k no face", "torrei 500 nas campanhas").
 */
export const parseWhatsAppMessage = async (message: string): Promise<ParsedMetric | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `CONTEXTO: Sistema de tráfego pago "Banda Carniçal".
      TAREFA: Extrair métricas de anúncio desta mensagem de WhatsApp.
      MENSAGEM: "${message}"
      
      REGRAS:
      - Spend: Valor numérico gasto.
      - Platform: Identificar entre Facebook, Google, TikTok, Instagram (Padrão: Facebook).
      - Clicks/Conversions: Se não citados, retorne 0.
      - Retorne APENAS o JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            spend: { type: Type.NUMBER },
            clicks: { type: Type.NUMBER },
            conversions: { type: Type.NUMBER },
            platform: { type: Type.STRING, enum: ['Facebook', 'Google', 'TikTok', 'Instagram'] },
            date: { type: Type.STRING }
          },
          required: ["spend", "platform"]
        },
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      ...result,
      date: result.date || new Date().toISOString().split('T')[0],
      name: `WA_${result.platform.toUpperCase()}_AUTO`
    };
  } catch (error) {
    console.error("Erro no Motor de IA:", error);
    return null;
  }
};
