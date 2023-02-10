<template>
    <div :class="['alert-notifications', alertType]" v-if="showAlert">
        <!-- TODO: deal with overflows and general style -->
        <h2 class="title">{{ title }}</h2>
        <pre class="message">{{ message }}</pre>
    </div>
</template>

<script>
    export default {
        name: "AlertNotifications",
        props: {
            title: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                default: "",
            },
            showAlert: {
                type: Boolean,
                default: false,
            },
            alertType: {
                type: String,
                default: "error",
            },
        },
    }
</script>

<style scoped>
    .alert-notifications {
        display: flex;
        position: fixed;
        top: 10px;
        right: 20px;
        flex-direction: column;
        overflow: hidden;
        align-items: center;
        text-align: center;
        justify-content: space-around;
        width: 300px;
        z-index: 4;
        border-radius: 4px;
        font-size: 12px;
        color: #fff;
        padding: 10px;
    }

    .success {
        background-color: #28a745;
    }

    .error {
        background-color: #dc3545;
    }
</style>
