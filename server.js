import express from "express";
import moviesRouter from "./routers/movies.js";
import actorsRouter from "./routers/actors.js";
import directorsRouter from "./routers/directors.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/movies", moviesRouter);
app.use("/api/actors", actorsRouter);
app.use("/api/directors", directorsRouter);

app.get("/", (req, res) => {
    res.json({message: "Bienvenido a CineBase API!"});
});

app.listen(PORT, () => {
    console.log(`CineBase API en http://localhost:${PORT}`);
});