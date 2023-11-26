import OpenAI from 'openai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JsonDto } from './dtos/app.dto';
import { generateJsonGetPrompt } from './prompts/jsonPrompt';
import { InjectRepository } from '@nestjs/typeorm';
import { Prompt } from 'src/typeorm/entities/prompt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptRepository: Repository<Prompt>,
  ) {}

  async generateJson(formBody: JsonDto, hash: string): Promise<any> {
    console.log(formBody);
    console.log(hash);
  }
}
