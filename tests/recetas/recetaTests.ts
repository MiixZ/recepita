import TestAgent from "supertest/lib/agent";
import { response } from "../../src/utils/response";
import { generalTest } from "../general/generalTest";

export class recetaTest extends generalTest {
  static async recetaTest(api: TestAgent) {
    const responseApi = await this.getSucessfullApi(api, "/recetas");

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  }

  static async recetaTestFail(api: TestAgent) {
    const responseApi = await this.getNotFoundApi(api, "/NotRecetas");

    const response: response = responseApi.body;

    expect(response.error).not.toBeNull();
    expect(response.data).toBeNull();
  }

  static async recetaByIdTest(api: TestAgent) {
    const responseApi = await this.getSucessfullApi(api, "/recetas/1");

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  }

  static async recetaByIdTestFail(api: TestAgent) {
    const responseApi = await this.getNotFoundApi(api, "/recetas/0");

    const response: response = responseApi.body;

    expect(response.error).not.toBeNull();
    expect(response.data).toBeNull();
  }

  static async recetaByIngredienteTest(api: TestAgent) {
    const responseApi = await this.getSucessfullApi(
      api,
      "/recetas/ingrediente/cebolla"
    );

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  }

  static async recetaByIngredienteReturnsSomething(api: TestAgent) {
    const responseApi = await this.getSucessfullApi(
      api,
      "/recetas/ingrediente/cebolla"
    );

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  }

  static async recetaByIngredienteTestFail(api: TestAgent) {
    const responseApi = await this.getNotFoundApi(
      api,
      "/recetas/ingredientes/queso"
    );

    const response: response = responseApi.body;

    expect(response.error).not.toBeNull();
    expect(response.data).toBeNull();
  }

  static async recetaByIngredienteTestReturnsNothing(api: TestAgent) {
    const responseApi = await this.getSucessfullApi(
      api,
      "/recetas/ingrediente/queso"
    );

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).toHaveLength(0);
  }
}
