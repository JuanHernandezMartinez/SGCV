import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column()
  rol: string;
}
