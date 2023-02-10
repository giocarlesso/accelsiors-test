<template>
    <div class="top-bar">
        <div class="top-bar__header">
            <h2 class="page-title">{{ title }}</h2>
            <img
                :src="require('../assets/accelsiors-logo.png')"
                class="logo-image"
            />
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

    .logo-image {
        max-width: 100%;
        height: auto;
    }

    @media screen and (max-width: 480px) {
        .top-bar__header {
            place-content: center;
            flex-wrap: wrap-reverse;
        }

        .logo-image {
            padding-bottom: 25px;
        }
    }
</style>
