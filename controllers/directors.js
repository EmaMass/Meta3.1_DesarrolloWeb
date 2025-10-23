import { directors } from "../modules/directors.js";
import { movies } from "../modules/movies.js";

//Conseguir todos los directores
export const getAllDirectors = (req, res) => {
    const { nationality, minBirthYear } = req.query;
    let filtro = directors;

    if(nationality) 
        filtro = filtro.filter(d => d.nationality === nationality);
    if(minBirthYear)
        filtro = filtro.filter(d => d.birthYear >= parseInt(minBirthYear));

    res.json(filtro);
};

//Conseguir pelicula por director
export const getMoviesByDirector = (req, res) => {
    const { id } = req.params;
    const director = directors.find(d => d.id === id);
    if(!director)
        return res.status(404).json({ error: "Director no encontrado" });

    const resultado = movies.filter(m => m.directorId === id);
    res.json(resultado);
};

//Insertar director nuevo
export const insertDirector = (req, res) => {
    const { id, name, nationality, birthYear } = req.body;

    if(!id || !name)
        return res.status(400).json({ error: "Campos obligatorios faltantes" });
    if(directors.find(d => d.id === id))
        return res.status(409).json({ error: "Director ya existe" });

    const nuevoDirector = { ...req.body };
    directors.push(nuevoDirector);
    res.status(201).json(nuevoDirector);
};