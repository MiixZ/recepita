import {
  calcularKcalorias,
  calcularKcalorias100g,
  Ingrediente,
  IngredienteDB,
} from "@models/ingrediente";

export function ingredienteDBToIngrediente(
  ingredienteDB: IngredienteDB
): Ingrediente {
  let ingrediente: Ingrediente = {
    id: ingredienteDB.id,
    nombre: ingredienteDB.nombre,
    kcalorias: 0,
    kcalorias100g: 0,
    macronutrientes: {
      proteinas: ingredienteDB.gramos_proteina,
      carbohidratos: ingredienteDB.gramos_carbohidratos,
      grasas: ingredienteDB.gramos_grasa,
    },
    peso: 0,
  };

  ingrediente.peso =
    ingredienteDB.gramos_proteina +
    ingredienteDB.gramos_carbohidratos +
    ingredienteDB.gramos_grasa;

  ingrediente.kcalorias = calcularKcalorias(ingrediente);

  ingrediente.kcalorias100g = calcularKcalorias100g(ingrediente);

  return ingrediente;
}

export function ingredientesDBToIngredientes(
  ingredientesDB: IngredienteDB[]
): Ingrediente[] {
  return ingredientesDB.map((ingredienteDB) =>
    ingredienteDBToIngrediente(ingredienteDB)
  );
}
