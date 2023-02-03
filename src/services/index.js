import axios from "axios"

//Globally calling axios and creating some services to reduce amount of code and proporcionate

const api = axios.create({
    baseURL: "http://localhost:8888/test/",
    headers: {
        "Content-Type": "application/json",
    },
})

export default api
