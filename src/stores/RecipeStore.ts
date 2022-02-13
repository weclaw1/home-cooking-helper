import { reactive } from "vue";
import { Recipe } from "../entities/Recipe";

export const recipeStore = {
  state: reactive({
    recipes: loadFromLocalStorage(),
  }),

  find(recipeName: string): Recipe | undefined {
    return this.state.recipes.find((recipe) => recipe.name === recipeName);
  },

  addRecipe(recipe: Recipe) {
    if (this.containsRecipe(recipe.name)) {
      throw new Error(
        `Recipe list already contains recipe with name ${recipe.name}`
      );
    }
    if (
      new Set(recipe.products.map((product) => product.name)).size !=
      recipe.products.length
    ) {
      throw new Error("Recipe product list contains duplicate values");
    }
    this.state.recipes.push(recipe);
    saveToLocalStorage(this.state.recipes as Recipe[]);
  },

  deleteRecipe(recipeName: string) {
    const recipeIndex = this.state.recipes.findIndex(
      (recipe) => recipe.name === recipeName
    );
    if (recipeIndex < 0) {
      throw new Error(
        `Recipe list does not contain recipe with name: ${recipeName}`
      );
    }
    this.state.recipes.splice(recipeIndex, 1);
    saveToLocalStorage(this.state.recipes as Recipe[]);
  },

  updateRecipe(recipeName: string, recipe: Recipe) {
    if (
      new Set(recipe.products.map((product) => product.name)).size !=
      recipe.products.length
    ) {
      throw new Error("Recipe product list contains duplicate values");
    }
    const recipeIndex = this.state.recipes.findIndex(
      (recipe) => recipe.name === recipeName
    );
    if (recipeIndex < 0) {
      throw new Error(
        `Recipe list does not contain recipe with name: ${recipeName}`
      );
    }
    this.state.recipes[recipeIndex] = recipe;
    saveToLocalStorage(this.state.recipes as Recipe[]);
  },

  containsRecipe(recipeName: string): boolean {
    return this.state.recipes.some((recipe) => recipe.name === recipeName);
  },
};

function loadFromLocalStorage(): Recipe[] {
  const localStorageRecipes = localStorage.getItem("recipes");
  if (localStorageRecipes !== null) {
    return JSON.parse(localStorageRecipes);
  }
  return [];
}

function saveToLocalStorage(recipes: Recipe[]) {
  window.localStorage.setItem("recipes", JSON.stringify(recipes));
}
