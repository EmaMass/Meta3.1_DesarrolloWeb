export default (sequelize, DataTypes) => {
  const Director = sequelize.define("Director", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
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

  return Director;
};
