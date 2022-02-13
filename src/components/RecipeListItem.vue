<script setup lang="ts">
import { Recipe } from "../entities/Recipe";

const props = defineProps<{ recipe: Recipe }>();
const emit = defineEmits<{
  (event: "delete", recipeName: string): void;
}>();
</script>

<template>
  <div class="card recipe-list-item">
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
