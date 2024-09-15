import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "../interface/users.interface";


@Entity()
export class UserEntity extends BaseEntity implements User {
    @PrimaryColumn()
    user_id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    @Unique(["email"])
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ nullable: true })
    location: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}