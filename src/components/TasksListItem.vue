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
    export default {
        name: "TasksListItem",

        props: {
            taskItem: {
                type: Object,
                default: null,
            },
        },
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
        border: 1px solid black;
        padding: 5px;
        vertical-align: initial;
    }
</style>
