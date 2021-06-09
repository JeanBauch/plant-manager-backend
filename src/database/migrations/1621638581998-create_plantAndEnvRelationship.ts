import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPlantAndEnvRelationship1621638581998 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'plantAndEnvRelationship',
      columns: [
        {
          name: 'plant_id',
          type: 'integer',
          isPrimary: true,
        },
        {
          name: 'env_id',
          type: 'integer',
          isPrimary: true
        },
      ],
      foreignKeys: [
        {
          name: 'plantsForeignkey',
          columnNames: ['plant_id'],
          referencedTableName: 'plants',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        {
          name: 'envForeignkey',
          columnNames: ['env_id'],
          referencedTableName: 'plants_environments',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
