import { movies, movieActors } from "../modules/movies.js";
import { directors } from "../modules/directors.js";
import { actors } from "../modules/actors.js"

//Todas las peliculas con filtros
export const getAllMovies = (req, res) => {
    let filtro = movies;

    const { genre, minRating, minYear, maxYear } = req.query;

    if(genre) 
        filtro = filtro.filter(m => m.genre.includes(genre));
    if(minRating) 
        filtro = filtro.filter(m => m.rating >= parseFloat(minRating));
    if(minYear) 
        filtro = filtro.filter(m => m.releaseYear >= parseInt(minYear));
    if(maxYear) 
        filtro = filtro.filter(m => m.releaseYear <= parseInt(maxYear));

    res.json(filtro);
};

//Obtener pelicula por ID
export const getMovieByID = (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);
    if(!movie) 
        return res.status(404).json({error: "Pelicula no encontrada"});
    res.json(movie);
};

//Insertar nueva pelicula
export const insertMovie = (req, res) => {
    const { id, title, releaseYear, genre, duration, directorId, rating } = req.body;

    if(!id || !title || !directorId) 
        return res.status(400).json({ error: "Campos obligatorios falta informacion" });
    if(movies.find(m => m.id === id)) 
        return res.status(409).json({ error: "La pelicula ya existe" });

    const existeDirector = directors.find(d => d.id === directorId);
    if(!existeDirector)
        return res.status(422).json({ error: "directorId no existe" });

    const nuevaPelicula = { ...req.body };
    movies.push(nuevaPelicula);
    res.status(201).json(nuevaPelicula);
};

//Actualizar pelicula
export const updateMovie = (req, res) => {
    const index = movies.findIndex(m => m.id === req.params.id);
    if(index === -1)
        return res.status(404).json({ error: "Pelicula no encontrada" });

    movies[index] = { ...movies[index], ...req.body };
    res.json(movies[index]);
};

//Eliminar Pelicula
export const deleteMovie = (req, res) => {
    const index = movies.findIndex(m => m.id === req.params.id);
    if(index === -1)
        return res.status(404).json({ error: "Pelicula no encontrada" });

    movies.splice(index, 1);
    res.json({ message: "Pelicula eliminada existosamente "});
};

//Obtener actores de una pelicula
export const getActorsByMovie = (req, res) => {
    const { movieId } = req.params;
    const movie = movies.find(m => m.id === movieId);
    if(!movie)
        return res.status(404).json({ error: "Pelicula no encontrada" });

    const relaciones = movieActors.filter(ma => ma.movieId === movieId);
    const resultado = relaciones.map(r => {
        const actor = actors.find(a => a.id === r.actorId);
        return { ...actor, characterName: r.characterName };
    });

    res.json(resultado);
};

//Agregar actor a pelicula
export const addActorToMovie = (req, res) => {
    const { movieId } = req.params;
    const { actorId, characterName } = req.body;

    const movie = movies.find(m => m.id === movieId);
    if(!movie)
        return res.status(404).json({ error: "Pelicula no encontrada "});

    const actor = actors.find(a => a.id === actorId);
    if(!actor)
        return res.status(422).json({ error: "actorId no existe" });

    const checkVinculado = movieActors.find(ma => ma.movieId === movieId && ma.actorId === actorId);
    if(checkVinculado)
        return res.status(409).json({ error: "Actor ya vinculado a esta pelicula" });

    movieActors.push({ movieId, actorId, characterName });
    res.status(201).json({ message: "Actor agregado a pelicula de manera exitosa" });
};