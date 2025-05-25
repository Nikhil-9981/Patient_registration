// src/entities/Patient.ts
import 'reflect-metadata';
import { Entity, Column } from '../orm/decorators';

@Entity('patients')      // ← ensure table is named "patients"
export class Patient {
  @Column({ primary: true })
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  age?: number;
}
