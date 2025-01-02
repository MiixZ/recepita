import supertest from "supertest";
import { generalTest } from "./general/generalTest";
import express from "express";
import router from "../src/routes/router";
import { recetaTest } from "./recetas/recetaTests";
import { ingredienteTest } from "./ingredientes/ingredienteTests";
import { execSync } from "child_process";

const app = express();

app.use(express.json());
app.use("/", router);

const api = supertest.agent(app);

// GENERAL
test("Devuelve un JSON", async () => await generalTest.generalTest(api));

/*
test("Comprueba si los contenedores están levantados", async () => {
  await generalTest.checkContainers();
});
*/

// RECETAS
test("Tests de recetas", async () => await recetaTest.recetaTest(api));

test("Tests de recetas fallidos", async () =>
  await recetaTest.recetaTestFail(api));

test("Tests de recetas por ID", async () =>
  await recetaTest.recetaByIdTest(api));

test("Tests de recetas por ID fallidos", async () =>
  await recetaTest.recetaByIdTestFail(api));

test("Tests de recetas por ingrediente", async () =>
  await recetaTest.recetaByIngredienteTest(api));

test("Tests de recetas por ingrediente fallidos", async () =>
  await recetaTest.recetaByIngredienteTestFail(api));

test("Tests de recetas por ingrediente que devuelven algo", async () =>
  await recetaTest.recetaByIngredienteReturnsSomething(api));

test("Tests de recetas por ingrediente que devuelven algo fallidos", async () =>
  await recetaTest.recetaByIngredienteTestReturnsNothing(api));

// INGREDIENTES

test("Tests de ingredientes", async () =>
  await ingredienteTest.ingredienteTest(api));

test("Tests de ingredientes fallidos", async () =>
  await ingredienteTest.ingredienteTestFail(api));

test("Tests de ingredientes por ID", async () =>
  await ingredienteTest.ingredienteByIdTest(api));

test("Tests de ingredientes por ID fallidos", async () =>
  await ingredienteTest.ingredienteByIdTestFail(api));

test("Tests de ingredientes por nombre", async () =>
  await ingredienteTest.ingredienteByNombreTest(api));

test("Tests de ingredientes por nombre fallidos", async () =>
  await ingredienteTest.ingredienteByNombreTestFail(api));
