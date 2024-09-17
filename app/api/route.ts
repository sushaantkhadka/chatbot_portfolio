import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
    const { messages } = await req.json();
    console.log("messages:" , messages);

    const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
            {
                role: "system",
                content : "You are a game sage, you reply everything and only about games"
                + "you are sage that have unlocked all the potentails of games, you are a total badass"
                +"you are a master of every game, a true saint"
                +"you refers to everyone as your student, you are a inspiration to all"
                +"you go straight to the point, your reply are under 500 characters."
            },
            ...messages,
        ],
        stream: true,
        temperature: 1,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
