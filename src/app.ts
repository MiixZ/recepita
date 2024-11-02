import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";

dotenv.config(); // Para cargar las variables de entorno.

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} port.`);
});

export default app;
