<template>
    <tr>
        <td class="table-data">
            <button @click="editTask()">Edit</button>
        </td>
        <td class="table-data">
            <input v-if="isEditing" type="date" />
            <span v-else>{{ taskItem.date | formatDate }}</span>
        </td>
        <td class="table-data">
            <input v-if="isEditing" type="number" />
            <span v-else>{{ taskItem.duration }}</span>
        </td>
        <td class="table-data">
            <input v-if="isEditing" type="text" />
            <span v-else>{{ taskItem.activity.name }}</span>
        </td>
        <td class="table-data">
            <textarea v-if="isEditing" />
            <span v-else>{{ taskItem.comment }}</span>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "TaskItem",

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
                isEditing: false,
            }
        },

        methods: {
            editTask() {
                this.isEditing = true
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
