import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Medicion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sensorName: string;
  @Column("decimal", { precision: 10, scale: 2 })
  temperature: number;
}
