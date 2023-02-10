<template>
    <div class="task-view">
        <top-bar title="Task view" />
        <loading-notification :is-loading="isLoading" />
        <div class="task-view__body" v-if="!isLoading">
            <router-link
                class="btn link-button"
                tag="button"
                :to="{ name: 'TaskFormCreate' }"
            >
                Create new task
            </router-link>
            <div v-if="!isLoading">
                <tasks-list :tasks="tasks" />
            </div>
        </div>
        <alert-notifications
            :title="alertData.title"
            :message="alertData.message"
            :alertType="alertData.alertType"
            :showAlert="alertData.showAlert"
        />
    </div>
</template>

<script>
    import TasksList from "@/components/TasksList.vue"
    import AlertNotifications from "@/components/AlertNotifications"
    import LoadingNotification from "@/components/LoadingNotification.vue"
    import TopBar from "@/components/TopBar.vue"
    import TasksService from "@/services/tasks"
    import { mapActions } from "vuex"

    export default {
        name: "TaskView",

        components: {
            TasksList,
            AlertNotifications,
            LoadingNotification,
            TopBar,
        },
        data() {
            return {
                isLoading: false,
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
                this.isLoading = true
                TasksService.listTasks()
                    .then(({ data }) => {
                        this.tasks = data
                        this.$store.dispatch("setTasks", data)
                        this.updateAlert(
                            "Success",
                            `${data.length} tasks loaded successfully`,
                            "success"
                        )
                    })
                    .catch(error => {
                        this.updateAlert(
                            "Tasks failed to load",
                            error.message,
                            "error"
                        )
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            },
        },
    }
</script>

<style scoped>
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
