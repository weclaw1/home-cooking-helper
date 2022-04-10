<script setup lang="ts">
import { ref } from "vue";
import { Recipe } from "../entities/Recipe";
import ProductList from "../components/ProductList.vue";
import NewProductForm from "../components/NewProductForm.vue";
import { Product } from "../entities/Product";
const props = defineProps<{
  recipe: Recipe;
  newRecipe: boolean;
}>();
const emit = defineEmits<{
  (event: "update", recipeName: string, recipe: Recipe): void;
}>();

const edit = ref(props.newRecipe);
const editedRecipe = ref(Object.assign({}, props.recipe));

function updateRecipe() {
  emit("update", props.recipe.name, editedRecipe.value);
  edit.value = false;
}

function updateRecipeProduct(productName: string, product: Product) {
  const productIndex = editedRecipe.value.products.findIndex(
    (product) => product.name === productName
  );
  editedRecipe.value.products[productIndex] = product;
}

function deleteRecipeProduct(productName: string) {
  const productIndex = editedRecipe.value.products.findIndex(
    (product) => product.name === productName
  );
  editedRecipe.value.products.splice(productIndex, 1);
}
</script>
<template>
  <div class="card">
    <template v-if="!edit">
      <header class="card-header">
        <p class="card-header-title">
          {{ recipe.name }}
        </p>
      </header>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <product-list
              view-only
              highlight-products-in-house
              :products="recipe.products"
            />
          </div>
          <div class="column">
            <p>
              {{ recipe.text }}
            </p>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button
          @click="edit = true"
          class="button is-medium icon card-footer-item"
        >
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />
        </button>
      </footer>
    </template>
    <template v-else>
      <header class="card-header">
        <div class="card-header-title">
          <div class="field is-fullwidth">
            <div class="control">
              <input
                v-model="editedRecipe.name"
                class="input"
                type="text"
                :placeholder="$t('recipe.name')"
              />
            </div>
          </div>
        </div>
      </header>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <product-list
              @update="updateRecipeProduct"
              @delete="deleteRecipeProduct"
              :products="editedRecipe.products"
            />
            <new-product-form
              @add="(product) => editedRecipe.products.push(product)"
            />
          </div>
          <div class="column">
            <div class="field">
              <div class="control">
                <textarea
                  v-model="editedRecipe.text"
                  class="textarea"
                  :placeholder="$t('recipe.text')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button
          @click="edit = false"
          class="button has-text-danger icon card-footer-item"
        >
          <font-awesome-icon :icon="['fas', 'times']" size="lg" />
        </button>
        <button
          @click="updateRecipe"
          class="button has-text-success icon card-footer-item"
        >
          <font-awesome-icon :icon="['fas', 'check']" size="lg" />
        </button>
      </footer>
    </template>
  </div>
</template>
<style scoped lang="scss">
.is-fullwidth {
  width: 100%;
}
</style>
