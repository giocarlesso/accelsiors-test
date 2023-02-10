<template>
    <div class="task-form">
        <top-bar :title="editForm ? 'Task edit' : 'Task create'" />
        <loading-notification :is-loading="isLoading" />
        <div class="task-form-container" v-if="!isLoading">
            <div class="input-group">
                <label for="">Date <span class="required">*</span></label>
                <input class="input-form date" type="date" v-model="date" />
            </div>
            <div class="input-group">
                <label for="">Duration <span class="required">*</span></label>
                <input
                    class="input-form duration"
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    v-model="duration"
                />
            </div>
            <div class="input-group">
                <label for="">Activity <span class="required">*</span></label>
                <select class="input-form activity" v-model="activity">
                    <option disabled value="select">Select activity</option>
                    <option v-for="activity in activities" :key="activity.id">
                        {{ activity.name }}
                    </option>
                </select>
            </div>
            <div class="input-group">
                <label for="">Comment</label>
                <textarea class="input-form comment" v-model="comment" />
            </div>
            <div class="task-form__buttons">
                <!-- TODO: style these buttons -->
                <router-link
                    class="btn link-button"
                    tag="button"
                    to="/task-view"
                    >Cancel</router-link
                >
                <button @click="submitTask" class="btn submit-button">
                    {{ editForm ? "Save" : "Create" }} task
                </button>
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
    import AlertNotifications from "@/components/AlertNotifications"
    import ActivitiesService from "@/services/activities"
    import TopBar from "@/components/TopBar"
    import LoadingNotification from "@/components/LoadingNotification"
    import TasksService from "../services/tasks"
    import { mapGetters } from "vuex"

    export default {
        name: "TaskForm",
        components: {
            AlertNotifications,
            LoadingNotification,
            TopBar,
        },

        props: {
            editForm: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                isLoading: false,
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
            fetchActivities() {
                this.isLoading = true
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
                    .finally(() => (this.isLoading = false))
            },
            fetchTasks() {
                this.isLoading = true
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
                this.isLoading = false
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
                const checkForRouteParameter =
                    tasks.some(task => task.id == this.$route.params.task_id) ||
                    this.$route.fullPath === "/task-view/create"
                if (checkForRouteParameter) {
                    if (this.$route.params.task_id) {
                        this.updateAlert(
                            "Success",
                            `Task ${this.$route.params.task_id} loaded successfully`,
                            "success"
                        )
                        this.fillForm(tasks)
                    }
                } else {
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
        overflow: auto;
        width: 500px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }

    .input-form {
        box-sizing: border-box;
        height: 40px;
        border: 2px solid #185685;
        border-radius: 10px;
        font-size: 16px;
        padding: 8px;
    }

    textarea.input-form {
        height: 200px;
    }

    .input-form:focus {
        outline: none;
        border: 2px solid #be3b43;
    }

    .btn {
        height: 34px;
        width: 100px;
        border: 1px solid;
        border-radius: 4px;
        color: white;
    }

    .task-form__buttons {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .link-button {
        background-color: #be3b43;
        border: 1px solid #be3b43;
    }

    .link-button:hover {
        color: #be3b43;
        background-color: #fff;
        border: 1px solid #be3b43;
    }

    .link-button:active {
        color: #fff;
        background-color: #a13238;
        border: 3px solid #a13238;
    }

    .submit-button {
        background-color: #113d6f;
        border: 1px solid #113d6f;
    }

    .submit-button:hover {
        color: #0b3666;
        background-color: #fff;
        border: 1px solid #0b3666;
    }

    .submit-button:active {
        color: #fff;
        background-color: #07213d;
        border: 3px solid #07213d;
    }

    .required {
        color: #be3b43;
    }

    @media (max-width: 600px) {
        .task-form-container {
            width: 90vw;
        }
    }
</style>
