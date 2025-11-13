'use strict';

export async function up(Sequelize, DataTypes) {
  await Sequelize.createTable('Actors', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    birthYear: {
      type: DataTypes.INTEGER,
    },
    birthPlace: {
      type: DataTypes.STRING,
    },
    notableAwards: {
      type: DataTypes.JSON,
      allowNull:true,
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
  await Sequelize.dropTable('Actors');
}
