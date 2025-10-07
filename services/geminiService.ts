import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, AnalysisStatus } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      enum: ["safe", "suspicious", "phishing", "malicious"],
      description: "The classification of the content.",
    },
    confidence: {
      type: Type.NUMBER,
      description: "A score from 0.0 to 1.0 indicating the confidence in the classification.",
    },
    explanation: {
      type: Type.STRING,
      description: "A brief explanation for the reasoning behind the classification.",
    },
    suspiciousPhrases: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "An array of specific words or phrases identified as suspicious. Only for text analysis.",
      nullable: true,
    },
  },
  required: ["status", "confidence", "explanation"],
};


const generatePrompt = (type: 'email' | 'message' | 'url', content: string): string => {
  const baseInstruction = "You are an expert cybersecurity analyst specializing in phishing detection. Your task is to analyze the provided content and determine its threat level.";
  
  switch (type) {
    case 'email':
      return `${baseInstruction} Analyze the following email content and headers. Identify any social engineering tactics, malicious links, sender spoofing, or urgent language. Classify it as 'safe', 'suspicious', or 'phishing'. Provide a confidence score, a brief explanation, and list any specific suspicious phrases found.\n\n---\nEMAIL CONTENT:\n${content}`;
    case 'message':
      return `${baseInstruction} Analyze the following SMS or chat message. Look for smishing tactics, suspicious links, unusual requests, or pressure tactics. Classify it as 'safe', 'suspicious', or 'phishing'. Provide a confidence score, a brief explanation, and list any specific suspicious phrases found.\n\n---\nMESSAGE CONTENT:\n${content}`;
    case 'url':
      return `${baseInstruction} Analyze the following URL. Examine its structure, domain, subdomains, path, and query parameters. Check for signs of typosquatting, character encoding, or attempts to impersonate legitimate websites. Classify it as 'safe', 'suspicious', or 'malicious'. Provide a confidence score and a brief explanation.\n\n---\nURL:\n${content}`;
  }
}

export const analyzeContent = async (content: string, type: 'email' | 'message' | 'url'): Promise<AnalysisResult> => {
  try {
    const prompt = generatePrompt(type, content);
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text;
    const result = JSON.parse(jsonText);
    
    // Ensure status is a valid enum value
    const statusValues = Object.values(AnalysisStatus) as string[];
    if (!statusValues.includes(result.status)) {
        console.error("Invalid status from API:", result.status);
        throw new Error("Received invalid analysis status from AI.");
    }

    return result as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing content with Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check your API key and try again.");
  }
};
