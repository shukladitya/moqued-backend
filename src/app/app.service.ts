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
      const gptResponse = await userOpenAI(gptPrompt);
      console.log(gptResponse, 'gptResponse');
      if (gptResponse.error) {
        throw new InternalServerErrorException(gptResponse.error.message);
      }
      Logger.log(
        `GPT response for ${userRouteHash}`,
        JSON.stringify(gptResponse, null, 2),
      );

      // !IMPORTANT: set this in cache first, it will be stored as Prompt: prefix in redis
      await this.cacheService.set(userRouteHash, gptResponse);

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
    // now store it in db

    // const promptDefinedForRoute = await this.promptRepository.findOneBy({
    //   promptId: hash,
    // });
    // if (promptDefinedForRoute) {
    //   const promptHash = generateHash(JSON.stringify(formBody), 10);
    //   this.cacheService.set('abc1', 'def');
    //   const data = await this.cacheService.get('abc');
    //   console.log(data);
    // } else {
    //   console.log('storing new prompt');
    //   const additionalData = {
    //     apiDescription: formBody.apiDescription,
    //     schema: formBody.schema,
    //     refresh: formBody.refresh,
    //     limitOffset: formBody.limitOffset,
    //   };
    //   const newPrompt = this.promptRepository.create({
    //     promptId: hash,
    //     userId: userId,
    //     route: formBody.apiRoute,
    //     apiName: formBody.apiName,
    //     method: formBody.apiMethod,
    //     type: 'JSON',
    //     additionalData: JSON.stringify(additionalData),
    //   });
    //   await this.promptRepository.save(newPrompt);
    // }
  }
}
