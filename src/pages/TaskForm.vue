<template>
    <div class="task-form">
        <div class="task-form-container">
            <!-- TODO: style these labels and put the required icon -->
            <alert-notifications
                :title="alertData.title"
                :message="alertData.message"
                :alertType="alertData.alertType"
                :showAlert="alertData.showAlert"
            />
            <div v-if="taskExists">
                <h2 class="page-title">
                    {{ editForm ? "Edit" : "Create" }} task
                </h2>
                <div class="input-group">
                    <label for="">Date</label>
                    <input class="input-form" type="date" v-model="date" />
                </div>
                <div class="input-group">
                    <label for="">Duration</label>
                    <input
                        class="input-form"
                        type="number"
                        step="0.5"
                        min="0.5"
                        max="12"
                        required
                        v-model="duration"
                    />
                </div>
                <div class="input-group">
                    <label for="">Activity</label>
                    <select class="input-form" v-model="activity">
                        <option
                            v-for="activity in activities"
                            :key="activity.id"
                        >
                            {{ activity.name }}
                        </option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="">Comment</label>
                    <textarea class="input-form" v-model="comment" />
                </div>
                <div class="task-form_buttons">
                    <!-- TODO: style these buttons -->
                    <router-link tag="button" to="/task-view"
                        >Cancel</router-link
                    >
                    <button @click="submitTask">
                        {{ editForm ? "Save" : "Create" }} task
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AlertNotifications from "@/components/AlertNotifications"
    import ActivitiesService from "../services/activities"
    import TasksService from "../services/tasks"
    import { mapGetters } from "vuex"

    export default {
        name: "TaskForm",
        components: {
            AlertNotifications,
        },

        props: {
            editForm: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                id: null,
                date: null,
                duration: null,
                activity: null,
                activities: null,
                comment: null,
                alertData: {
                    showAlert: false,
                    title: "",
                    message: "",
                    alertType: "",
                },
                errors: [],
                taskExists: true,
            }
        },

        created() {
            if (this.$store && this.getTasks.length) {
                this.fillForm()
            } else {
                this.fetchTasks()
            }
            this.fetchActivities()
        },

        computed: {
            ...mapGetters(["getTasks"]),
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
                        this.checkForParameterExistance(data)
                    })
                    .catch(error => {
                        this.updateAlert(
                            "Tasks failed to load",
                            error.message,
                            "error"
                        )
                    })
            },
            fetchActivities() {
                ActivitiesService.listActivities()
                    .then(({ data }) => {
                        this.activities = data
                    })
                    .catch(error => {
                        this.updateAlert(
                            "Activities failed do load",
                            error.message,
                            "error"
                        )
                    })
            },
            submitTask() {
                if (!this.validateForm()) {
                    return
                }

                const payload = {
                    id: this.id,
                    date: this.date,
                    duration: this.duration,
                    activity: this.activities.find(
                        activity => activity.name == this.activity
                    ),
                    comment: this.comment,
                }

                TasksService.saveTasks(payload)
                    .then(({ data }) => {
                        this.updateAlert(
                            data,
                            "Going back to the task view in 3 seconds",
                            "success"
                        )
                        setTimeout(() => {
                            this.$router.push({ path: "/task-view" })
                        }, 3000)
                    })
                    .catch(error => {
                        this.updateAlert(
                            "Task failed to save",
                            error.message,
                            "error"
                        )
                    })
            },
            fillForm(tasks = this.getTasks) {
                tasks.find(task => {
                    if (task.id == this.$route.params.task_id) {
                        this.id = task.id
                        this.date = this.convertDate(task.date)
                        this.duration = task.duration
                        this.activity = task.activity.name
                        this.comment = task.comment
                    }
                })
            },
            convertDate(date) {
                return date.split("T")[0]
            },
            validateForm() {
                this.errors = []

                if (!this.date) {
                    this.errors.push("Date is required.")
                }

                if (!this.duration) {
                    this.errors.push("Duration is required.")
                }

                if (
                    this.duration &&
                    (this.duration > 12 || this.duration < 0.5)
                ) {
                    this.errors.push("Duration must be between 0.5 and 12.")
                }

                if (this.duration && this.remainderIsNotZero(this.duration)) {
                    this.errors.push("Duration must be an increment of 0.5.")
                }

                if (!this.activity) this.errors.push("Activity is required.")

                if (this.activityExistsInThatDay()) {
                    this.errors.push("Activity must be unique in the day.")
                }

                if (this.errors.length > 0) {
                    this.updateAlert("Error", this.errors.join("\n"), "error")
                }

                return this.errors.length <= 0
            },
            remainderIsNotZero(duration) {
                return Number(duration) % 0.5 !== 0
            },
            activityExistsInThatDay() {
                return this.getTasks
                    .filter(task => task.id != this.id)
                    .some(
                        task =>
                            this.convertDate(task.date) == this.date &&
                            task.activity.name == this.activity
                    )
            },
            checkForParameterExistance(tasks) {
                const checkForParameter = tasks.some(
                    task => task.id == parseInt(this.$route.params.task_id)
                )

                if (checkForParameter) {
                    this.updateAlert(
                        "Success",
                        `Task ${this.$route.params.task_id} loaded successfully`,
                        "success"
                    )
                    this.fillForm(tasks)
                } else {
                    this.taskExists = false
                    this.updateAlert(
                        "Error",
                        `Task ${this.$route.params.task_id} does not exist

Going back to the task view in 3 seconds`,
                        "error"
                    )
                    setTimeout(() => {
                        this.$router.push({ name: "TaskView" })
                    }, 3000)
                }
            },
        },
    }
</script>

<style scoped>
    .task-form {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .task-form-container {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .task-form_buttons {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .input-form {
        box-sizing: border-box;
        height: 40px;
        border: 2px solid black;
        border-radius: 4px;
        width: 150px;
        font-size: 16px;
        padding: 8px;
        margin: 5px 0 20px 0;
    }

    .input-group {
        display: flex;
        flex-direction: column;
    }

    .input-group textarea {
        height: 200px;
        width: 300px;
    }
</style>
