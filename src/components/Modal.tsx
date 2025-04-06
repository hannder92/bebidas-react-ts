import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { useAppStore } from "../stores/useAppStore";
import { JSX } from "react";
import { Recipe } from "../types";

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const recipe = useAppStore((state) => state.selectedRecipe);
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite);
  const favoriteExists = useAppStore((state) => state.favoriteExists);

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];
    for (let i = 1; i <= 6; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
      const measure = recipe[`strMeasure${i}` as keyof Recipe];
      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="text-lg font-normal">
            {ingredient} - {measure}
          </li>,
        );
      }
    }
    return ingredients;
  };

  return (
    <Dialog open={modal} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-70" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative max-w-2xl w-full rounded-lg bg-white p-6 shadow-xl">
          <DialogTitle className="text-gray-900 text-4xl font-extrabold my-5 text-center">
            {recipe?.strDrink}
          </DialogTitle>

          <Description className="text-gray-700 text-center mb-6">
            Aquí tienes los detalles de la receta seleccionada.
          </Description>

          <img
            src={recipe.strDrinkThumb}
            alt={`Imagen de ${recipe.strDrink}`}
            className="mx-auto w-96 mb-6"
          />

          <div className="mb-6">
            <h3 className="text-gray-900 text-2xl font-extrabold my-5">
              Ingredientes y Cantidades
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {renderIngredients()}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="text-gray-900 text-2xl font-extrabold my-5">
              Instrucciones
            </h3>
            <p className="text-gray-700">
              {recipe?.strInstructions || "No hay instrucciones disponibles."}
            </p>
          </div>

          <div className="flex justify-between mt-5 gap-4">
            <button
              onClick={closeModal}
              className="bg-gray-600 w-full rounded-lg p-3 font-bold uppercase text-white shadow hover:bg-gray-500"
            >
              Cerrar
            </button>

            <button
              className="bg-orange-600 w-full rounded-lg p-3 font-bold uppercase text-white shadow hover:bg-orange-500"
              onClick={() => handleClickFavorite(recipe)}
            >
              {favoriteExists(recipe.idDrink)
                ? "Eliminar de Favoritos"
                : "Agregar a Favoritos"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
