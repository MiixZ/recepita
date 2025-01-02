import { Receta, RecetaDB } from "@models/receta";
import logger from "@public/logger";
import database from "@db/database";
import { recetaDBToReceta, recetasDBToRecetas } from "@mapper/receta";
import recetas from "@db/recetas.json";
import { ingredienteService } from "./ingrediente";

export class recetaService {
  static async getRecetas(): Promise<Receta[]> {
    logger.info("Fetching all recipes");

    try {
      const allRecetas = (await database.query(
        "SELECT * FROM Receta"
      )) as unknown as RecetaDB[];

      const filteredRecetas = await recetasDBToRecetas(allRecetas);

      logger.info(
        "Filtered recipes by name, total: %d",
        filteredRecetas.length
      );

      return filteredRecetas;
    } catch (error) {
      logger.error(
        "Error fetching recipes from database: %s",
        (error as any).message
      );
      logger.info("Fetching recipes from local JSON");

      const filteredRecetas = recetas;

      return filteredRecetas;
    }
  }

  static async getReceta(id: string): Promise<Receta | undefined> {
    logger.info("Fetching recipe with id: %s", id);

    try {
      const recetaDB = (await database.query(
        "SELECT * FROM Receta WHERE id = ?",
        [id]
      )) as unknown as RecetaDB[];

      if (recetaDB.length === 0) {
        logger.warn("Recipe with id %s not found", id);
        return undefined;
      }

      const singularRecetaDB = recetaDB[0];
      const ingredientes = await ingredienteService.getIngredientesByReceta(
        singularRecetaDB.id
      );

      const receta = recetaDBToReceta(singularRecetaDB, ingredientes);

      return receta;
    } catch (error) {
      logger.error(
        "Error fetching recipe from database: %s",
        (error as any).message
      );
      logger.info("Fetching recipe from local JSON");

      const receta = recetas.find((receta) => String(receta.id) === id);

      if (!receta) {
        logger.warn("Recipe with id %s not found in local JSON", id);
        return undefined;
      }

      return receta;
    }
  }

  static async getRecetasByIngrediente(ingrediente: string): Promise<Receta[]> {
    logger.info("Fetching recipes with ingredient: %s", ingrediente);

    try {
      const allRecetas = (await database.query(
        `SELECT r.* FROM Receta r
        JOIN RecetaIngrediente ri ON r.id = ri.receta_id
        JOIN Ingrediente i ON ri.ingrediente_id = i.id
        WHERE i.nombre LIKE ?`,
        [`%${ingrediente}%`]
      )) as unknown as RecetaDB[];

      const recetasFiltradas = await recetasDBToRecetas(allRecetas);

      if (recetasFiltradas.length === 0) {
        logger.warn("No recipes found with ingredient: %s", ingrediente);
      }

      return recetasFiltradas;
    } catch (error) {
      logger.error(
        "Error fetching recipes by ingredient from database: %s",
        (error as any).message
      );
      logger.info("Fetching recipes by ingredient from local JSON");

      const recetasFiltradas = recetas.filter((receta) =>
        receta.ingredientes.some((ing) =>
          ing.nombre.toLowerCase().includes(ingrediente.toLowerCase())
        )
      );

      if (recetasFiltradas.length === 0) {
        logger.warn(
          "No recipes found with ingredient: %s in local JSON",
          ingrediente
        );
      }

      return recetasFiltradas;
    }
  }

  static async getRecetasByNombre(nombre: string): Promise<Receta[]> {
    logger.info("Fetching recipes with name containing: %s", nombre);

    try {
      const allRecetas = (await database.query(
        "SELECT * FROM Receta WHERE nombre LIKE ?",
        [`%${nombre}%`]
      )) as unknown as RecetaDB[];

      const recetasFiltradas = await recetasDBToRecetas(allRecetas);

      if (recetasFiltradas.length === 0) {
        logger.warn("No recipes found with name containing: %s", nombre);
      }

      return recetasFiltradas;
    } catch (error) {
      logger.error(
        "Error fetching recipes by name from database: %s",
        (error as any).message
      );
      logger.info("Fetching recipes by name from local JSON");

      const recetasFiltradas = recetas.filter((receta) =>
        receta.nombre.toLowerCase().includes(nombre.toLowerCase())
      );

      if (recetasFiltradas.length === 0) {
        logger.warn(
          "No recipes found with name containing: %s in local JSON",
          nombre
        );
      }

      return recetasFiltradas;
    }
  }
}
