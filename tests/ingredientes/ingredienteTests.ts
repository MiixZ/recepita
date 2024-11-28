import TestAgent from "supertest/lib/agent";
import { response } from "../../src/utils/response";
import { generalTest } from "../general/generalTest";

export class ingredienteTest extends generalTest {
  static async ingredienteTest(api: TestAgent) {
    const responseApi = await this.getSucessfullApi(api, "/ingredientes");

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  }

  static async ingredienteTestFail(api: TestAgent) {
    const responseApi = await this.getNotFoundApi(api, "/NotIngredientes");

    const response: response = responseApi.body;

    expect(response.error).not.toBeNull();
    expect(response.data).toBeNull();
  }

  static async ingredienteByIdTest(api: TestAgent) {
    const responseApi = await this.getSucessfullApi(api, "/ingredientes/1");

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  }

  static async ingredienteByIdTestFail(api: TestAgent) {
    const responseApi = await this.getNotFoundApi(api, "/ingredientes/0");

    const response: response = responseApi.body;

    expect(response.error).not.toBeNull();
    expect(response.data).toBeNull();
  }

  static async ingredienteByNombreTest(api: TestAgent) {
    const responseApi = await this.getSucessfullApi(
      api,
      "/ingredientes/nombre/cebolla"
    );

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  }

  static async ingredienteByNombreTestFail(api: TestAgent) {
    const responseApi = await this.getSucessfullApi(
      api,
      "/ingredientes/nombre/noIngrediente"
    );

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).toHaveLength(0);
  }
}
