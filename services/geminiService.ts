
import { GoogleGenAI, Type } from "@google/genai";
import { PuzzleData } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const puzzleSchema = {
    type: Type.OBJECT,
    properties: {
        riddle: {
            type: Type.STRING,
            description: "A clever and fun riddle related to nature, insects, or plants. The riddle should be challenging but solvable.",
        },
        answer: {
            type: Type.STRING,
            description: "A single word answer to the riddle. The word should not be too obscure.",
        },
    },
    required: ["riddle", "answer"],
};

export async function generatePuzzle(level: number): Promise<PuzzleData> {
    const prompt = `Generate a unique and increasingly difficult riddle for a game. This is for level ${level}. The theme is nature, plants, and insects. The answer must be a single word.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: puzzleSchema,
            },
        });

        const jsonText = response.text;
        const parsed = JSON.parse(jsonText);
        
        if (parsed.riddle && parsed.answer) {
             return parsed as PuzzleData;
        } else {
            throw new Error("Invalid puzzle format received from API.");
        }
       
    } catch (error) {
        console.error("Error generating puzzle with Gemini:", error);
        // Fallback puzzle in case of API failure
        return {
            riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
            answer: "Map"
        };
    }
}
