<template>
    <div class="hello">
        <h1>上帝说我帅得很</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: String,
    },
    created() {
        this.login()
    },
    methods: {
        login() {
            axios
                .post('/devApi/getSms/', {
                    name: 'xy',
                    pw: '123456',
                })
                .then((res) => {
                    console.log(res)
                })
        },
    },
})
</script>

<style scoped lang="less">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
