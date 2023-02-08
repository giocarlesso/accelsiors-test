<template>
    <tr class="row">
        <td class="table-data">
            <router-link
                class="link-button"
                tag="button"
                :to="{
                    name: 'TaskFormEdit',
                    params: { task_id: taskItem.id },
                }"
                >Edit</router-link
            >
        </td>
        <td class="table-data">
            <span class="date">{{ taskItem.date | formatDate }}</span>
        </td>
        <td class="table-data">
            <span class="duration">{{ formatDuration }}</span>
        </td>
        <td class="table-data">
            <span class="activity">{{ taskItem.activity.name }}</span>
        </td>
        <td class="table-data">
            <span class="comment">{{ taskItem.comment }}</span>
        </td>
    </tr>
</template>

<script>
    import { formatDate } from "@/filters"
    export default {
        name: "TasksListItem",

        props: {
            taskItem: {
                type: Object,
                default: null,
            },
        },

        filters: { formatDate },

        computed: {
            formatDuration() {
                const duration = this.taskItem.duration
                if (duration == "0.5") {
                    return "30 minutes"
                } else if (duration == "1") {
                    return duration + " hour"
                }
                return duration + " hours"
            },
        },
    }
</script>

<style scoped>
    .table-data {
        padding: 5px;
    }

    .row:nth-child(even) {
        background-color: #f2f2f2;
    }

    .row:hover {
        background-color: #ddd;
    }

    .table-data {
        text-align: center;
    }

    .link-button {
        width: 50px;
        height: 28px;
        color: #113d6f;
        background-color: #fff;
        border: 1px solid #113d6f;
        border-radius: 4px;
        cursor: pointer;
    }

    .link-button:hover {
        color: #fff;
        background-color: #0b3666;
        border: 3px solid #0b3666;
    }

    .link-button:active {
        color: #fff;
        background-color: #07213d;
        border: 3px solid #07213d;
    }
</style>
