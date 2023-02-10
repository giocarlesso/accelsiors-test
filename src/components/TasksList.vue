<template>
    <div class="tasks-list">
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
            <tbody v-else class="table-body-empty">
                No tasks to show...
            </tbody>
        </table>
    </div>
</template>

<script>
    import TasksListItem from "@/components/TasksListItem"

    export default {
        name: "TasksList",

        components: {
            TasksListItem,
        },

        props: {
            tasks: {
                type: Array,
                default: null,
            },
        },
    }
</script>

<style scoped>
    .tasks-list {
        padding-top: 20px;
    }

    #table {
        width: 100%;
        border-collapse: collapse;
    }

    .table-header {
        border: 1px solid #ddd;
        background-color: #185685;
        color: #fff;
        padding: 15px 5px;
    }

    .table-body-empty:before {
        content: "";
        display: block;
        height: 25px;
    }
</style>
