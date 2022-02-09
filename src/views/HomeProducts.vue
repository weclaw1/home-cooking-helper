<script setup lang="ts">
import { Product } from "../entities/Product";
import ProductList from "../components/ProductList.vue";
import NewProductForm from "../components/NewProductForm.vue";
import { homeProductsStore } from "../stores/HomeProductsStore";

const homeProducts = homeProductsStore.state.homeProducts;

function deleteHomeProduct(productName: string) {
  homeProductsStore.deleteProduct(productName);
}

function updateHomeProduct(productName: string, product: Product) {
  homeProductsStore.updateProduct(productName, product);
}

function addHomeProduct(product: Product) {
  homeProductsStore.addProduct(product);
}
</script>

<template>
  <section class="section">
    <div class="container">
      <product-list
        :products="homeProducts"
        @delete="deleteHomeProduct"
        @update="updateHomeProduct"
      />
      <new-product-form @add="addHomeProduct" />
    </div>
  </section>
</template>
