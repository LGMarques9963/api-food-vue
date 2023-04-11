import axios from 'axios'

const API_KEY = "8ecda0e43b5744a0af5125a6ed250e11"

const http = axios.create({
    baseURL: "https://api.spoonacular.com/",
    headers: {
        'x-api-key': API_KEY
    }
})


export default http