<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BottomNavbar from './components/BottomNavbar.vue'
import TopNavbar from './components/TopNavbar.vue'

const isMobile = ref(true)

onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize, { passive: true });
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
})

function onResize() {
  isMobile.value = window.innerWidth < 1024;
}
</script>

<template>
  <top-navbar v-if="!isMobile" />
  <router-view />
  <bottom-navbar v-if="isMobile" />
</template>
