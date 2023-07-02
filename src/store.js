import Vuex from 'vuex'
import Vue from 'vue'
import http from '@/http'

Vue.use(Vuex)

const NUMBER_OF_RECIPES = 8

const actions = {
    getRandomRecipes() {
        return new Promise((resolve, reject) => {
            http.get('recipes/random', {number: NUMBER_OF_RECIPES})
                .then(response => resolve(response.json()))
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}

export default new Vuex.Store({
    actions
})