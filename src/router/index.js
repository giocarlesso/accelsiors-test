import Vue from "vue"
import Router from "vue-router"
import TaskView from "../pages/TaskView.vue"
import TaskForm from "../pages/TaskForm.vue"

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/task-view",
            name: "TaskView",
            component: TaskView,
        },
        {
            path: "/task/create",
            name: "TaskFormCreate",
            component: TaskForm,
            props: { editForm: false },
        },
        {
            path: "/task/:task_id",
            name: "TaskFormEdit",
            component: TaskForm,
            props: { editForm: true },
        },

        { path: "*", redirect: { name: "TaskView" } },
    ],
})
