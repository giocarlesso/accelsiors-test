<template>
    <div class="task-form">
        <h2>{{ $route.params.task_id ? "Edit" : "Create" }}</h2>
        <input type="date" v-model="date" />
        <input type="number" step="0.5" min="0.5" max="12" v-model="duration" />
        <select v-model="activity">
            <option v-for="activity in activities" :key="activity.id">
                {{ activity.name }}
            </option>
        </select>
        <textarea v-model="comment" />
    </div>
</template>

<script>
    export default {
        name: "TaskForm",

        data() {
            return {
                activities: null,
                date: null,
                duration: null,
                activity: null,
                comment: null,
            }
        },

        created() {
            this.fetchActivities()
            if (this.$route.params.task_id) {
                this.fetchTasks()
            }
        },

        methods: {
            fetchActivities() {
                this.$http
                    .get("http://localhost:8888/test/getActivities")
                    .then(({ data }) => {
                        this.activities = data
                    })
                    .catch(error => {
                        //TODO: show error message on the screen
                        //TODO: make a service for the requests?
                        console.log(error)
                    })
            },
            fetchTasks() {
                this.$http
                    .get("http://localhost:8888/test/getTasks")
                    .then(({ data }) => {
                        const task = data.find(
                            task => task.id === this.$route.params.task_id
                        )
                        this.fillForm(task)
                    })
                    .catch(error => {
                        //TODO: show error message on the screen
                        //TODO: make a service for the requests?
                        console.log(error)
                    })
            },
            fillForm(task) {
                this.date = this.convertDate(task.date)
                this.duration = task.duration
                this.activity = task.activity.name
                this.comment = task.comment
            },
            convertDate(date) {
                date = new Date(date)
                const offset = date.getTimezoneOffset()
                date = new Date(date.getTime() - offset * 60 * 1000)
                return date.toISOString().split("T")[0]
            },
        },
    }
</script>

<style scoped></style>
