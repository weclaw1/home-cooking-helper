<script setup lang="ts">
import { homeProductsStore } from "../stores/HomeProductsStore";
import { recipeStore } from "../stores/RecipeStore";
import { shoppingListProductsStore } from "../stores/ShoppingListProductsStore";
const emit = defineEmits<{
  (event: "exportData", fileName: string, data: Blob): void;
}>();

function exportData() {
  const data = {
    homeProducts: homeProductsStore.state.homeProducts,
    recipes: recipeStore.state.recipes,
    shoppingList: shoppingListProductsStore.state.shoppingListProducts,
  };

  emit(
    "exportData",
    `export-${new Date().toISOString().replaceAll(":", "")}.json`,
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
}
</script>

<template>
  <div class="field">
    <div class="control">
      <button class="button is-link" @click="exportData">
        {{ $t("settings.export.export") }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
