module.exports = {
    entry:  __dirname + "/app/main.js",//唯一入口文件
    output: {
      path: __dirname + "/public",//打包后的文件存放的地方
      filename: "bundle.js"//打包后输出文件的文件名
    }
  }
//   “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。

// 有了这个配置之后，只需在终端里运行webpack这条命令,会自动引用webpack.config.js文件中的配置选项