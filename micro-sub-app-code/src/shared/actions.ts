// function emptyAction() {
//     // 警告：提示当前使用的是空 Action
//     console.warn('Current execute action is empty!')
// }

class Actions {
    // 默认值为空 Action
    actions = {
        onGlobalStateChange: (args: any) => args,
        setGlobalState: (args: any) => args,
    }

    /**
     * 设置 actions
     */
    // eslint-disable-next-line no-unused-vars
    setActions(actions: { onGlobalStateChange: (args: any) => any; setGlobalState: (args: any) => any }) {
        this.actions = actions
    }

    /**
     * 映射
     */
    onGlobalStateChange(args: any) {
        return this.actions.onGlobalStateChange({ ...args })
    }

    /**
     * 映射
     */
    setGlobalState(args: any) {
        return this.actions.setGlobalState({ ...args })
    }
}

const actions = new Actions()
export default actions
