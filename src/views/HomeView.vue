<template>
  <v-container class="d-flex flex-start flex-wrap">
    <v-card
      class="mx-auto my-12"
      max-width="374"
      v-for="recipe of recipes"
      :key="recipe.title"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="recipe.image" width="100%"></v-img>

      <v-card-title>{{ recipe.title }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="5 * (recipe.spoonacularScore / 100)"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            {{ recipe.id }} - {{ recipe.spoonacularScore }} ({{ recipe.aggregateLikes }})
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          $ • {{ recipe.cuisines[0] }}, {{ recipe.dishTypes[0] }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
          <v-btn color="deep-purple lighten-2" text> See Recipe </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
const NUMBER_OF_RECIPES = 8;
export default {
  name: "HomeView",

  data: () => ({
    recipes: [],
  }),

  components: {},

  mounted() {
    this.$http
      .get("recipes/random", { params: { number: NUMBER_OF_RECIPES } })
      .then(
        (recipes) => (this.recipes = recipes.data.recipes),
        (err) => console.log(err)
      );
  },
};
</script>
