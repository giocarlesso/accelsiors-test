import Vue from "vue"
import App from "./App.vue"
import Axios from "axios"
import router from "./router"

Vue.config.productionTip = false

Vue.prototype.$http = Axios

////FIXME: deal with CORS?

new Vue({
    el: "#app",
    router,
    render: h => h(App),
})
