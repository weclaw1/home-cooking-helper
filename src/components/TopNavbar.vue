<template>
  <nav
    id="topNavbar"
    class="navbar is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <!--     <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="../assets/logo.svg" width="112" height="28" />
      </router-link>
    </div> -->

    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/home_products">
          {{ $t("menu.homeProducts") }}
        </router-link>

        <router-link class="navbar-item" to="/recipes">
          {{ $t("menu.recipes") }}
        </router-link>

        <router-link class="navbar-item" to="/shopping_list">
          {{ $t("menu.shoppingList") }}
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button" to="/settings">
              <strong>{{ $t("menu.settings") }}</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped lang="scss">
#topNavbar {
  max-height: 3.25rem;
}
</style>
