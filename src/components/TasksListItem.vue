<template>
    <tr>
        <td class="table-data">
            <button @click="editTask()">Edit</button>
        </td>
        <td class="table-data">
            <span>{{ taskItem.date | formatDate }}</span>
        </td>
        <td class="table-data">
            <span>{{ taskItem.duration }}</span>
        </td>
        <td class="table-data">
            <span>{{ taskItem.activity.name }}</span>
        </td>
        <td class="table-data">
            <span>{{ taskItem.comment }}</span>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "TasksListItem",

        props: {
            taskItem: {
                type: Object,
                default: null,
            },
        },

        filters: {
            formatDate: date => {
                return new Date(date).toLocaleString()
            },
        },

        data() {
            return {
                activities: null,
            }
        },

        methods: {
            editTask() {
                this.$router
                    .push({
                        name: "TaskFormEdit",
                        params: { task_id: this.taskItem.id },
                    })
                    .catch(() => {})
            },
        },
    }
</script>

<style scoped>
    .table-data {
        border: 1px solid black;
        padding: 5px;
        vertical-align: initial;
    }
</style>
