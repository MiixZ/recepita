import TestAgent from "supertest/lib/agent";
import { execSync } from "child_process";

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
    return await api
      .get("/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }

  static async checkContainers() {
    const result = execSync(
      "docker ps --filter status=running --format '{{.Names}}'",
      { encoding: "utf-8" }
    );
    expect(result).toContain("db");
    expect(result).toContain("backend");
    expect(result).toContain("logserver");
    expect(result).toContain("grafana");

    return result;
  }
}
