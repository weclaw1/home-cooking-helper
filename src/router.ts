import { createRouter, createWebHistory } from 'vue-router';

import ShoppingList from "./views/ShoppingList.vue";
import HomeProducts from "./views/HomeProducts.vue";
import Recipes from "./views/Recipes.vue";
import Recipe from "./views/Recipe.vue";
import Settings from "./views/Settings.vue";
import PageNotFound from "./views/PageNotFound.vue";

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const routes = [
  {
    path: "/",
    component: ShoppingList,
    meta: {
      title: "Home Cooking Helper - Shopping List",
    },
  },
  {
    path: "/home_products",
    name: "home_products",
    component: HomeProducts,
    meta: {
      title: "Home Cooking Helper - Products in home",
    },
  },
  {
    path: "/recipes",
    name: "recipes",
    component: Recipes,
    meta: {
      title: "Home Cooking Helper - Recipes",
    },
  },
  {
    path: "/recipes/:recipe_id",
    name: "recipe",
    component: Recipe,
    props: true,
    meta: {
      title: "Home Cooking Helper - Recipe",
    },
  },
  {
    path: "/shopping_list",
    name: "shopping_list",
    component: ShoppingList,
    meta: {
      title: "Home Cooking Helper - Shopping List",
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      title: "Home Cooking Helper - Settings",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "page_not_found",
    component: PageNotFound,
    meta: {
      title: "Home Cooking Helper - Page Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = to.meta.title;
});

export default router;