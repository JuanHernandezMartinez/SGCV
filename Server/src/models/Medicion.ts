import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mediciones")
export class Medicion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  basicName: string;
  @Column("decimal", { precision: 10, scale: 2 })
  temperature: number;
  @CreateDateColumn({ type: "timestamp" })
  fecha: Date;
}
