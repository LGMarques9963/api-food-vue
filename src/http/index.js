import axios from 'axios'

const API_KEY = process.env.VUE_APP_API_KEY

const http = axios.create({
    baseURL: "https://api.spoonacular.com/",
    headers: {
        'x-api-key': API_KEY
    }
})


export default http