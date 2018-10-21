import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Server {
  @PrimaryGeneratedColumn() public _id: number;
  @Column('varchar') public id: string;
  @Column('varchar') public name: string;
  @Column('varchar') public ip: string;
  @Column('integer') public port: number;
  @Column('varchar') public hash: string;
  @Column('boolean') public active: boolean;
}