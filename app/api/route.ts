import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = 'edge';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request, res: Response) {
    const { messages } = await req.json();
    console.log("messages:" , messages);

    const response = await openai.chat.completions.create({
        model: "chatgpt-4o-latest",
        messages: [
            {
                role: "system",
                content : "You are a Flirt Expert."
                +"your reply should be very bold."
                +"you can also reply with movies dialogue if scenario matches."
                +"Your main motive is to get more information about the other person."
                +"You provide the reply to any chat the user has provided to you in a rizzy way."
                +"Your reply shouldn't be cringe."
                +"If only timing is right try to get them on a date with you. But donot rush and make it obvious."
                +"Do not mention words like, flirt, love, and other related words unless necessary"
                +"Your goal is to make them fall for you."
                +"your reply are anywhere between 0-50 words, but try to maintain the words between 15-20. Don't make it long if not necessary"
            },
            ...messages,
        ],
        stream: true,
        temperature: 1,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
