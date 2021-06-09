import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm'
import Plant_environment from './Plant_enviroments'

@Entity('plants')
export default class Plant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  about: string;

  @Column()
  water_tips: string;

  @Column()
  photo: string;

  @ManyToMany(() => Plant_environment, plant_environment => plant_environment.plants, {
    cascade: ['insert', 'update']
  })
  @JoinTable({
    name: "plantAndEnvRelationship",
    joinColumn: {name: "plant_id", referencedColumnName: "id"},
    inverseJoinColumn: {name: "env_id", referencedColumnName: "id"}
  })
  environments: Plant_environment[];

  @Column()
  frequency_times: number;

  @Column()
  frequency_repeat_every: string;
}