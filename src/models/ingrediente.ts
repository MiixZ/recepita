import {
  VALOR_CARBHIDRATOS,
  VALOR_GRASAS,
  VALOR_PROTEINAS,
} from "@utils/constants";
import { Macronutrientes } from "./macronutrientes";

export interface Ingrediente {
  id: number;
  nombre: string;
  kcalorias: number;
  kcalorias100g: number;
  macronutrientes: Macronutrientes;
  peso: number;
}

export interface IngredienteDB {
  id: number;
  nombre: string;
  gramos_proteina: number;
  gramos_carbohidratos: number;
  gramos_grasa: number;
}

export function calcularKcalorias(ingrediente: Ingrediente): number {
  const { proteinas, carbohidratos, grasas } = ingrediente.macronutrientes;

  const kcals =
    proteinas * VALOR_PROTEINAS +
    carbohidratos * VALOR_CARBHIDRATOS +
    grasas * VALOR_GRASAS;

  return kcals;
}

export function calcularKcalorias100g(ingrediente: Ingrediente): number {
  const kcals = calcularKcalorias(ingrediente);

  return (kcals * 100) / ingrediente.peso;
}
