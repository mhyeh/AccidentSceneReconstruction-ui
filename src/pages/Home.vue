<template>
    <div id='block'>
        <p>
            <input placeholder='Project Name' v-model="projectName">
        </p>
        <p>
            <button @click="submit"> Submit </button>
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            projectName: ''
        };
    },
    methods: {
        submit () {
            this.$router.push(`project/${this.projectName}`);
        }
    }
};
</script>

<style scoped>
#block {
    margin-top: 20%;
}

input {
    border-radius: 20px;
    height: 50px;
    width: 400px;
    font-size: 30px;
    text-align: center;
}

button {
    margin-top: 50px;
    border-radius: 20px;
    height: 50px;
    width: 300px;
    font-size: 30px;
    color: aliceblue;
    background-color: rgb(0, 102, 255);

}
</style>
