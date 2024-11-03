import TestAgent from "supertest/lib/agent";
import { response } from "../../src/utils/response";

export class recetaTest {
  static async recetaTest(api: TestAgent) {
    const responseApi = await api
      .get("/recetas")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response: response = responseApi.body;

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  }

  static async recetaTestFail(api: TestAgent) {
    const responseApi = await api
      .get("/recet")
      .expect(404)
      .expect("Content-Type", /application\/json/);

    const response: response = responseApi.body;

    expect(response.error).not.toBeNull();
    expect(response.data).toBeNull();
  }
}
