import { MigrationInterface, QueryRunner } from 'typeorm'

export class Default1687298294659 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "users"("id" SERIAL PRIMARY KEY, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "accessToken" character varying(255) DEFAULT NULL, "isDeleted" Boolean DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now())'
        )

        await queryRunner.query(
            'CREATE TABLE "portfolio"("id" SERIAL PRIMARY KEY , "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" INTEGER REFERENCES users (id))'
        )

        await queryRunner.query(
            'CREATE TABLE "images"("id" SERIAL PRIMARY KEY, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "url" character varying(255) NOT NULL, "cloudinary_id" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "portfolio_id" INTEGER REFERENCES portfolio (id) ON DELETE CASCADE)'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`)
        await queryRunner.query(`DROP TABLE "portfolio"`)
        await queryRunner.query(`DROP TABLE "images"`)
    }
}
