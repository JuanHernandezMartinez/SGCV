import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  rol: string;
}
