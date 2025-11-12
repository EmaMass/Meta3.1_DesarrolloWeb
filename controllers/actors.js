import { Op } from "sequelize";
import { Actor, Movie } from "../models/index.js";

//Conseguir todos los actores
export const getAllActors = async (req, res) => {
  try {
    const { nationality, minBirthYear } = req.query;
    const where = {};

    if (nationality) 
        where.nationality = nationality;
    if (minBirthYear) 
        where.birthYear = { [Op.gte]: parseInt(minBirthYear) };

    const actors = await Actor.findAll({ where });
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener actores", details: error.message });
  }
};

//Conseguir pelicula(s) con x actor
export const getMoviesByActor = async (req, res) => {
  try {
    const actor = await Actor.findByPk(req.params.id, {
      include: { model: Movie, through: { attributes: ["characterName"] } },
    });
    if (!actor) 
        return res.status(404).json({ error: "Actor no encontrado" });

    res.json(actor.Movies);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener películas", details: error.message });
  }
};

//Insertar nuevo actor
export const insertActor = async (req, res) => {
  try {
    const { id, name, nationality, birthYear, birthPlace, notableAwards } = req.body;
    if (!id || !name)
      return res.status(400).json({ error: "Campos obligatorios faltantes" });

    const exists = await Actor.findByPk(id);
    if (exists) 
        return res.status(409).json({ error: "El actor ya existe" });

    const newActor = await Actor.create({
      id,
      name,
      nationality,
      birthYear,
      birthPlace,
      notableAwards,
    });
    res.status(201).json(newActor);
  } catch (error) {
    res.status(500).json({ error: "Error al crear actor", details: error.message });
  }
};
