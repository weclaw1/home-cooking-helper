<template>
  <nav
    id="bottomNavbar"
    class="navbar is-primary is-fixed-bottom"
    role="navigation"
  >
    <div class="navbar-brand">
      <router-link
        class="navbar-item is-expanded bottom-navbar-item"
        to="/home_products"
      >
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'home']" size="lg" />
        </span>
      </router-link>
      <router-link
        class="navbar-item is-expanded bottom-navbar-item"
        to="/recipes"
      >
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'utensils']" size="lg" />
        </span>
      </router-link>
      <router-link
        class="navbar-item is-expanded bottom-navbar-item"
        to="/shopping_list"
      >
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'shopping-basket']" size="lg" />
        </span>
      </router-link>
      <router-link
        class="navbar-item is-expanded bottom-navbar-item"
        to="/settings"
      >
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'sliders-h']" size="lg" />
        </span>
      </router-link>
    </div>
  </nav>
</template>
<style scoped lang="scss">
#bottomNavbar {
  max-height: 3.25rem;
}
.bottom-navbar-item {
  justify-content: center;
}
</style>
