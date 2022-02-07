<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue';
import { Product } from '../entities/Product';
import ProductForm from './ProductForm.vue';

const props = defineProps<{ product: Product }>();
const emit = defineEmits<{
  (event: 'delete', productName: string): void
  (event: 'update', productName: string, product: Product): void
}>();
const showActions = ref(false);
const edit = ref(false);

const editedProduct = ref(Object.assign({}, props.product));
const productDisplayText = computed(() => {
  if (props.product.quantity > 0) {
    const productUnit = props.product.unit !== null ? props.product.unit : '';
    return `${props.product.name} - ${props.product.quantity}${productUnit}`;
  }
  return props.product.name;
})

function updateProduct() {
  emit('update', props.product.name, editedProduct.value);
  edit.value = false;
}
</script>

<template>
  <div class="card product-list-item">
    <header class="card-header">
      <template v-if="!edit">
        <p class="card-header-title">
          {{ productDisplayText }}
        </p>
        <button @click="edit = true" class="card-header-icon" aria-label="edit">
          <span class="icon">
            <font-awesome-icon icon="pencil-alt"/>
          </span>
        </button>
        <button @click="$emit('delete', product.name)" class="card-header-icon" aria-label="delete">
          <span class="icon">
            <font-awesome-icon icon="trash-alt"/>
          </span>
        </button>
      </template>
      <template v-else>
        <product-form class="card-header-title" v-model:name="editedProduct.name" v-model:quantity="editedProduct.quantity" v-model:unit="editedProduct.unit"/>
        <button @click="updateProduct" class="card-header-icon" aria-label="confirm">
          <span class="icon">
            <font-awesome-icon icon="check"/>
          </span>
        </button>
        <button @click="edit=false" class="card-header-icon" aria-label="cancel">
          <span class="icon">
            <font-awesome-icon icon="times"/>
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
</style>