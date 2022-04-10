<script setup lang="ts">
import { Product } from "../entities/Product";
import ProductList from "../components/ProductList.vue";
import NewProductForm from "../components/NewProductForm.vue";
import { shoppingListProductsStore } from "../stores/ShoppingListProductsStore";
import { homeProductsStore } from "../stores/HomeProductsStore";
import ShoppingListControlBar from "../components/ShoppingListControlBar.vue";
import { convert } from "../convert";

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

function addBoughtProductsToProductsInHome() {
  const crossedProducts = shoppingListProducts.filter(
    (product) => product.crossed
  );
  for (const product of crossedProducts) {
    const productInProductsInHome = homeProductsStore.find(product.name);
    if (productInProductsInHome) {
      if (product.quantity === 0) {
        continue;
      }
      const updatedProductQuantity =
        convert(product.quantity)
          .from(product.unit)
          .to(productInProductsInHome.unit) + productInProductsInHome.quantity;
      homeProductsStore.updateProduct(product.name, {
        ...productInProductsInHome,
        quantity: updatedProductQuantity,
      });
    } else {
      homeProductsStore.addProduct({ ...product, crossed: false });
    }
  }
  crossedProducts.forEach((product) =>
    shoppingListProductsStore.deleteProduct(product.name)
  );
}
</script>

<template>
  <section class="section">
    <div class="container">
      <shopping-list-control-bar
        @add-bought-products-to-products-in-home="
          addBoughtProductsToProductsInHome
        "
      />
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
