<template>
    <div class="loading-notification" v-if="isLoading">LOADING</div>
</template>

<script>
    export default {
        name: "LoadingNotification",
        props: {
            isLoading: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>

<style lang="scss" scoped></style>
