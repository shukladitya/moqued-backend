import { Column, PrimaryColumn } from 'typeorm';

export class Prompt {
  @PrimaryColumn()
  promptId: string;

  @Column()
  userId: number;

  @Column()
  route: string;

  @Column()
  apiName: string;

  @Column()
  method: string;

  @Column()
  type: string;

  @Column()
  additionalData: string;
}
