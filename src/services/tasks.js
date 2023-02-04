import api from "./index.js"

export default {
    listTasks: async () => {
        return await api.get("/getTasks")
    },

    saveTasks: async data => {
        return await api.post("/saveTask", data)
    },
}
