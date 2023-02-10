<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: "App",
    }
</script>

<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
    }

    #app {
        margin: 25px;
    }
</style>
