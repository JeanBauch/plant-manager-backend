import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm'
import Plant from './Plant';

@Entity('plants_environments')
export default class Plants_environments {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  key: string;

  @Column()
  title: string;

  @ManyToMany(() => Plant, plant => plant.environments)
  @JoinTable({
    name: "plantAndEnvRelationship",
    joinColumn: {name: "env_id", referencedColumnName: "id"},
    inverseJoinColumn: {name: "plant_id", referencedColumnName: "id"}
  })
  plants: Plant[];
}