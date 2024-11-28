import { Ingrediente } from "@models/ingrediente";
import recetas from "@db/recetas.json";
import logger from "@public/logger"; // Ajusta la ruta según tu estructura de proyecto

export class ingredienteService {
  static getIngredientes(): Ingrediente[] {
    logger.info("Fetching all ingredients");

    const allIngredientes = recetas.reduce((acc, receta) => {
      return acc.concat(receta.ingredientes);
    }, [] as Ingrediente[]);

    const filteredIngredientes =
      this.filterIngredientesByNombre(allIngredientes);

    logger.info(
      "Filtered ingredients by name, total: %d",
      filteredIngredientes.length
    );

    return filteredIngredientes;
  }

  static getIngredienteById(id: string): Ingrediente | null {
    logger.info("Fetching ingredient with id: %s", id);

    const allIngredientes = this.getIngredientes();

    const ingrediente = allIngredientes.find(
      (ingrediente) => String(ingrediente.id) === id
    );

    if (!ingrediente) {
      logger.warn("Ingredient with id %s not found", id);
      return null;
    }

    return ingrediente;
  }

  static getIngredientesByNombre(nombre: string): Ingrediente[] {
    logger.info("Fetching ingredients with name containing: %s", nombre);

    const allIngredientes = this.getIngredientes().filter((ingrediente) =>
      ingrediente.nombre.toLowerCase().includes(nombre.toLowerCase())
    );

    if (allIngredientes.length === 0) {
      logger.warn("No ingredients found with name containing: %s", nombre);
    }

    return allIngredientes;
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
