import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPlants1621543167152 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'plants',
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
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'about',
          type: 'text'
        },
        {
          name: 'water_tips',
          type: 'varchar'
        },
        {
          name: 'photo',
          type: 'varchar'
        },
        {
          name: 'frequency_times',
          type: 'integer'
        },
        {
          name: 'frequency_repeat_every',
          type: 'varchar'
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plants');
  }

}
