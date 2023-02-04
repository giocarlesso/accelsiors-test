import Vue from "vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

//FIXME: deal with CORS?

Vue.filter("formatDate", date => {
    return date.split("T")[0]
})

new Vue({
    el: "#app",
    router,
    render: h => h(App),
})
