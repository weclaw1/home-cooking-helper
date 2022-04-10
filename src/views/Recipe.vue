<script setup lang="ts">
import RecipeControlBar from "../components/RecipeControlBar.vue";
import RecipeCard from "../components/RecipeCard.vue";
import { recipeStore } from "../stores/RecipeStore";
import { homeProductsStore } from "../stores/HomeProductsStore";
import { shoppingListProductsStore } from "../stores/ShoppingListProductsStore";
import { Recipe } from "../entities/Recipe";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { convert } from "../convert";
import { Product } from "../entities/Product";

const props = defineProps<{
  recipeName?: string;
}>();

const router = useRouter();

const recipe = ref(
  props.recipeName ? recipeStore.find(props.recipeName)! : new Recipe("")
);

function updateRecipe(recipeName: string, updatedRecipe: Recipe) {
  if (props.recipeName) {
    recipeStore.updateRecipe(recipeName, updatedRecipe);
  } else {
    recipeStore.addRecipe(updatedRecipe);
    router.push("/recipes");
  }
  recipe.value = updatedRecipe;
}

function addProductsToShoppingList(onlyMissingProducts: boolean) {
  const products = onlyMissingProducts
    ? getMissingProducts()
    : recipe.value.products;
  for (const product of products) {
    const productInShoppingList = shoppingListProductsStore.find(product.name);
    if (productInShoppingList) {
      if (product.quantity === 0) {
        continue;
      }
      const updatedProductQuantity =
        convert(product.quantity)
          .from(product.unit)
          .to(productInShoppingList.unit) + productInShoppingList.quantity;
      shoppingListProductsStore.updateProduct(product.name, {
        ...productInShoppingList,
        quantity: updatedProductQuantity,
      });
    } else {
      shoppingListProductsStore.addProduct(product);
    }
  }
}

function removeProductsFromProductsInHome() {
  for (const recipeProduct of recipe.value.products) {
    const productInHome = homeProductsStore.find(recipeProduct.name);
    if (!productInHome || recipeProduct.quantity === 0) {
      continue;
    }
    const recipeProductQuantity = convert(recipeProduct.quantity)
      .from(recipeProduct.unit)
      .to(productInHome.unit);
    if (recipeProductQuantity < productInHome.quantity) {
      homeProductsStore.updateProduct(productInHome.name, {
        ...productInHome,
        quantity: productInHome.quantity - recipeProductQuantity,
      });
    } else {
      homeProductsStore.deleteProduct(productInHome.name);
    }
  }
}

function getMissingProducts(): Product[] {
  let missingProducts = [];
  for (const recipeProduct of recipe.value.products) {
    const productInHome = homeProductsStore.find(recipeProduct.name);
    if (productInHome) {
      const productInHomeQuantity = convert(productInHome.quantity)
        .from(productInHome.unit)
        .to(recipeProduct.unit);
      if (productInHomeQuantity < recipeProduct.quantity) {
        missingProducts.push({
          ...recipeProduct,
          quantity: recipeProduct.quantity - productInHomeQuantity,
        });
      }
    } else {
      missingProducts.push(recipeProduct);
    }
  }
  return missingProducts;
}
</script>
<template>
  <section class="section">
    <div class="container">
      <recipe-control-bar
        @add-products-to-shopping-list="addProductsToShoppingList"
        @remove-products-from-products-in-home="
          removeProductsFromProductsInHome
        "
      />
      <recipe-card
        :recipe="recipe"
        @update="updateRecipe"
        :new-recipe="recipeName === undefined"
      />
    </div>
  </section>
</template>
