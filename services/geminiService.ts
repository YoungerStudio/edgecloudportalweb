import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please check your environment configuration.";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        thinkingConfig: {
            thinkingBudget: 32768, // Max budget for deep reasoning
        },
        systemInstruction: `You are an expert cloud architect and sales engineer for CloudEdge, a leading edge computing provider.
        Your products include:
        1. ENS (Edge Node Service): Distributed edge computing nodes.
        2. ESA (Edge Security Acceleration): Security and CDN combined.
        3. CDN (Content Delivery Network): Fast static content delivery.
        4. ENA (Edge Network Acceleration): Network optimization.

        You are helpful, concise, and professional. You can help calculate prices, suggest architectures, and debug issues.`,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};