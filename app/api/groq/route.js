import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt, type } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    let systemMessage = "You are a helpful AI assistant for an online Chemistry Lab and LMS. You speak in Arabic.";
    
    if (type === 'question_bank') {
      systemMessage = "You are an expert Chemistry Teacher. Create a set of SAT-style chemistry questions based on the topic provided. Output the result as an array of JSON objects with 'question', 'options' (array), and 'correctAnswer'. Only output valid JSON. Use Arabic language.";
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt },
      ],
      model: 'llama3-8b-8192',
      temperature: 0.5,
    });

    return NextResponse.json({ result: completion.choices[0]?.message?.content || '' });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
