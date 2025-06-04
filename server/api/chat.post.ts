import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: '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'
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { message } = body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are Noa, an empathetic AI wellness companion focused on mental and emotional health support. You provide thoughtful, trauma-informed responses while maintaining appropriate boundaries. You do not provide medical advice but can suggest general wellness practices and coping strategies."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
      stream: false
    });

    return {
      response: completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.",
      error: null
    };
  } catch (error) {
    console.error('Chat API Error:', error);
    return {
      response: null,
      error: "Sorry, I'm having trouble connecting right now. Please try again in a moment."
    };
  }
});