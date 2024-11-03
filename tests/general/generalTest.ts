import TestAgent from "supertest/lib/agent";

export class generalTest {
  static async generalTest(api: TestAgent) {
    await api
      .get("/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }
}
