<template>
    <div class="loading-notification" v-if="isLoading">
        <div class="load" />
    </div>
</template>

<script>
    export default {
        name: "LoadingNotification",
        props: {
            isLoading: {
                type: Boolean,
                default: false,
                required: true,
            },
        },
    }
</script>

<style scoped>
    .loading-notification {
        display: flex;
        align-content: center;
        justify-content: center;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes rotate {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    .load {
        width: 100px;
        height: 100px;
        margin: 110px auto 0;
        border: solid 10px #be3b43;
        border-radius: 50%;
        border-right-color: transparent;
        border-bottom-color: transparent;
        -webkit-transition: all 0.5s ease-in;
        -webkit-animation-name: rotate;
        -webkit-animation-duration: 1s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;

        transition: all 0.5s ease-in;
        animation-name: rotate;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
</style>
