import { actors } from "../modules/actors.js";
import { movies, movieActors } from "../modules/movies.js";

//Conseguir todos los actores
export const getAllActors = (req, res) => {
    const { nationality, minBirthYear } = req.query;
    let filtro = actors;

    if(nationality)
        filtro = filtro.filter(a => a.nationality === nationality);
    if(minBirthYear)
        filtro = filtro.filter(a => a.birthYear >= parseInt(minBirthYear));

    res.json(filtro);
};

//Conseguir pelicula(s) con x actor
export const getMoviesByActor = (req, res) => {
    const { id } = req.params;
    const actor = actors.find(a => a.id === id);
    if(!actor)
        return res.status(404).json({ error: "Actor no encontrado" });

    const relaciones = movieActors.filter(ma => ma.actorId === id);
    const resultado = relaciones.map(r => movies.find(m => m.id === r.movieId));

    res.json(resultado);
};

//Insertar nuevo actor
export const insertActor = (req, res) => {
    const { id, name, nationality, birthYear } = req.body;

    if(!id || !name)
        return res.status(400).json({ error: "Campos obligatorios faltantes" });
    if(actors.find(a => a.id === id))
        return res.status(409).json({ error: "El actor ya existe" });

    const nuevoActor = { ...req.body };
    actors.push(nuevoActor);
    res.status(201).json(nuevoActor);
};