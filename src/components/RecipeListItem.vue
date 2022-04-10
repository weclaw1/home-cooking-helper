<script setup lang="ts">
import { computed } from "vue";
import { Recipe } from "../entities/Recipe";
import { homeProductsStore } from "../stores/HomeProductsStore";
import { convert } from "../convert";

const props = defineProps<{ recipe: Recipe }>();
const emit = defineEmits<{
  (event: "delete", recipeName: string): void;
}>();

const allProductsInHome = computed(() => {
  for (const recipeProduct of props.recipe.products) {
    const homeProduct = homeProductsStore.find(recipeProduct.name);
    if (homeProduct === undefined) {
      return false;
    }
    if (recipeProduct.quantity === 0) {
      continue;
    }
    if (
      convert(homeProduct.quantity)
        .from(homeProduct.unit)
        .to(recipeProduct.unit) < recipeProduct.quantity
    ) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div
    class="card recipe-list-item"
    :class="{ 'has-background-success-light': allProductsInHome }"
  >
    <header class="card-header">
      <p class="card-header-title">
        {{ recipe.name }}
      </p>
      <router-link
        :to="{ name: 'recipe', params: { recipeName: recipe.name } }"
        class="card-header-icon"
        aria-label="view"
      >
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'eye']" />
        </span>
      </router-link>
      <button
        @click="$emit('delete', recipe.name)"
        class="card-header-icon"
        aria-label="delete"
      >
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
        </span>
      </button>
    </header>
  </div>
</template>

<style scoped lang="scss">
.recipe-list-item {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
