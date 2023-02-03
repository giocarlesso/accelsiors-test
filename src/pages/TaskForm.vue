<template>
    <div class="task-form">
        <div class="task-form-container">
            <!-- TODO: style these labels and put the required icon -->
            <h2>{{ editForm ? "Edit" : "Create" }} task</h2>
            <alert-notifications
                :title="alertData.title"
                :message="alertData.message"
                :alertType="alertData.alertType"
                :showAlert="alertData.showAlert"
            />
            <div class="input-group">
                <label for="">Date</label>
                <input class="input-form" type="date" v-model="date" required />
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
                    <option v-for="activity in activities" :key="activity.id">
                        {{ activity.name }}
                    </option>
                </select>
            </div>
            <div class="input-group">
                <label for="">Comment</label>
                <textarea class="input-form" v-model="comment" />
            </div>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </p>
            <div class="task-form_buttons">
                <!-- TODO: style these buttons -->
                <router-link to="/task-view">Cancel</router-link>
                <button @click.prevent="onSubmit">
                    {{ editForm ? "Save" : "Create" }} task
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import AlertNotifications from "@/components/AlertNotifications"
    import TasksService from "../services/tasks"
    import ActivitiesService from "../services/activities"

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
                activities: null,
                tasks: null,
                errors: [],
                id: null,
                date: null,
                duration: null,
                activity: null,
                comment: null,
                alertData: {
                    showAlert: false,
                    title: "",
                    message: "",
                    alertType: "",
                },
            }
        },

        created() {
            this.fetchActivities()

            if (this.editForm) {
                this.fetchTasks()
            }
        },

        methods: {
            updateAlert(title, message, alertType) {
                this.alertData = { title, message, alertType, showAlert: true }

                setTimeout(() => {
                    this.alertData.showAlert = false
                }, 3000)
            },
            fetchActivities() {
                    ActivitiesService.listActivities()
                    .then(({ data }) => {
                        this.activities = data
                    })
                    .catch(error => {
                        this.updateAlert(
                            "Error",
                            `Activities failed do load\n ${error.message}`,
                            "error"
                        )
                    })
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
                        this.fillForm()
                    })
                    .catch(error => {
                        this.updateAlert("Error", error.message, "error")
                    })
            },
            onSubmit() {
                if (!this.validateForm()) {
                    return
                }

                const payload = {
                    id: this.id,
                    date: this.date,
                    duration: this.duration,
                    activity: this.activities.find(
                        act => act.name == this.activity
                    ),
                    comment: this.comment,
                }

                this.$http
                    .post("http://localhost:8888/test/saveTask", payload, {
                        
                    })
                    .then(() => {
                        this.updateAlert(
                            "Success",
                            "Task successfully saved",
                            "success"
                        )
                    })
                    .catch(error => {
                        //TODO: make a service for the requests?
                        this.updateAlert("Error", error.message, "error")
                    })
                    .finally(this.$router.go(-1))
            },
            fillForm() {
                this.tasks.find(task => {
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
                date = new Date(date)
                const offset = date.getTimezoneOffset()
                date = new Date(date.getTime() - offset * 60 * 1000)
                return date.toISOString().split("T")[0]
            },
            validateForm() {
                this.errors = []

                if (!this.date) {
                    this.errors.push("Date is required.")
                }

                if (!this.duration) {
                    this.errors.push("Duration is required.")
                }
                if (this.duration > 12 || this.duration < 0.5) {
                    this.errors.push("Duration must be between 0.5 and 12.")
                }
                if (
                    this.duration &&
                    !this.validateDurationSteps(this.duration)
                ) {
                    this.errors.push("Duration must be an increment of 0.5.")
                }
                if (!this.activity) this.errors.push("Activity is required.")

                //TODO: unique activity on the day

                if(this.errors.length > 0) {
                    this.updateAlert("Error", this.errors.join("\n"), "error")
                }

                return this.errors.length <= 0
            },
            validateDurationSteps(duration) {
                return duration % 0.5 == 0
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
