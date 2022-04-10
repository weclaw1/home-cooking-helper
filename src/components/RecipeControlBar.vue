<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (event: "addProductsToShoppingList", onlyMissingProducts: boolean): void;
  (event: "removeProductsFromProductsInHome"): void;
}>();

const onlyMissingProducts = ref(true);
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
      <div class="level-item">
        <button
          @click="$emit('removeProductsFromProductsInHome')"
          class="button"
        >
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'minus']" size="lg" />
          </span>
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'home']" size="lg" />
          </span>
        </button>
      </div>
    </div>

    <div class="level-right">
      <div class="level-item">
        <button
          @click="$emit('addProductsToShoppingList', onlyMissingProducts)"
          class="button"
        >
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'plus']" size="lg" />
          </span>
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'shopping-basket']" size="lg" />
          </span>
        </button>
      </div>
      <div class="level-item">
        <label class="checkbox">
          <input type="checkbox" v-model="onlyMissingProducts" />
          {{ $t("recipe.onlyMissingProducts") }}
        </label>
      </div>
    </div>
  </nav>
</template>
<style scoped lang="scss"></style>
