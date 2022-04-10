<script setup lang="ts">
import { computed, onUpdated, ref } from "vue";
import { convert } from "../convert";
import { Product } from "../entities/Product";
import { homeProductsStore } from "../stores/HomeProductsStore";
import ProductForm from "./ProductForm.vue";

const props = withDefaults(
  defineProps<{
    product: Product;
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

const edit = ref(false);

const editedProduct = ref(Object.assign({}, props.product));
const productDisplayText = computed(() => {
  if (props.product.quantity > 0) {
    return `${props.product.name} - ${props.product.quantity}${props.product.unit}`;
  }
  return props.product.name;
});

function updateProduct() {
  emit("update", props.product.name, editedProduct.value);
  edit.value = false;
}

function toggleCrossProduct() {
  editedProduct.value.crossed = !editedProduct.value.crossed;
  emit("update", props.product.name, editedProduct.value);
}

const productInHome = computed(() => {
  const homeProduct = homeProductsStore.find(props.product.name);
  if (homeProduct === undefined) {
    return false;
  }
  if (props.product.quantity === 0) {
    return true;
  }
  if (
    convert(homeProduct.quantity)
      .from(homeProduct.unit)
      .to(props.product.unit) < props.product.quantity
  ) {
    return false;
  }
  return true;
});
</script>

<template>
  <div
    class="card product-list-item"
    :class="{
      'has-background-success-light': highlightProductsInHouse
        ? productInHome
        : false,
    }"
  >
    <header class="card-header">
      <template v-if="!edit">
        <button
          v-if="canBeCrossed"
          @click="toggleCrossProduct"
          class="card-header-icon"
          aria-label="cross"
        >
          <span class="icon">
            <font-awesome-icon
              :icon="['far', product.crossed ? 'square-check' : 'square']"
              size="lg"
            />
          </span>
        </button>
        <p
          class="card-header-title"
          :class="{ 'line-through': product.crossed }"
        >
          {{ productDisplayText }}
        </p>
        <button
          v-if="!viewOnly"
          @click="edit = true"
          class="card-header-icon"
          aria-label="edit"
        >
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          </span>
        </button>
        <button
          v-if="!viewOnly"
          @click="$emit('delete', product.name)"
          class="card-header-icon"
          aria-label="delete"
        >
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </span>
        </button>
      </template>
      <template v-else>
        <product-form
          class="card-header-title"
          v-model:name="editedProduct.name"
          v-model:quantity="editedProduct.quantity"
          v-model:unit="editedProduct.unit"
        />
        <button
          @click="edit = false"
          class="card-header-icon"
          aria-label="cancel"
        >
          <span class="icon has-text-danger">
            <font-awesome-icon :icon="['fas', 'times']" />
          </span>
        </button>
        <button
          @click="updateProduct"
          class="card-header-icon has-text-success"
          aria-label="confirm"
        >
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'check']" />
          </span>
        </button>
      </template>
    </header>
  </div>
</template>

<style scoped lang="scss">
.product-list-item {
  max-width: 1024px;
  margin: 0 auto;

  .field:not(:last-child) {
    margin-bottom: 0;
  }
}

.line-through {
  text-decoration-line: line-through;
}
</style>
