<template>
  <v-app>
    <v-app-bar app color="white" dark width="100%">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo_alura.png"
          transition="scale-transition"
        />
      </div>

      <v-spacer></v-spacer>
      <v-autocomplete
        :items="entries"
        :loading="isLoading"
        :search-input.sync="search"
        @change="onChange"
        @keyup.enter="searchRecipe(search)"
        color="black"
        item-text="title"
        item-value="id"
        label="O que está procurando..."
        placeholder="Começe a digitar para buscar"
        prepend-inner-icon="mdi-magnify"
        class="d-flex align-center mt-7"
        hide-no-data
        rounded
        clearable
        light
      ></v-autocomplete>
      <v-spacer></v-spacer>

      <nav class="classynav">
        <v-tabs background-color="white" slider-color="#42b983">
          <v-tab v-for="route in routes" :key="route.path">
            <router-link :to="route.path ? route.path : '/'">{{
              route.name
            }}</router-link>
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
import { routes } from "./router/index";
export default {
  name: "App",

  data: () => ({
    routes: routes.filter((route) => route.menu),
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    descriptionLimit: 60,
    queryLimit: 10,
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Title = entry.title;
        return Object.assign({}, entry, { Title });
      });
    },
  },

  methods: {
    onChange(item) {
      this.$router.push({ name: "recipe", params: { id: item } });
      this.entries = []
    },
    searchRecipe(search){
      this.$router.push({ name: "search", params: { id: search } });
      this.entries = []
    }
  },

  watch: {
    search(val) {
      if (this.isLoading) return;

      if (val && val.length > 3) {
        this.isLoading = true;
        this.$http
          .get(`recipes/autocomplete`, {
            params: { number: this.queryLimit, query: val },
          })
          .then((res) => {
            this.entries = res.data;
          })
          .catch((err) => console.log(err))
          .finally(() => (this.isLoading = false));
      } else {
        this.entries = [];
      }
    },
  },
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

.v-tab__item {
  text-decoration: none;
}
</style>
