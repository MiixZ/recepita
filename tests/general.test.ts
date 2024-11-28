import supertest from "supertest";
import { app, server } from "../src/app";
import { generalTest } from "./general/generalTest";
import { recetaTest } from "./recetas/recetaTests";
import { ingredienteTest } from "./ingredientes/ingredienteTests";

const api = supertest(app);

// GENERAL
test("Devuelve un JSON", async () => await generalTest.generalTest(api));

// RECETAS
test("Tests de recetas", async () => recetaTest.recetaTest(api));

test("Tests de recetas fallidos", async () => recetaTest.recetaTestFail(api));

test("Tests de recetas por ID", async () => recetaTest.recetaByIdTest(api));

test("Tests de recetas por ID fallidos", async () =>
  recetaTest.recetaByIdTestFail(api));

test("Tests de recetas por ingrediente", async () =>
  recetaTest.recetaByIngredienteTest(api));

test("Tests de recetas por ingrediente fallidos", async () =>
  recetaTest.recetaByIngredienteTestFail(api));

test("Tests de recetas por ingrediente que devuelven algo", async () =>
  recetaTest.recetaByIngredienteReturnsSomething(api));

test("Tests de recetas por ingrediente que devuelven algo fallidos", async () =>
  recetaTest.recetaByIngredienteTestReturnsNothing(api));

// INGREDIENTES

test("Tests de ingredientes", async () => ingredienteTest.ingredienteTest(api));

test("Tests de ingredientes fallidos", async () =>
  ingredienteTest.ingredienteTestFail(api));

test("Tests de ingredientes por ID", async () =>
  ingredienteTest.ingredienteByIdTest(api));

test("Tests de ingredientes por ID fallidos", async () =>
  ingredienteTest.ingredienteByIdTestFail(api));

test("Tests de ingredientes por nombre", async () =>
  ingredienteTest.ingredienteByNombreTest(api));

test("Tests de ingredientes por nombre fallidos", async () =>
  ingredienteTest.ingredienteByNombreTestFail(api));

afterAll(() => {
  // TODO: Cerrar base de datos.
  server.close();
});
