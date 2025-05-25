import { Entity, Column } from '../orm/decorators';

@Entity('patients')
export class Patient {
  @Column({ primary: true, type: 'text' })
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'integer', nullable: true })
  age?: number;
}
