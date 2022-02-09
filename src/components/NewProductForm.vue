<script setup lang="ts">
import { ref } from "vue";
import ProductForm from "./ProductForm.vue";
import { Product, Unit } from "../entities/Product";
const emit = defineEmits<{
  (event: "add", product: Product): void;
}>();

const newProduct = ref(new Product("", 0, null));

function addNewProduct() {
  emit("add", Object.assign({}, newProduct.value));
  newProduct.value = new Product("", 0, null);
}
</script>

<template>
  <div class="card new-product-form">
    <header class="card-header">
      <product-form
        class="card-header-title"
        v-model:name="newProduct.name"
        v-model:quantity="newProduct.quantity"
        v-model:unit="newProduct.unit"
      />
      <button @click="addNewProduct" class="card-header-icon" aria-label="add">
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </span>
      </button>
    </header>
  </div>
</template>
<style scoped lang="scss">
.new-product-form {
  max-width: 1024px;
  margin: 0 auto;

  .field:not(:last-child) {
    margin-bottom: 0;
  }
}
</style>
