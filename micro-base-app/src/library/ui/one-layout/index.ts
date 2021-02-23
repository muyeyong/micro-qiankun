import oneLayout from './index.vue'

oneLayout.install = (app: any) => {
    app.component(oneLayout.name, oneLayout)
}

export default oneLayout
