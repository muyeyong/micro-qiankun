import { createApp, h } from 'vue'
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun'
import { message } from 'ant-design-vue'
import actions from './shared/actions'
import loadBaseUiComponent from './plugins/antd'
import loadOneUiComponent from './library/ui/install'
import OneUi from './library/ui'
import App from './App.vue'
import router from './router'
import store from './store'

function useMock() {
    console.log('process.env', process.env)
    if (process.env.VUE_APP_MOCK) {
        // eslint-disable-next-line global-require
        require('../mock')
    }
}
let app: any = null
const msg = {
    data: [],
    uiComponent: OneUi,
    actions,
}

function render({ appContent, loading }: { appContent?: any; loading?: any } = {}): void {
    if (!app) {
        app = createApp({
            data() {
                return {
                    content: appContent,
                    loading,
                }
            },
            render() {
                return h(App, {
                    props: {
                        content: this.content,
                        loading: this.loading,
                    },
                })
            },
        })
    } else {
        app.content = appContent
        app.loading = loading
    }
    actions.onGlobalStateChange((state, preState) => {
        console.log('new', state, 'old', preState)
        message.success(`新消息提醒：${state.message}`)
    })
    app.use(router).use(store)
    loadBaseUiComponent(app)
    loadOneUiComponent(app)
    app.mount('#contain')
}

render()
function getActiveRule(routerPrefix: string) {
    return (location: { pathname: string }) => location.pathname.startsWith(routerPrefix)
}
registerMicroApps(
    [
        {
            name: 'sub-app-code',
            entry: '//localhost:8895',
            container: '#sub-app-view',
            activeRule: getActiveRule('/code'),
            props: msg,
        },
        {
            name: 'sub-app-life',
            entry: '//localhost:8099',
            container: '#sub-app-view',
            activeRule: getActiveRule('/life'),
            props: msg,
        },
    ],
    {
        beforeLoad: [
            (currentApp) => {
                console.log('before load', currentApp)
                return Promise.resolve()
            },
        ], // 挂载前回调
        beforeMount: [
            (currentApp) => {
                console.log('before mount', currentApp)
                return Promise.resolve()
            },
        ], // 挂载后回调
        afterUnmount: [
            (currentApp) => {
                console.log('after unload', currentApp)
                return Promise.resolve()
            },
        ],
    },
)
useMock()
setDefaultMountApp('/code')
runAfterFirstMounted(() => {})
start()
