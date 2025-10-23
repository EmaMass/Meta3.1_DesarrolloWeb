import { Router } from "express";
import {
    getAllDirectors,
    getMoviesByDirector,
    insertDirector
} from "../controllers/directors.js";

const router = Router();

router.get("/", getAllDirectors);
router.get("/:id/movies", getMoviesByDirector);
router.post("/", insertDirector);

export default router; 