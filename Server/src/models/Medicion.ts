import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Medicion {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  sensorName: string;
  @Column()
  temperature: number;
}
