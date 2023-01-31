<template>
    <div v-if="tasks">
        <tasks-list :tasks="tasks" />
        <button @click="createTask()">New Task</button>
    </div>
</template>

<script>
    import TasksList from "@/components/TasksList.vue"

    export default {
        name: "TaskView",

        components: {
            TasksList,
        },
        data() {
            return {
                tasks: null,
            }
        },

        created() {
            this.fetchTasks()
        },

        methods: {
            fetchTasks() {
                this.$http
                    .get("http://localhost:8888/test/getTasks")
                    .then(({ data }) => {
                        this.tasks = data
                    })
                    .catch(error => {
                        //TODO: show error message on the screen
                        //TODO: make a service for the requests?
                        console.log(error)
                    })
            },

            createTask() {
                this.$router.push({ name: "TaskFormCreate" }).catch(() => {})
            },
        },
    }
</script>

<style></style>
