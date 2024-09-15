import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "../interface/users.interface";


@Entity()
export class UserEntity extends BaseEntity implements User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Unique(["user_id"])
    user_id: string;

    @Column()
    name: string;

    @Column()
    @Unique(["email"])
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ nullable: true })
    role: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    dealership_id: string;

    @Column({ nullable: true })
    sales_pitch: string;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}