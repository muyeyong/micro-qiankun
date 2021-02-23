import { Button, Layout, DatePicker, Menu, message } from 'ant-design-vue'

const components = [Button, Layout, DatePicker, Menu, message]

const loadBaseUiComponent = (app: { use: Function }) => {
    components.forEach((component) => {
        app.use(component)
    })
}

export default loadBaseUiComponent
