import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Relationship } from "../interface/relationship.interface";

@Entity()
export class RelationshipEntity extends BaseEntity implements Relationship {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  friend_id: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}