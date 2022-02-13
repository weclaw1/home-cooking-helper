<script setup lang="ts">
import RecipeListItem from "./RecipeListItem.vue";
import { Recipe } from "../entities/Recipe";

const props = defineProps<{ recipes: Recipe[] }>();
const emit = defineEmits<{
  (event: "delete", recipeName: string): void;
}>();
</script>

<template>
  <recipe-list-item
    v-for="recipe in recipes"
    :key="recipe.name"
    :recipe="recipe"
    @delete="(recipeName) => $emit('delete', recipeName)"
  />
</template>
