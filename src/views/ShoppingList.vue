<script setup lang="ts">
import { Product } from "../entities/Product";
import ProductList from "../components/ProductList.vue";
import NewProductForm from "../components/NewProductForm.vue";
import { shoppingListProductsStore } from "../stores/ShoppingListProductsStore";

const shoppingListProducts =
  shoppingListProductsStore.state.shoppingListProducts;

function deleteShoppingListProduct(productName: string) {
  shoppingListProductsStore.deleteProduct(productName);
}

function updateShoppingListProduct(productName: string, product: Product) {
  shoppingListProductsStore.updateProduct(productName, product);
}

function addShoppingListProduct(product: Product) {
  shoppingListProductsStore.addProduct(product);
}
</script>

<template>
  <section class="section">
    <div class="container">
      <product-list
        can-be-crossed
        :products="shoppingListProducts"
        @delete="deleteShoppingListProduct"
        @update="updateShoppingListProduct"
      />
      <new-product-form @add="addShoppingListProduct" />
    </div>
  </section>
</template>
