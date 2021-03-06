import OneButton from './one-button'
import OneDatePicker from './one-datePicker'
import OneLayout from './one-layout'

const components = [OneButton, OneDatePicker, OneLayout]
const install = (app: any) => {
    // eslint-disable-next-line no-param-reassign
    components.forEach((component) => {
        app.component(component.name, component)
    })
}
export default {
    install,
}
