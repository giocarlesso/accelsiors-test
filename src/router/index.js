import Vue from "vue"
import Router from "vue-router"
import TaskView from "../pages/TaskView.vue"
import TaskForm from "../pages/TaskForm.vue"

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "TaskView",
            component: TaskView,
        },
        {
            path: "/:task_id",
            name: "TaskFormEdit",
            component: TaskForm,
        },
        {
            path: "/create",
            name: "TaskFormCreate",
            component: TaskForm,
        },
    ],
})
