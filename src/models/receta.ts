import { Ingrediente } from "./ingrediente";

export interface Receta {
  id: number;
  nombre: string;
  ingredientes: Ingrediente[];
  recomendacion_nutricional: string;
  kilocalorias: number;
}

export interface RecetaDB {
  id: number;
  nombre: string;
  recomendacion: string;
  peso: number;
  tiempo_preparacion: number;
}

export interface RecetaIngredienteDB {
  id: number;
  id_receta: number;
  id_ingrediente: number;
  cantidad: number;
}

export function calcularKcalorias(receta: Receta): number {
  let kcal = 0;

  receta.ingredientes.map((ingrediente) => {
    kcal += ingrediente.kcalorias;
  });

  return kcal;
}
