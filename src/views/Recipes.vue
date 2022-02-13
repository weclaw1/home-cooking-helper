<script setup lang="ts">
import { Recipe } from "../entities/Recipe";
import RecipeList from "../components/RecipeList.vue";
import { recipeStore } from "../stores/RecipeStore";

const recipes = recipeStore.state.recipes as Recipe[];

function deleteRecipe(recipeName: string) {
  recipeStore.deleteRecipe(recipeName);
}
</script>
<template>
  <section class="section">
    <div class="container">
      <recipe-list :recipes="recipes" @delete="deleteRecipe" />
      <router-link
        to="/new_recipe"
        class="add-recipe-button button is-fullwidth"
      >
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </span>
      </router-link>
    </div>
  </section>
</template>
<style scoped lang="scss">
.add-recipe-button {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
