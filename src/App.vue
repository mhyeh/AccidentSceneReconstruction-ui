<template>
    <div id='app' oncontextmenu='return false;'>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'app',
};
</script>

<style>
body {
    margin: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
</style>
