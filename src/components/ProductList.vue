<script setup lang="ts">
import ProductListItem from "./ProductListItem.vue";
import { Product } from "../entities/Product";

const props = withDefaults(
  defineProps<{
    products: Product[];
    canBeCrossed?: boolean;
    viewOnly?: boolean;
    highlightProductsInHouse?: boolean;
  }>(),
  {
    canBeCrossed: false,
    viewOnly: false,
    highlightProductsInHouse: false,
  }
);
const emit = defineEmits<{
  (event: "delete", productName: string): void;
  (event: "update", productName: string, product: Product): void;
}>();
</script>

<template>
  <product-list-item
    v-for="product in products"
    :key="product.name"
    :product="product"
    :can-be-crossed="canBeCrossed"
    :view-only="viewOnly"
    :highlight-products-in-house="highlightProductsInHouse"
    @delete="(productName) => $emit('delete', productName)"
    @update="(productName, product) => $emit('update', productName, product)"
  />
</template>
