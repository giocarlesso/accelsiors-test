import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/store"

Vue.config.productionTip = false

//FIXME: deal with CORS?

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
})
