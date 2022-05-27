<script setup lang="ts">
import { Ref, ref } from "vue";
import { convert } from "../convert";
import { Product } from "../entities/Product";
import { Recipe } from "../entities/Recipe";
import { homeProductsStore } from "../stores/HomeProductsStore";
import { recipeStore } from "../stores/RecipeStore";
import { shoppingListProductsStore } from "../stores/ShoppingListProductsStore";

const uploadedFile: Ref<File | undefined> = ref(undefined);
const importProductsInHome = ref(false);
const importRecipes = ref(true);
const importShoppingList = ref(false);
const clearPreviousData = ref(false);

function loadFile(event: Event) {
  const target = event.target as HTMLInputElement;
  const fileList: FileList | null = target.files;
  if (fileList !== null) {
    uploadedFile.value = fileList[0];
  }
}

async function importData() {
  if (uploadedFile.value === undefined) {
    return;
  }

  const importedData: {
    homeProducts: Product[];
    recipes: Recipe[];
    shoppingList: Product[];
  } = JSON.parse(await uploadedFile.value.text());

  if (clearPreviousData.value) {
    homeProductsStore.clear();
    recipeStore.clear();
    shoppingListProductsStore.clear();
  }

  if (importProductsInHome.value) {
    importHomeProductsData(importedData.homeProducts);
  }

  if (importRecipes.value) {
    importRecipesData(importedData.recipes);
  }

  if (importShoppingList.value) {
    importShoppingListProductsData(importedData.shoppingList);
  }
}

function importHomeProductsData(importedHomeProducts: Product[]) {
  for (const homeProduct of importedHomeProducts) {
    const productInStore = homeProductsStore.find(homeProduct.name);
    if (productInStore) {
      if (homeProduct.quantity === 0) {
        continue;
      }
      const updatedProductQuantity =
        convert(homeProduct.quantity)
          .from(homeProduct.unit)
          .to(productInStore.unit) + productInStore.quantity;
      homeProductsStore.updateProduct(homeProduct.name, {
        ...productInStore,
        quantity: updatedProductQuantity,
      });
    } else {
      homeProductsStore.addProduct(homeProduct);
    }
  }
}

function importRecipesData(importedRecipes: Recipe[]) {
  for (const recipe of importedRecipes) {
    const recipeInStore = recipeStore.containsRecipe(recipe.name);
    if (recipeInStore) {
      recipeStore.updateRecipe(recipe.name, recipe);
    } else {
      recipeStore.addRecipe(recipe);
    }
  }
}

function importShoppingListProductsData(
  importedShoppingListProducts: Product[]
) {
  for (const shoppingListProduct of importedShoppingListProducts) {
    const shoppingListProductInStore = shoppingListProductsStore.find(
      shoppingListProduct.name
    );
    if (shoppingListProductInStore) {
      if (shoppingListProduct.quantity === 0) {
        continue;
      }
      const updatedProductQuantity =
        convert(shoppingListProduct.quantity)
          .from(shoppingListProduct.unit)
          .to(shoppingListProductInStore.unit) +
        shoppingListProductInStore.quantity;
      shoppingListProductsStore.updateProduct(shoppingListProduct.name, {
        ...shoppingListProductInStore,
        quantity: updatedProductQuantity,
      });
    } else {
      shoppingListProductsStore.addProduct(shoppingListProduct);
    }
  }
}
</script>

<template>
  <div class="field">
    <div class="control">
      <button
        class="button is-link"
        :disabled="!uploadedFile"
        @click="importData"
      >
        {{ $t("settings.import.import") }}
      </button>
    </div>
  </div>
  <div class="field">
    <div :class="{ 'has-name': uploadedFile }" class="file">
      <label class="file-label">
        <input
          class="file-input"
          type="file"
          accept=".json"
          @change="loadFile"
        />
        <span class="file-cta">
          <span class="file-icon">
            <font-awesome-icon :icon="['fas', 'upload']" />
          </span>
          <span class="file-label">{{ $t("settings.import.chooseFile") }}</span>
        </span>
        <span v-if="uploadedFile" class="file-name">
          {{ uploadedFile.name }}
        </span>
      </label>
    </div>
  </div>
  <div class="field">
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" v-model="importProductsInHome" />
        {{ $t("settings.import.importProductsInHome") }}
      </label>
    </div>
  </div>
  <div class="field">
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" v-model="importRecipes" />
        {{ $t("settings.import.importRecipes") }}
      </label>
    </div>
  </div>
  <div class="field">
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" v-model="importShoppingList" />
        {{ $t("settings.import.importShoppingList") }}
      </label>
    </div>
  </div>
  <div class="field">
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" v-model="clearPreviousData" />
        {{ $t("settings.import.clearPreviousData") }}
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
