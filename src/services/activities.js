import api from "."

export default {
    listActivities: async () => {
        return await api.get("/getActivities")
    },
}
