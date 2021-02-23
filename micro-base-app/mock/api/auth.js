import Mock from '../utils/mock'

const subApps = [
  {
    id: "1",
    title: "我的代码",
    icon: "code",
    module: "subapp-ui",
    defaultRegister: true,
    localEntry: "//localhost:8895",
    devEntry: "",
    routerBase: "/code",
    children: [
      {
        id: "1-1",
        title: "home",
        url: "/code"
      },
      {
        id: "1-2",
        title: "about",
        url: "/code/about"
      }
    ]
  },
  {
    id: "2",
    title: "生活快照",
    icon: "el-icon-date",
    module: "subapp-blog",
    defaultRegister: false,
    devEntry: "//localhost:8099",
    depEntry: "",
    routerBase: "/life",
    children: [
      {
        id: "2-1",
        title: "home",
        url: "/life"
      },
      {
        id: "2-2",
        title: "about",
        url: "/life/about"
      }
    ]
  }
]
// 获取菜单
// eslint-disable-next-line no-unused-vars
Mock.mock('/devApi/auth/', 'post', options => ({
  resCode: 0,
  data: subApps,
}))
