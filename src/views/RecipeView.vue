<template>
  <v-container class="d-flex flex-start flex-wrap">
    <v-card :loading="loading" class="mx-auto" width="60%">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img :src="recipe.image"></v-img>

      <v-card-title>{{ recipe.title }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="my-4 text-subtitle-1">
            Preparo: {{ recipe.readyInMinutes }} minutos |
            <v-divider vertical></v-divider>
            Rendimento: {{ recipe.servings }} porções | Preço por Porção:
            {{ recipe.pricePerServing }} $
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1"></div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-container class="d-flex">
        <v-card elevation="0" width="25%">
          <v-card-title tag="center">Ingredientes</v-card-title>
          <div align="left" class="my-4 text-subtitle-1">
            <ul v-for="step in recipe.extendedIngredients" :key="step">
              <li>{{ step.original }}</li>
            </ul>
          </div>
        </v-card>
        <v-divider class="mx-4" vertical></v-divider>
        <v-card elevation="0" width="75%">
          <v-card-title>Modo de Preparo</v-card-title>
          <div align="left" class="my-4 text-subtitle-1">
            <ul v-for="step in recipe.analyzedInstructions" :key="step">
              <li v-for="s in step.steps" :key="s">{{ s.step }}</li>
            </ul>
          </div>

          <v-card-text> </v-card-text>
        </v-card>
      </v-container>

      <v-card-actions
        ><router-link :to="{ name: 'home' }">
          <v-btn color="deep-purple lighten-2" text> Voltar </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      recipe: {},
      id: this.$route.params.id,
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    if (this.id) {
      this.$http
        .get(`recipes/${this.id}/information`)
        .then(
          (recipe) => (this.recipe = recipe.data),
          (err) => console.log(err)
        )
        .finally(() => (this.loading = false));
    }else{
      this.$route.push({name: "home"})
    }
  },
};
</script>