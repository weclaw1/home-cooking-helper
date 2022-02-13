<script setup lang="ts">
import RecipeControlBar from "../components/RecipeControlBar.vue";
import RecipeCard from "../components/RecipeCard.vue";
import { recipeStore } from "../stores/RecipeStore";
import { shoppingListProductsStore } from "../stores/ShoppingListProductsStore";
import { Recipe } from "../entities/Recipe";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { convert } from "../convert";

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

function addRecipeProductsToShoppingList() {
  for (let product of recipe.value.products) {
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
</script>
<template>
  <section class="section">
    <div class="container">
      <recipe-control-bar
        @add-products-to-shopping-list="addRecipeProductsToShoppingList"
      />
      <recipe-card
        :recipe="recipe"
        @update="updateRecipe"
        :new-recipe="recipeName === undefined"
      />
    </div>
  </section>
</template>
