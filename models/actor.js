export default (sequelize, DataTypes) => {
  const Actor = sequelize.define("Actor", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: DataTypes.STRING,
    birthYear: DataTypes.INTEGER,
    birthPlace: DataTypes.STRING,
    notableAwards: {
      type: DataTypes.JSON, 
      allowNull: true,
    },
  });

  return Actor;
};
