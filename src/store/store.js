import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tasks: [],
    },
    actions: {
        setTasks({ commit }, tasks) {
            commit("SET_TASKS", tasks)
        },
    },
    mutations: {
        ["SET_TASKS"](state, value) {
            state.tasks = value
        },
    },
    getters: {
        getTasks: ({ tasks }) => {
            return tasks
        },
    },
})

export default store
