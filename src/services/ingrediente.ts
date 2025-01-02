import { Ingrediente, IngredienteDB } from "@models/ingrediente";
import logger from "@public/logger";
import database from "@db/database";
import { ingredientesDBToIngredientes } from "mapper/ingredientes";

export class ingredienteService {
  static async getIngredientes(): Promise<Ingrediente[]> {
    logger.info("Fetching all ingredients");

    const allIngredientes = (await database.query(
      "SELECT * FROM Ingrediente"
    )) as unknown as IngredienteDB[];

    const filteredIngredientes = this.filterIngredientesByNombre(
      ingredientesDBToIngredientes(allIngredientes)
    );

    logger.info(
      "Filtered ingredients by name, total: %d",
      filteredIngredientes.length
    );

    return filteredIngredientes;
  }

  static async getIngredienteById(id: string): Promise<Ingrediente | null> {
    logger.info("Fetching ingredient with id: %s", id);

    const result = (await database.query(
      "SELECT * FROM Ingrediente WHERE id = ?",
      [id]
    )) as unknown as IngredienteDB[];

    if (result.length === 0) {
      logger.warn("Ingredient with id %s not found", id);
      return null;
    }

    const ingredienteDB = result[0] as IngredienteDB;
    const ingrediente = ingredientesDBToIngredientes([ingredienteDB])[0];

    return ingrediente;
  }

  static async getIngredientesByNombre(nombre: string): Promise<Ingrediente[]> {
    logger.info("Fetching ingredients with name containing: %s", nombre);

    const result = (await database.query(
      "SELECT * FROM Ingrediente WHERE LOWER(nombre) LIKE ?",
      [`%${nombre.toLowerCase()}%`]
    )) as unknown as IngredienteDB[];

    if (result.length === 0) {
      logger.warn("No ingredients found with name containing: %s", nombre);
    }

    const ingredientesDB = result as IngredienteDB[];
    const ingredientes = ingredientesDBToIngredientes(ingredientesDB);

    return ingredientes;
  }

  static async getIngredientesByReceta(
    idReceta: number
  ): Promise<Ingrediente[]> {
    logger.info("Fetching ingredients from recipe with id: %s", idReceta);

    const result = (await database.query(
      "SELECT * FROM Ingrediente WHERE id IN (SELECT ingrediente_id FROM RecetaIngrediente WHERE receta_id = ?)",
      [idReceta]
    )) as unknown as IngredienteDB[];

    if (result.length === 0) {
      logger.warn("No ingredients found for recipe with id: %s", idReceta);
    }

    return ingredientesDBToIngredientes(result);
  }

  private static filterIngredientesByNombre(ingredientes: Ingrediente[]) {
    const filteredIngredientes = ingredientes.reduce((acc, ingrediente) => {
      if (
        !acc.some(
          (i) => i.nombre.toLowerCase() === ingrediente.nombre.toLowerCase()
        )
      ) {
        acc.push(ingrediente);
      }
      return acc;
    }, [] as Ingrediente[]);

    return filteredIngredientes;
  }
}
