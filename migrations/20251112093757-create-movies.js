'use strict';

export async function up(Sequelize, DataTypes) {
  await Sequelize.createTable('Movies', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
    },
    genre: {
      type: DataTypes.JSON,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    language: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    directorId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Directors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
  await Sequelize.dropTable('Movies');
}
