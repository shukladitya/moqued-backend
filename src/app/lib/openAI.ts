import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.GPT_SECRET_KEY,
});

export const userOpenAI = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 400,
      temperature: 0.8,
      top_p: 0.9,
      frequency_penalty: 0.2,
      presence_penalty: 0.2,
    });

    return response.choices[0].message.content;
  } catch (error) {
    return error;
    // console.log(error);
    // throw new InternalServerErrorException('Something went wrong');
  }
};
