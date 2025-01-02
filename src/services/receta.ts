import { Receta, RecetaDB } from "@models/receta";
import logger from "@public/logger";
import database from "@db/database";
import { recetaDBToReceta, recetasDBToRecetas } from "@mapper/receta";
import { ingredienteService } from "./ingrediente";

export class recetaService {
  static async getRecetas(): Promise<Receta[]> {
    logger.info("Fetching all recipes");

    const allRecetas = (await database.query(
      "SELECT * FROM Receta"
    )) as unknown as RecetaDB[];

    const filteredRecetas = recetasDBToRecetas(allRecetas);

    return filteredRecetas;
  }

  static async getReceta(id: string): Promise<Receta | undefined> {
    logger.info("Fetching recipe with id: %s", id);
    const recetaDB = (await database.query(
      "SELECT * FROM Receta WHERE id = ?",
      [id]
    )) as unknown as RecetaDB[];

    if (recetaDB.length === 0) {
      logger.error("Recipe with id %s not found", id);
      return undefined;
    }

    const singularRecetaDB = recetaDB[0];

    const ingredientes = await ingredienteService.getIngredientesByReceta(
      singularRecetaDB.id
    );

    const receta = recetaDBToReceta(singularRecetaDB, ingredientes);

    return receta;
  }

  static async getRecetasByIngrediente(ingrediente: string): Promise<Receta[]> {
    logger.info("Fetching recipes with ingredient: %s", ingrediente);

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
  }

  static async getRecetasByNombre(nombre: string): Promise<Receta[]> {
    logger.info("Fetching recipes with name containing: %s", nombre);

    const allRecetas = (await database.query(
      "SELECT * FROM Receta WHERE nombre LIKE ?",
      [`%${nombre}%`]
    )) as unknown as RecetaDB[];

    const recetasFiltradas = await recetasDBToRecetas(allRecetas);

    if (recetasFiltradas.length === 0) {
      logger.warn("No recipes found with name containing: %s", nombre);
    }

    return recetasFiltradas;
  }
}
