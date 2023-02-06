import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/store"

Vue.config.productionTip = false

//FIXME: deal with CORS?

Vue.filter("formatDate", date => {
    //TODO: search stuff about timezone offset
    return date.split("T")[0]
})

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
})
