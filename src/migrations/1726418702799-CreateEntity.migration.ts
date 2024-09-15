import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntity1726418702799 implements MigrationInterface {
    name = 'CreateEntity1726418702799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("user_id" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying, "location" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_02777d5180610e45ddbb9bd5429" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "relationship_entity" ("user_id" character varying NOT NULL, "friend_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dd20abf1712c9a07fe70a635c5f" PRIMARY KEY ("user_id", "friend_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "relationship_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
