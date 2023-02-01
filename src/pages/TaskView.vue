<template>
    <div class="task-view">
        <alert-notifications
            :title="alertData.title"
            :message="alertData.message"
            :alertType="alertData.alertType"
            :showAlert="alertData.showAlert"
        />
        <div v-if="tasks">
            <tasks-list v-if="tasks" :tasks="tasks" />
        </div>
        <div v-else>
            <p>No tasks to show</p>
            <button @click="createTask()">New Task</button>
        </div>
    </div>
</template>

<script>
    import TasksList from "@/components/TasksList.vue"
    import AlertNotifications from "@/components/AlertNotifications"

    export default {
        name: "TaskView",

        components: {
            TasksList,
            AlertNotifications,
        },
        data() {
            return {
                tasks: null,
                alertData: {
                    showAlert: false,
                    title: "",
                    message: "",
                    alertType: "",
                },
            }
        },

        created() {
            this.fetchTasks()
        },

        methods: {
            updateAlert(title, message, alertType) {
                this.alertData = { title, message, alertType, showAlert: true }

                setTimeout(() => {
                    this.alertData.showAlert = false
                }, 3000)
            },
            fetchTasks() {
                this.$http
                    .get("http://localhost:8888/test/getTasks")
                    .then(({ data }) => {
                        this.tasks = data
                        this.updateAlert(
                            "Success",
                            "Tasks loaded sucessfully",
                            "success"
                        )
                    })
                    .catch(error => {
                        //TODO: make a service for the requests?
                        this.updateAlert("Error", error.message, "error")
                    })
            },

            createTask() {
                this.$router.push({ name: "TaskFormCreate" }).catch(() => {})
            },
        },
    }
</script>

<style></style>
