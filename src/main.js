import Vue from "vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

////FIXME: deal with CORS?

new Vue({
    el: "#app",
    router,
    render: h => h(App),
})
