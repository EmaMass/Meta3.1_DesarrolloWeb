'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Movies', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: Sequelize.INTEGER,
    },
    genre: {
      type: Sequelize.JSON,
    },
    duration: {
      type: Sequelize.INTEGER,
    },
    rating: {
      type: Sequelize.FLOAT,
    },
    language: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    directorId: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'Directors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
  await queryInterface.dropTable('Movies');
}
