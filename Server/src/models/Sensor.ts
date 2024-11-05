import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sensor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  sensorName: string;
  @Column()
  image: string;
  @Column()
  status: boolean;
  @Column()
  area: string;
}
