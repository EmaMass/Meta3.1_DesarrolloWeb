export default (sequelize, DataTypes) => {
  const Movie = sequelize.define("Movie", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: DataTypes.INTEGER,
    genre: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    duration: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    language: DataTypes.STRING,
    country: DataTypes.STRING,

    //Definimos explícitamente la FK con el mismo tipo que Director.id
    directorId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "Directors",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  });

  return Movie;
};
