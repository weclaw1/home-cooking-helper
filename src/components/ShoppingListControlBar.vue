<script setup lang="ts">
const emit = defineEmits<{
  (event: "addBoughtProductsToProductsInHome"): void;
}>();
</script>
<template>
  <nav class="level is-mobile">
    <div class="level-left"></div>
    <div class="level-right">
      <div class="level-item">
        <button @click="$emit('addBoughtProductsToProductsInHome')" class="button">
          {{ $t("shoppingList.addBoughtProductsToProductsInHome") }}
        </button>
      </div>
    </div>
  </nav>
</template>
<style scoped lang="scss"></style>