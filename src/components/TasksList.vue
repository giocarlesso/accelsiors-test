<template>
    <div class="tasks-list">
        <h2>Activities List</h2>
        <table id="table">
            <thead class="table-head">
                <tr class="table-row-header">
                    <th class="table-header">Actions</th>
                    <th class="table-header">Date</th>
                    <th class="table-header">Duration</th>
                    <th class="table-header">Activity name</th>
                    <th class="table-header">Comment</th>
                </tr>
            </thead>
            <tbody v-if="tasks.length > 0" class="table-body">
                <tasks-list-item
                    v-for="task in tasks"
                    :key="task.id"
                    :task-item="task"
                />
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import TasksListItem from "@/components/TasksListItem"

    export default {
        name: "TasksList",

        components: {
            TasksListItem,
        },

        computed: {
            ...mapGetters({
                tasks: "getTasks",
            }),
        },
    }
</script>

<style scoped>
    #table-container {
        overflow-x: auto;
    }

    #table {
        width: 100%;
        border-collapse: collapse;
    }

    .table-header {
        border: 1px solid black;
        padding: 15px 5px;
    }

    .table-data {
        border: 1px solid black;
        padding: 5px;
        vertical-align: initial;
    }
</style>
