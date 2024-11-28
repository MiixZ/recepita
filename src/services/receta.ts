import { Receta } from "@models/receta";
import recetas from "@db/recetas.json";
import logger from "@public/logger";

export class recetaService {
  static getRecetas(): Receta[] {
    logger.info("Fetching all recipes");
    return recetas;
  }

  static getReceta(id: string): Receta | undefined {
    logger.info("Fetching recipe with id: %s", id);
    const receta = recetas.find((receta) => String(receta.id) === id);
    if (!receta) {
      logger.error("Recipe with id %s not found", id);
    }
    return receta;
  }

  static getRecetasByIngrediente(ingrediente: string): Receta[] {
    logger.info("Fetching recipes with ingredient: %s", ingrediente);
    const recetasFiltradas = recetas.filter((receta) =>
      receta.ingredientes.some((ing) => ing.nombre === ingrediente)
    );
    if (recetasFiltradas.length === 0) {
      logger.warn("No recipes found with ingredient: %s", ingrediente);
    }
    return recetasFiltradas;
  }

  static getRecetasByNombre(nombre: string): Receta[] {
    logger.info("Fetching recipes with name containing: %s", nombre);
    const recetasFiltradas = recetas.filter((receta) =>
      receta.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    if (recetasFiltradas.length === 0) {
      logger.warn("No recipes found with name containing: %s", nombre);
    }
    return recetasFiltradas;
  }
}
