<template>
  <v-container class="d-flex flex-start flex-wrap my-12">
    <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="deep-purple accent-4"
      ></v-progress-linear>
      <v-col width="25%"
        ><v-card class="mx-auto" max-width="250">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>Filtro</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="$refs.search.focus()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>

          <v-container class="py-0">
            <v-row align="center" justify="start">
              <v-col v-if="!allSelected" cols="12">
                <v-text-field
                  ref="search"
                  v-model="search"
                  full-width
                  hide-details
                  label="O que está procurando..."
                  prepend-inner-icon="mdi-magnify"
                  single-line
                ></v-text-field>
              </v-col>
              <v-col
                v-for="(selection, i) in selections"
                :key="selection.text"
                class="shrink"
              >
                <v-chip
                  :disabled="loading"
                  close
                  @click:close="selected.splice(i, 1)"
                >
                  <v-icon left v-text="selection.icon"></v-icon>
                  {{ selection.text }}
                </v-chip>
              </v-col>
            </v-row>
          </v-container>

          <v-divider v-if="!allSelected"></v-divider>

          <v-list>
            <template v-for="item in categories">
              <v-list-item
                v-if="!selected.includes(item)"
                :key="item.text"
                :disabled="loading"
                @click="selected.push(item)"
                justify="left"
              >
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item>
            </template>
          </v-list>

          <v-divider></v-divider> </v-card
      ></v-col>
      <v-col width="75%" cols="10" class="d-flex flex-wrap">
        <v-col :key="card.title" :cols="4" v-for="card in cards">
          <v-card>
            <v-img
              :src="card.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
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
export default {
  data: () => ({
    cards: [],
    items: [
      {
        text: "Culinária",
        icon: "mdi-nature",
      },
      {
        text: "Dieta",
        icon: "mdi-glass-wine",
      },
      {
        text: "Intolerâncias",
        icon: "mdi-calendar-range",
      },
      {
        text: "Tipo",
        icon: "mdi-map-marker",
      },
      {
        text: "Biking",
        icon: "mdi-bike",
      },
    ],
    loading: false,
    search: "",
    selected: [],
  }),

  components: {},

  mounted() {
    console.log(this.$route.params.id);
    this.search = this.$route.params.id;
    this.complexSearch()
  },

  computed: {
    allSelected() {
      return this.selected.length === this.items.length;
    },
    categories() {
      const search = this.search.toLowerCase();

      if (!search) return this.items;

      return this.items;
    },
    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(selection);
      }

      return selections;
    },
  },

  watch: {
    search(val) {
      if (this.loading) return;

      if (val) {
        this.complexSearch();
      }
    }
  },

  methods: {
    next() {
      this.loading = true;

      setTimeout(() => {
        this.search = "";
        this.selected = [];
        this.loading = false;
      }, 2000);
    },

    complexSearch() {
      if (this.loading) return;

      this.loading = true;
      this.$http
      .get("recipes/complexSearch", {
        params: { number: 10, query: this.search },
      })
      .then(
        (recipes) => (this.cards = recipes.data.results),
        (err) => console.log(err)
      )
      .finally(() => this.loading = false);
    }
  },
};
</script>