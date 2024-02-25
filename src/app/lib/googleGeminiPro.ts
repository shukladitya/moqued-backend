import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_PRO_SECRET_KEY);

export async function useGiminiPro(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    return error;
    // console.log(error);
    // throw new InternalServerErrorException('Something went wrong');
  }
}
