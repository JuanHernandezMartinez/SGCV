import { Column, Entity } from "typeorm";

@Entity()
export class Usuario {
  @Column()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  rol: string;
}
