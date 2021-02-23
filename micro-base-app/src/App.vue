<template>
    <section class="main">
        <a-layout
            id="components-layout-demo-custom-trigger"
            :style="{
                height: '100%',
            }"
        >
            <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
                <div class="logo" />
                <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys">
                    <a-sub-menu v-for="parent in menuList" :key="parent.id">
                        <template #title>
                            <span>
                                <UserOutlined /><span>{{ parent.title }}</span>
                            </span>
                        </template>
                        <a-menu-item v-for="child in parent.children" :key="child.id" @click="toDetail(child)">{{ child.title }}</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0" class="layout-header">
                    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                </a-layout-header>
                <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                    <div class="sub-app-view" id="sub-app-view" style="height: 100%"></div>
                </a-layout-content>
            </a-layout>
        </a-layout>
        <router-view />
    </section>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import actions from './shared/actions'

interface menuItem {
    id: string
    title: string
    url: string
}
interface menu {
    id: string
    title: string
    localEntry: string
    children?: Array<menuItem>
}

export default defineComponent({
    name: 'base-app',
    components: { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined },
    data() {
        return {
            selectedKeys: ['1'],
            collapsed: false,
            menuList: [] as Array<menu>,
        }
    },
    created() {
        this.login()
        this.getMenuList()
    },
    methods: {
        getMenuList() {
            axios.post('/devApi/auth/').then((res) => {
                this.menuList = []
                if (res.data.data) {
                    this.menuList = res.data.data
                    console.log('menuList', this.menuList)
                }
            })
        },
        getMenuTemplate(): string {
            // todo 动态生成菜单列表需要完善
            const template = this.menuList.reduce((x, y) => {
                let menuStr = ''
                if (y.children && y.children.length > 0) {
                    menuStr = `<a-sub-menu key="${y.id}">
                               <template #title>
                              <span><MailOutlined /><span>${y.title}</span></span>
                               </template>`
                    y.children.forEach((item) => {
                        menuStr += `<a-menu-item key="${item.id}">${item.title}</a-menu-item>`
                    })
                    menuStr += `</a-sub-menu>`
                } else {
                    menuStr = ` <a-menu-item key="${y.id}">
                                 <InboxOutlined />
                                <span>${y.title}</span>
                                 </a-menu-item>`
                }
                return x + menuStr
            }, ``)
            return template
        },
        login() {
            axios
                .post('/devApi/getSms/', {
                    name: 'xy',
                    pw: '123456',
                })
                .then((res) => {
                    const { data } = res
                    actions.setGlobalState({ message: data.message })
                })
        },
        toDetail(child: menuItem) {
            this.$router.replace(child.url)
        },
    },
})
</script>
<style lang="less">
#contain {
    width: 100%;
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
<style lang="less" scoped>
.function {
    .foo(@x) {
        return: @x * 2;
    }
}
.main {
    width: 100%;
    height: 100%;
    .layout-header {
        display: flex;
        align-content: center;
    }
    .ant-layout-content {
        .sub-app-view div {
            height: 100%;
        }
    }
}
</style>
