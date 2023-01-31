<template>
    <div v-if="tasks">
        <tasks-list :tasks="tasks" />
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
            this.$http
                .get("http://localhost:8888/test/getTasks")
                //FIXME: adjust CORS message
                .then(({ data }) => {
                    this.tasks = data
                    // console.log(this.tasks)
                })
                .catch(error => {
                    //TODO: show error message on the screen
                    //TODO: make a service for the requests?
                    console.log(error)
                })
        },
    }
</script>

<style></style>
