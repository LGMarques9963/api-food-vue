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
          <!-- <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating> -->
        </v-row>

        <div class="my-4 text-subtitle-1">
          Preparo: {{ recipe.readyInMinutes }} minutos |
          <v-divider vertical></v-divider>
          Rendimento: {{ recipe.servings }} porções | Preço por Porção:
          {{ recipe.pricePerServing }} $
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Modo de Preparo</v-card-title>
      <div>
        <ul v-for="step in recipe.analyzedInstructions" :key="step">
          <li v-for="s in step.steps" :key="s">{{ s.step }}</li>
        </ul>
      </div>
      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>5:30PM</v-chip>

          <v-chip>7:30PM</v-chip>

          <v-chip>8:00PM</v-chip>

          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text> Reserve </v-btn>
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
    };
  },
  mounted() {
    if (this.id) {
      this.$http.get(`recipes/${this.id}/information`).then(
        (recipe) => (this.recipe = recipe.data),
        (err) => console.log(err)
      );
    }
  },
};
</script>