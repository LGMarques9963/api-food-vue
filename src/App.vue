<template>
  <v-app>
    <v-app-bar app color="white" dark width="100%">
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="./assets/logo_alura.png"
          transition="scale-transition" />
      </div>

      <v-spacer></v-spacer>

      <v-text-field class="d-flex align-center mt-7" label="O que está procurando..."  solo
        prepend-inner-icon="mdi-magnify" light></v-text-field>
      <v-spacer></v-spacer>

      <nav class="classynav">
        <!-- <ul class="d-flex justify-space-between">
          <li v-for="route in routes" :key="route.name">
            <router-link :to="route.path ? route.path : '/'">{{ route.name }}</router-link>
          </li>
        </ul> -->
        <v-tabs background-color="white" slider-color="#42b983">
          <v-tab v-for="route in routes" :key="route.path">
            <router-link :to="route.path ? route.path : '/'">{{ route.name }}</router-link>
          </v-tab>
        </v-tabs>
      </nav>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { routes } from './router/index';
export default {
  name: 'App',

  data: () => ({
    routes: routes.filter(route => route.menu),
  }),
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  width: auto;
  text-decoration: none;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 10px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

ul {
  width: 100%;
}

li {
  list-style: none;
}

.v-tab__item{
  text-decoration: none;
}
</style>
