import supertest from "supertest";
import { app } from "../src/app";
import { generalTest } from "./general/generalTest";
import { recetaTest } from "./recetas/recetaTests";
import { ingredienteTest } from "./ingredientes/ingredienteTests";
import { execSync } from "child_process";

const api = supertest(app);
const server = app.listen();

beforeAll(() => {
  execSync("docker-compose up --build -d", { stdio: "inherit" });
});

// GENERAL
test("Devuelve un JSON", async () => await generalTest.generalTest(api));

test("Comprueba si los contenedores están levantados", async () => {
  await generalTest.checkContainers();
});

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

afterAll(() => {
  // execSync("docker-compose down", { stdio: "inherit" });
  server.close();
});
