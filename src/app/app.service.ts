import OpenAI from 'openai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JsonDto } from './dtos/app.dto';
import { generateJsonGetPrompt } from './prompts/jsonPrompt';

@Injectable()
export class AppService {
  async generateJson(body: JsonDto): Promise<any> {
    const openai = new OpenAI({
      apiKey: process.env.GPT_SECRET_KEY,
    });

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: generateJsonGetPrompt(body),
          },
        ],
        max_tokens: 400,
        temperature: 0.8,
        top_p: 0.9,
        frequency_penalty: 0.2,
        presence_penalty: 0.2,
      });

      console.log(JSON.stringify(response, null, 2));

      return response.choices[0].message.content;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
