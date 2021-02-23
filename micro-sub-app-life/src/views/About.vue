<template>
    <div class="about">
        <h1>Life about page</h1>
        <a-input size="small" placeholder="全局发布消息" style="width: 200px" @pressEnter="sendMessage" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import actions from '../shared/actions'

export default defineComponent({
    name: 'About',
    methods: {
        sendMessage(e: any) {
            actions.setGlobalState({ message: e.target.value })
        },
    },
})
</script>
