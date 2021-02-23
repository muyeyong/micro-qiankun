import { Button, Layout, DatePicker, Input } from 'ant-design-vue'

const components = [Button, Layout, DatePicker, Input]

const loadBaseUiComponent = (app: { use: Function }) => {
    components.forEach((component) => {
        app.use(component)
    })
}

export default loadBaseUiComponent
