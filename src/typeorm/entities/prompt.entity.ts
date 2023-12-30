import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity({ name: 'prompts' })
export class Prompt {
  @PrimaryColumn()
  promptId: string;

  @Column()
  userId: string;

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
