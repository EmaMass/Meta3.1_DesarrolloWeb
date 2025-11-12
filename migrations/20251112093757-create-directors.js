'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Directors', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nationality: {
      type: Sequelize.STRING,
    },
    birthYear: {
      type: Sequelize.INTEGER,
    },
    birthPlace: {
      type: Sequelize.STRING,
    },
    notableAwards: {
      type: Sequelize.JSON,
      allowNull:true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Directors');
}
