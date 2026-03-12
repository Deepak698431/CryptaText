import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
    try {
    // const body = await req.json();'
    const {content} = await req.json();

    if (!content) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "user", content: content },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error: any) {
    console.error("OpenRouter Error:", error);

    return Response.json(
      {
        error: "Something went wrong",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
