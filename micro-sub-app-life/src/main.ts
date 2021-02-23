/* eslint-disable no-underscore-dangle */
import { createApp } from 'vue'
import loadBaseUiComponent from './plugins/antd'
import loadOneUiComponent from './library/ui/install'
import './utils/micro/public-path'
import App from './App.vue'
import router from './router'
import actions from './shared/actions'
import store from './store'

let instance: any = null
export async function bootstrap(props = {}) {
    console.log(props)
}
export async function mount(props: any) {
    console.log(props)
    if (props.actions) {
        actions.setActions(props.actions)
    }
    instance = createApp(App)
        .use(router)
        .use(store)
    loadBaseUiComponent(instance)
    loadOneUiComponent(instance)
    instance.mount('#sub-app-code')
}
export async function unmount() {
    instance.$destroy?.()
    instance = null
}

// eslint-disable-next-line no-unused-expressions
window.__POWERED_BY_QIANKUN__ || mount({})
