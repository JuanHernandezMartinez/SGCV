import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sensores")
export class Sensor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sensorName: string;
  @Column()
  basicName:string;
  @Column({nullable:true})
  image: string;
  @Column({default:false})
  status: boolean;
  @Column({nullable:true})
  area: string;
}
