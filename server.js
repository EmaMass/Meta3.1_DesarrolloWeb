import express from "express";
import { sequelize } from "./models/index.js";
import moviesRouter from "./routers/movies.js";
import actorsRouter from "./routers/actors.js";
import directorsRouter from "./routers/directors.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/movies", moviesRouter);
app.use("/api/actors", actorsRouter);
app.use("/api/directors", directorsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a CineBase API!" });
});

const iniciarServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado exitosamente a la base de datos.");

    await sequelize.sync({ alter: false });

    app.listen(PORT, () => {
      console.log(`CineBase API ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
};

iniciarServer();
