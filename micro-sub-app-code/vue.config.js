const path = require("path")

const port = 8895
const vueSrc = "./src"
function resolve (dir) {
  return path.join(__dirname, "./", dir)
}

module.exports = {
  chainWebpack: config => {
    config.plugin("define").tap(args => {
      const { argv } = process
      const icourt = argv[argv.indexOf("--icourt-mode") + 1]

      // eslint-disable-next-line no-param-reassign
      args[0]["process.env"].MODE = `"${icourt}"`

      return args
    })
    // svg rule loader
    const svgRule = config.module.rule("svg") // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule("images")
    imagesRule.exclude.add(resolve("src/icons"))
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
      .set('plugins', resolve('src/plugins'))

  },
  publicPath: '/',
  outputDir: "dist",
  assetsDir: "assets",
  configureWebpack: {
    devServer: {
      open: true,
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: 'sub-app-code',
      libraryTarget: 'umd'
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, vueSrc)
      },
      extensions: [".js", ".vue", ".json"]
    },
  },
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  }
}
