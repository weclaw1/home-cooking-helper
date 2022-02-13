<script setup lang="ts">
const emit = defineEmits<{
  (event: "addProductsToShoppingList"): void;
}>();
</script>
<template>
  <nav class="level is-mobile">
    <div class="level-left">
      <div class="level-item">
        <router-link to="/recipes" class="button">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'arrow-left']" size="lg" />
          </span>
        </router-link>
      </div>
    </div>

    <div class="level-right">
      <div class="level-item">
        <button @click="$emit('addProductsToShoppingList')" class="button">
          {{ $t("recipes.addToShoppingList") }}
        </button>
      </div>
    </div>
  </nav>
</template>
<style scoped lang="scss"></style>
