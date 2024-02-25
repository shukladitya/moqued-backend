import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JsonDto } from './dtos/app.dto';
import { generateJsonGetPrompt } from './prompts/jsonPrompt';
import { InjectRepository } from '@nestjs/typeorm';
import { Prompt } from 'src/typeorm/entities/prompt.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { userOpenAI } from './lib/openAI';
import { useGiminiPro } from './lib/googleGeminiPro';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptRepository: Repository<Prompt>,

    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async generateJsonResponse(
    formBody: JsonDto,
    userRouteHash: string,
    userId: string,
  ): Promise<any> {
    try {
      const gptPrompt = generateJsonGetPrompt(formBody);

      // const gptResponse = await userOpenAI(gptPrompt);
      const gptResponse = await useGiminiPro(gptPrompt);

      console.log(gptResponse, 'gptResponse');
      if (gptResponse.error) {
        throw new InternalServerErrorException(gptResponse.error.message);
      }
      Logger.log(
        `GPT response for ${userRouteHash}`,
        JSON.stringify(gptResponse, null, 2),
      );

      // !IMPORTANT: set this in cache first, it will be stored as Prompt: prefix in redis
      await this.cacheService.set(`prompt:${userRouteHash}`, gptResponse);

      //now store it in db or update it if it already exists

      const additionalData = {
        apiDescription: formBody.apiDescription,
        schema: formBody.schema,
        refresh: formBody.refresh,
        limitOffset: formBody.limitOffset,
      };
      const newPrompt = this.promptRepository.create({
        promptId: userRouteHash,
        userId: userId,
        route: formBody.apiRoute,
        apiName: formBody.apiName,
        method: formBody.apiMethod,
        type: 'JSON',
        additionalData: JSON.stringify(additionalData),
      });
      const savedPrompt = await this.promptRepository.save(newPrompt);
      if (savedPrompt) {
        return {
          status: 200,
          url: process.env.BASE_URL,
          route: formBody.apiRoute,
        };
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async consumeRoute(userRouteHash: string) {
    // get from cache
    const response = await this.cacheService.get(`prompt:${userRouteHash}`);

    Logger.log(response, 'HIT: response from cache');
    // if response return it
    if (response) return JSON.parse(response as string);

    // if no response, first check in db if it exists, call generate according to type else throw error that path is not valid

    const prompt = await this.promptRepository.findOne({
      where: { promptId: userRouteHash },
    });
    if (prompt) {
      if (prompt.type === 'JSON') {
        const formBody = {
          userId: prompt.userId,
          apiRoute: prompt.route,
          apiName: prompt.apiName,
          method: prompt.method,
          type: 'JSON',
          ...JSON.parse(prompt.additionalData),
        };
        await this.generateJsonResponse(formBody, userRouteHash, prompt.userId);
        return this.consumeRoute(userRouteHash);
      }
    } else {
      return {
        status: 404,
        message: 'Path not found',
      };
    }
  }
}
