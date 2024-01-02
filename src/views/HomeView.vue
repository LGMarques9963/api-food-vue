<template>
  <v-container class="d-flex flex-start flex-wrap">
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="deep-purple accent-4"
    ></v-progress-linear>
    <v-col width="100%" cols="10" class="d-flex flex-wrap">
      <v-col :key="recipe.title" :cols="4" v-for="recipe in recipes">
        <v-card :loading="loading">
          <v-img
            height="200px"
            :src="recipe.image"
            width="100%"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
          
          <v-card-title>{{ recipe.title }}</v-card-title>
        </v-img>

          <!-- <v-card-text>
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
                {{ recipe.id }} - {{ recipe.spoonacularScore }} ({{
                  recipe.aggregateLikes
                }})
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              $ • {{ recipe.cuisines[0] }}, {{ recipe.dishTypes[0] }}
            </div>
          </v-card-text> -->

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <router-link :to="{ name: 'recipe', params: { id: recipe.id } }">
              <v-btn color="deep-purple lighten-2" text> See Recipe </v-btn>
            </router-link>
            <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
const NUMBER_OF_RECIPES = 9;
export default {
  name: "HomeView",

  data: () => ({
    recipes: [],
    loading: false,
  }),

  components: {},

  mounted() {
    console.log("API_KEY", process.env.VUE_APP_API_KEY);
    this.loading = true;
    this.$http
      .get("recipes/random", { params: { number: NUMBER_OF_RECIPES } })
      .then(
        (recipes) => (this.recipes = recipes.data.recipes),
        (err) => console.log(err)
      )
      .finally(() => (this.loading = false));
  },
};
</script>
