<template>
    <tr>
        <td class="table-data">
            <router-link
                :to="{
                    name: 'TaskFormEdit',
                    params: { task_id: taskItem.id },
                }"
                >Edit</router-link
            >
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
    // import { format } from "date-fns"
    export default {
        name: "TasksListItem",

        props: {
            taskItem: {
                type: Object,
                default: null,
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
