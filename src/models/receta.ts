import { Ingrediente } from "./ingrediente";

export interface Receta {
  id: number;
  nombre: string;
  ingredientes: Ingrediente[];
  recomendacion_nutricional: string;
}

export function calcularKcalorias(receta: Receta): number {
  let kcal = 0;

  receta.ingredientes.map((ingrediente) => {
    kcal += ingrediente.kcalorias;
  });

  return kcal;
}
