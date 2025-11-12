'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('MovieActors', {
    movieId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Movies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    actorId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Actors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    characterName: {
      type: Sequelize.STRING,
      allowNull: true,
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
  await queryInterface.dropTable('MovieActors');
}
