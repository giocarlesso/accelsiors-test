<template>
    <div class="task-view">
        <!-- GENERAL DESIGN, FOLDERS AND RESPONSIVITY -->
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
        </div>
        <router-link :to="{ name: 'TaskFormCreate' }"> Create </router-link>
    </div>
</template>

<script>
    import TasksList from "@/components/TasksList.vue"
    import AlertNotifications from "@/components/AlertNotifications"
    import TasksService from "../services/tasks"

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
                TasksService.listTasks()
                    .then(({ data }) => {
                        this.tasks = data
                        this.updateAlert(
                            "Success",
                            "Tasks loaded sucessfully",
                            "success"
                        )
                    })
                    .catch(error => {
                        this.updateAlert("Error", error.message, "error")
                    })
            },
        },
    }
</script>

<style></style>
