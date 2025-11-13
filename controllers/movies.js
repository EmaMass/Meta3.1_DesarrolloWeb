import { Op } from "sequelize";
import { Movie, Director, Actor } from "../models/index.js";

//Todas las peliculas con filtros
export const getAllMovies = async (req, res) => {
  try {
    const { genre, minRating, minYear, maxYear } = req.query;
    const where = {};

    if (minRating) 
        where.rating = { [Op.gte]: parseFloat(minRating) };
    if (minYear || maxYear) {
      where.releaseYear = {};
      if (minYear) 
        where.releaseYear[Op.gte] = parseInt(minYear);
      if (maxYear) 
        where.releaseYear[Op.lte] = parseInt(maxYear);
    }

    const movies = await Movie.findAll({
      where,
      include: [
        { model: Director, attributes: ["id", "name"] },
        { model: Actor, through: { attributes: [] }, attributes: ["id", "name"] },
      ],
    });

    //Si no pidieron genre, retornar todo
    if (!genre) 
        return res.json(movies);

    //Filtrar en JS: parsear genre (string JSON) y comprobar inclusión (En caso de MariaDB, parece que MySQL funciona bien)
    //(Y MariaDB maneja JSON de una manera muy diferente que se necesita realizar este filtro mas "extensivo")
    const genreLower = genre.toLowerCase();
    const filtered = movies.filter(m => {
      try {
        const g = typeof m.genre === "string" ? JSON.parse(m.genre) : m.genre;
        if (!g) 
            return false;
        //g puede ser array de strings
        return g.some(item => item.toString().toLowerCase() === genreLower);
      } catch (e) {
        //si el parse falla, intentar un match simple (contains)
        const raw = (m.genre || "").toString().toLowerCase();
        return raw.includes(genreLower);
      }
    });

    return res.json(filtered);
  } catch (error) {
    console.error("Error al obtener películas:", error);
    res.status(500).json({ error: "Error al obtener películas", details: error.message });
  }
};

//Obtener pelicula por ID
export const getMovieByID = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: [
        { model: Director, attributes: ["id", "name"] },
        { model: Actor, through: { attributes: ["characterName"] }, attributes: ["id", "name"] },
      ],
    });
    if (!movie) 
        return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener película", details: error.message });
  }
};

//Insertar nueva pelicula
export const insertMovie = async (req, res) => {
  try {
    const { id, title, releaseYear, genre, duration, directorId, rating } = req.body;
    if (!id || !title || !directorId)
      return res.status(400).json({ error: "Campos obligatorios faltantes" });

    const director = await Director.findByPk(directorId);
    if (!director) 
        return res.status(422).json({ error: "directorId no existe" });

    const existing = await Movie.findByPk(id);
    if (existing) 
        return res.status(409).json({ error: "La película ya existe" });

    const newMovie = await Movie.create({
      id,
      title,
      releaseYear,
      genre: typeof genre === "string" ? genre : JSON.stringify(genre),
      duration,
      directorId,
      rating,
    });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: "Error al crear película", details: error.message });
  }
};

//Actualizar pelicula
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) 
        return res.status(404).json({ error: "Película no encontrada" });

    await movie.update(req.body);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar película", details: error.message });
  }
};

//Eliminar Pelicula
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) 
        return res.status(404).json({ error: "Película no encontrada" });

    await movie.destroy();
    res.json({ message: "Película eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar película", details: error.message });
  }
};

//Obtener actores de una pelicula
export const getActorsByMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId, {
      include: { model: Actor, through: { attributes: ["characterName"] } },
    });
    if (!movie) 
        return res.status(404).json({ error: "Película no encontrada" });

    res.json(movie.Actors);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener actores", details: error.message });
  }
};

//Agregar actor a pelicula
export const addActorToMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { actorId, characterName } = req.body;

    const movie = await Movie.findByPk(movieId);
    const actor = await Actor.findByPk(actorId);

    if (!movie) 
        return res.status(404).json({ error: "Película no encontrada" });
    if (!actor) 
        return res.status(422).json({ error: "actorId no existe" });

    const existing = await movie.hasActor(actor);
    if (existing) 
        return res.status(409).json({ error: "Actor ya vinculado a esta película" });

    await movie.addActor(actor, { through: { characterName } });
    res.status(201).json({ message: "Actor agregado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar actor", details: error.message });
  }
};
