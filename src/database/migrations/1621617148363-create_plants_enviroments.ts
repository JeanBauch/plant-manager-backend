import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPlantsEnviroments1621617148363 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'plants_environments',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: "key",
          type: "varchar"
        },
        {
          name: "title",
          type: "varchar"
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plants_environments');
  }

}
