import supertest from "supertest";
import { app, server } from "../src/app";
import { generalTest } from "./general/generalTest";
import { recetaTest } from "./recetas/recetaTests";

const api = supertest(app);

// GENERAL
test("Devuelve un JSON", async () => await generalTest.generalTest(api));

// RECETAS
test("Tests de recetas", async () => recetaTest.recetaTest(api));

test("Tests de recetas fallidos", async () => recetaTest.recetaTestFail(api));

afterAll(() => {
  // TODO: Cerrar base de datos.
  server.close();
});
