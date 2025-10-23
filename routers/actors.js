import { Router } from "express";
import { 
    getAllActors,
    getMoviesByActor,
    insertActor
} from "../controllers/actors.js";

const router = Router();

router.get("/", getAllActors);
router.get("/:id/movies", getMoviesByActor);
router.post("/", insertActor);

export default router; 