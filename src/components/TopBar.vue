<template>
    <div class="top-bar">
        <div class="top-bar__header">
            <h2 class="page-title">{{ title }}</h2>
            <img :src="require('../assets/accelsiors-logo.png')" />
        </div>
        <hr class="top-bar__separator" />
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style scoped>
    .top-bar {
        width: 100%;
        margin-top: 25px;
    }

    .top-bar__header {
        display: flex;
        place-content: space-between;
    }

    .page-title {
        display: flex;
        align-self: self-end;
        color: #185685;
        font-size: 36px;
    }

    .top-bar__separator {
        margin: 25px 0;
    }
</style>
