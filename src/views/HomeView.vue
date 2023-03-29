<template>
  <v-container class="d-flex flex-wrap">


    <v-card class="mx-auto my-12" max-width="374" v-for="recipe of recipes.recipes" :key="recipe.title">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
      </template>

      <v-img height="250" :src="recipe.image" width="100%"></v-img>

      <v-card-title>{{ recipe.title }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating :value="5 * (recipe.healthScore / 100)" color="amber" dense half-increments readonly
            size="14"></v-rating>

          <div class="grey--text ms-4">
            {{ recipe.healthScore }} ({{ recipe.aggregateLikes }})
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          $ • {{ recipe.cuisines[0] }}, {{ recipe.dishTypes[0] }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text>
          See Recipe
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
const API_KEY = "8ecda0e43b5744a0af5125a6ed250e11"
const NUMBER_OF_RECIPES = 9
const HEADERS = {
  'x-api-key': API_KEY
}
const URL_BASE = "https://api.spoonacular.com/recipes/random"
export default {
  name: 'HomeView',

  data: () => ({
    recipes: [],
  }),

  components: {
  },

  created() {
    this.$http.get(URL_BASE, { params: { number: NUMBER_OF_RECIPES }, headers: HEADERS })
      .then(res => res.json())
      .then(recipes => this.recipes = recipes, err => console.log(err));
  },
}
</script>
