import { create } from "zustand";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createFavoriteSlice, FavoriteSliceType } from "./favoriteSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";
import { AISlice, createAISlice } from "./aiSlice";

export const useAppStore = create<
  RecipesSliceType & FavoriteSliceType & NotificationSliceType & AISlice
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a),
  })),
);
