import { Op } from "sequelize";
import { Director, Movie } from "../models/index.js";

//Conseguir todos los directores
export const getAllDirectors = async (req, res) => {
  try {
    const { nationality, minBirthYear } = req.query;
    const where = {};

    if (nationality) 
        where.nationality = nationality;
    if (minBirthYear) 
        where.birthYear = { [Op.gte]: parseInt(minBirthYear) };

    const directors = await Director.findAll({ where });
    res.json(directors);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener directores", details: error.message });
  }
};

//Conseguir pelicula por director
export const getMoviesByDirector = async (req, res) => {
  try {
    const director = await Director.findByPk(req.params.id, {
      include: { model: Movie },
    });
    if (!director) 
        return res.status(404).json({ error: "Director no encontrado" });

    res.json(director.Movies);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener películas", details: error.message });
  }
};

//Insertar director nuevo
export const insertDirector = async (req, res) => {
  try {
    const { id, name, nationality, birthYear, birthPlace, notableAwards } = req.body;
    if (!id || !name)
      return res.status(400).json({ error: "Campos obligatorios faltantes" });

    const exists = await Director.findByPk(id);
    if (exists) 
        return res.status(409).json({ error: "El director ya existe" });

    const newDirector = await Director.create({
      id,
      name,
      nationality,
      birthYear,
      birthPlace,
      notableAwards,
    });
    res.status(201).json(newDirector);
  } catch (error) {
    res.status(500).json({ error: "Error al crear director", details: error.message });
  }
};
