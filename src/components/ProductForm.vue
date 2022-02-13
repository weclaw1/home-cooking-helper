<script setup lang="ts">
import { Unit } from "../entities/Product";
const props = defineProps<{
  name: string;
  quantity: number;
  unit: string;
}>();
const emit = defineEmits<{
  (event: "update:name", name: string): void;
  (event: "update:quantity", quantity: number): void;
  (event: "update:unit", unit: string): void;
}>();
</script>

<template>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field max-width">
        <p class="control is-expanded max-width">
          <input
            class="input"
            :value="name"
            @input="$emit('update:name', ($event.target as HTMLInputElement).value)"
            type="text"
            :placeholder="$t('product.name')"
          />
        </p>
      </div>
      <div class="field">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input
              class="input"
              :value="quantity"
              @input="$emit('update:quantity', ($event.target as HTMLInputElement).valueAsNumber)"
              type="number"
              :placeholder="$t('product.quantity')"
            />
          </p>
          <p class="control">
            <span class="select">
              <select
                :value="unit"
                @input="$emit('update:unit', ($event.target as HTMLInputElement).value)"
              >
                <option v-for="unit in Object.values(Unit)">
                  {{ unit }}
                </option>
              </select>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.field-body {
  flex-grow: 1;
}
</style>
