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
                <task-item
                    v-for="task in tasks"
                    :key="task.id"
                    :task-item="task"
                />
            </tbody>

            <tr v-else id="no-data">
                <td colspan="5">Table is em</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import TaskItem from "@/components/TaskItem"

    export default {
        name: "TasksList",

        components: {
            TaskItem,
        },
        props: {
            tasks: {
                type: Array,
                default: null,
            },
        },

        data() {
            return {
                isEditing: false,
            }
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
