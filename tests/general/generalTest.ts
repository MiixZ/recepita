import TestAgent from "supertest/lib/agent";

export class generalTest {
  // @ts-ignore
  protected static async getSucessfullApi(api: TestAgent, route: string) {
    return await api
      .get(route)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }

  // @ts-ignore
  protected static async getNotFoundApi(api: TestAgent, route: string) {
    return await api
      .get(route)
      .expect(404)
      .expect("Content-Type", /application\/json/);
  }

  static async generalTest(api: TestAgent) {
    await api
      .get("/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }
}
