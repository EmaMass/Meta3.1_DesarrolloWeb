import sequelize from "../config/database.cjs";
import { DataTypes } from "sequelize";
import ActorModel from "./actor.js";
import DirectorModel from "./director.js";
import MovieModel from "./movie.js";

const Actor = ActorModel(sequelize, DataTypes);
const Director = DirectorModel(sequelize, DataTypes);
const Movie = MovieModel(sequelize, DataTypes);

// Relaciones
Director.hasMany(Movie, { foreignKey: "directorId" });
Movie.belongsTo(Director, { foreignKey: "directorId" });

Movie.belongsToMany(Actor, { through: "MovieActors", foreignKey: "movieId" });
Actor.belongsToMany(Movie, { through: "MovieActors", foreignKey: "actorId" });

export { sequelize, Actor, Director, Movie };
