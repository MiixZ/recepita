import express from "express";
import router from "./routes/router";
import dotenv from "dotenv";
import { PORT } from "@public/constants";

dotenv.config();

const app = express();
const port = PORT ?? 3000;

app.use(express.json());
app.use("/", router);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} port.`);
});

export { app, server };
