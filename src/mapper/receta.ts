import database from "@db/database";
import { Ingrediente } from "@models/ingrediente";
import { calcularKcalorias, Receta, RecetaDB } from "@models/receta";
import { ingredienteService } from "@services/ingrediente";

export function recetaDBToReceta(
  recetaDB: RecetaDB,
  ingredientes: Ingrediente[]
): Receta {
  let receta: Receta = {
    id: recetaDB.id,
    nombre: recetaDB.nombre,
    ingredientes: ingredientes,
    recomendacion_nutricional: recetaDB.recomendacion,
    kilocalorias: 0,
  };

  receta.kilocalorias = calcularKcalorias(receta);

  return receta;
}

export async function recetasDBToRecetas(
  recetasDB: RecetaDB[]
): Promise<Receta[]> {
  const recetasPromises = recetasDB.map(async (recetaDB) => {
    const ingredientes = await ingredienteService.getIngredientesByReceta(
      recetaDB.id
    );

    return recetaDBToReceta(recetaDB, ingredientes);
  });

  return await Promise.all(recetasPromises);
}
