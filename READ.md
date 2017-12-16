## 在终端中使用webpack
webpack {entry file} {destination for bundled file}
如果webpack不是全局安装的，那么当在终端中使用此命令时，需要额外指定其在node_modules中的地址
node_modules/.bin/webpack app/main.js public/bundle.js

## 通过配置文件来使用Webpack
根目录下新建一个名为webpack.config.js的文件
```
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```

## 更快捷的执行打包任务
npm可以引导任务执行，在package.json中对scripts对象进行相关设置
```
{
  "name": "webpack-sample-project",
  "version": "1.0.0",
  "description": "Sample webpack project",
  "scripts": {
    "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
  },
  "author": "zhang",
  "license": "ISC",
  "devDependencies": {
    "webpack": "3.10.0"
  }
}
```
package.json中的script会安装一定顺序寻找命令对应位置，本地的node_modules/.bin路径就在这个寻找清单中，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。

npm的start命令是一个特殊的脚本名称，其特殊性表现在，在命令行中使用npm start就可以执行其对于的命令，如果对应的此脚本名称不是start，想要在命令行中运行时，需要这样用npm run {script name}如npm run build

# Webpack的强大功能
## 生成Source Maps（使调试更容易）
提供了一种对应编译文件和源文件的方法，在webpack的配置文件中配置source maps，需要配置devtool
四个选项 source-map cheap-module-source-map eval-source-map cheap-module-eval-source-map
对小到中型的项目中，eval-source-map是一个很好的选项，再次强调只应该开发阶段使用它
```
module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  }
}
```
## 使用webpack构建本地服务器
让你的浏览器监听你的代码的修改，并自动刷新显示修改后的结果
```
npm install --save-dev webpack-dev-server
```
把devserver的配置选项加到webpack的配置文件中
```
module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
}
```
在package.json中的scripts对象中添加如下命令，用以开启本地服务器：
```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
  },
  ```
  在终端中输入npm run server即可在本地的8080端口查看结果

## Loaders
通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件(ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。
Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置