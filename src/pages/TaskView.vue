<template>
    <div class="task-view">
        <!-- GENERAL DESIGN, FOLDERS AND RESPONSIVITY -->
        <div class="task-view__header">
            <h2 class="page-title">Task view</h2>
            <img :src="require('../assets/accelsiors-logo.png')" />
        </div>
        <alert-notifications
            :title="alertData.title"
            :message="alertData.message"
            :alertType="alertData.alertType"
            :showAlert="alertData.showAlert"
        />
        <div v-if="tasks">
            <tasks-list v-if="tasks" :tasks="tasks" />
        </div>
        <div class="no-tasks" v-else>
            <p>No tasks to show</p>
        </div>
        <div class="task-view__footer">
            <router-link
                class="link-button"
                tag="button"
                :to="{ name: 'TaskFormCreate' }"
            >
                Create new task
            </router-link>
        </div>
    </div>
</template>

<script>
    import TasksList from "@/components/TasksList.vue"
    import AlertNotifications from "@/components/AlertNotifications"
    import { mapActions } from "vuex"
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
            ...mapActions({
                setTasks: "setTasks",
            }),
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
                        this.$store.dispatch("setTasks", data)
                        this.updateAlert(
                            "Success",
                            "Tasks loaded successfully",
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

<style scoped>
    .task-view {
        margin: 25px;
    }

    .page-title {
        display: flex;
        align-self: self-end;
        color: #185685;
        font-size: 36px;
        text-decoration-line: underline;
    }

    .task-view__header {
        display: flex;
        place-content: space-between;
    }

    .task-view__footer {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }

    .link-button {
        width: 120px;
        height: 50px;
        color: #fff;
        background-color: #113d6f;
        border: 1px solid #fff;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }

    .link-button:hover {
        color: #0b3666;
        background-color: #fff;
        border: 1px solid #0b3666;
    }

    .link-button:active {
        color: #fff;
        background-color: #07213d;
        border: 3px solid #07213d;
    }
</style>
