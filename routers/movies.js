import { Router } from "express";
import {
    getAllMovies,
    getMovieByID,
    insertMovie,
    updateMovie,
    deleteMovie,
    getActorsByMovie,
    addActorToMovie
} from "../controllers/movies.js"

const router = Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieByID);
router.post("/", insertMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
//Con Actores
router.get("/:movieId/actors", getActorsByMovie);
router.post("/:movieId/actors", addActorToMovie);

export default router;