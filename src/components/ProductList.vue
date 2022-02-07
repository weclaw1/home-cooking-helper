<script setup lang="ts">
import ProductListItem from './ProductListItem.vue';
import { Product } from '../entities/Product';

const props = defineProps<{ products: Product[] }>();
const emit = defineEmits<{
  (event: 'delete', productName: string): void
  (event: 'update', productName: string, product: Product): void
}>();
</script>

<template>
  <product-list-item v-for="product in products" :key="product.name" :product="product" @delete="(productName) => $emit('delete', productName)" @update="(productName, product) => $emit('update', productName, product)"/>
</template>