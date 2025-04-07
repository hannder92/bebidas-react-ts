import api from "../lib/axios";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponseSchema,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";

export async function getCategories() {
  try {
    const { data } = await api.get("/list.php?c=list");
    const result = CategoriesAPIResponseSchema.safeParse(data);
    if (result.success) {
      return result.data;
    }
    throw new Error("Error al validar la respuesta de categorías");
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
}

export async function getRecipes(filters: SearchFilter) {
  try {
    const { data } = await api.get(
      `/filter.php?c=${filters.category}&i=${filters.ingredient}`,
    );
    const result = DrinksAPIResponseSchema.safeParse(data);
    if (result.success) {
      return result.data;
    }
    throw new Error("Error al validar la respuesta de recetas");
  } catch (error) {
    console.error("Error al obtener recetas:", error);
    throw error;
  }
}

export async function getRecipeByID(id: Drink["idDrink"]) {
  try {
    const { data } = await api.get(`/lookup.php?i=${id}`);
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
    if (result.success) {
      return result.data;
    }
    throw new Error("Error al validar la respuesta de la receta");
  } catch (error) {
    console.error("Error al obtener la receta por ID:", error);
    throw error;
  }
}
