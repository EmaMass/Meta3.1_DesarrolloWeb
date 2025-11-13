'use strict';

export async function up(Sequelize, DataTypes) {
  await Sequelize.createTable('MovieActors', {
    movieId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Movies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    actorId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Actors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    characterName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
  });
}

export async function down(Sequelize) {
  await Sequelize.dropTable('MovieActors');
}
