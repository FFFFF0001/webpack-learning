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
通过使用不同的loader，webpack**有能力调用外部的脚本或工具**，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件(ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。
Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置
- test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
- loader：loader的名称（必须）
- include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
- query：为loaders提供额外的设置选项（可选）

### Babel
Babel其实是几个模块化的包，其核心功能位于称为babel-core的npm包中，webpack可以把其不同的包整合在一起使用
```
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
```
在webpack中配置Babel
```
module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
};
```

## 一切皆模块
Webpack把所有的文件都都当做模块处理，JavaScript代码，CSS和fonts以及图片等等通过合适的loader都可以被处理。
### css
webpack提供两个工具处理样式表，css-loader 和 style-loader;
css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,
style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
```
npm install --save-dev style-loader css-loader
```
```
   ...
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
```

### CSS module
大多的样式表却依旧巨大且充满了全局类名，维护和修改都非常困难。
通过CSS模块，所有的类名，动画名默认都只作用于当前模块。
Webpack对CSS模块化提供了非常好的支持，只需要在CSS loader中进行简单配置即可
```
 {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }
                ]
            }
```
放心使用吧，相同的类名也不会造成不同组件之间的污染。

### CSS预处理器
Sass 和 Less 之类的预处理器是对原生CSS的拓展，它们允许你使用类似于variables, nesting, mixins, inheritance等不存在于CSS中的特性来写CSS，CSS预处理器可以使这些特殊类型的语句转化为浏览器可识别的CSS语句
常用的CSS 处理loaders:
- Less Loader
- Sass Loader
- Stylus Loader
**PostCSS**
使用PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀。
```
npm install --save-dev postcss-loader autoprefixer
```
在webpack配置文件中添加postcss-loader，在根目录新建postcss.config.js
重新使用npm start打包时，你写的css会自动根据Can i use里的数据添加不同前缀了

## 插件
插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
loaders是在打包构建过程中用来处理源文件的，一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。

### 常用插件
#### HtmlWebpackPlugin
依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）。
```
npm install --save-dev html-webpack-plugin
```

### Hot Module Replacement
允许在修改组件代码后，自动刷新实时预览修改后的效果。
1.在webpack配置文件中plugins中添加HMR插件；
2.添加“hot”参数；
还需要在你的JS模块中执行一个Webpack提供的API才能实现热加载，虽然这个API不难使用，但是如果是React模块，使用我们已经熟悉的Babel可以更方便的实现功能热加载。
安装react-transform-hmr
```
npm install --save-dev babel-plugin-react-transform react-transform-hmr
```
配置Babel
```
// .babelrc
{
  "presets": ["react", "env"],
  "env": {
    "development": {
    "plugins": [["react-transform", {
       "transforms": [{
         "transform": "react-transform-hmr",
         
         "imports": ["react"],
         
         "locals": ["module"]
       }]
     }]]
    }
  }
}
```
现在当使用React时，可以热加载模块了,每次保存就能在浏览器上看到更新内容。
#### 分离CSS和JS文件
```
npm install --save-dev extract-text-webpack-plugin
```

#### 缓存
缓存无处不在，使用缓存的最好方法是保证你的文件名和文件内容是匹配的（内容改变，名称相应改变）

webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前
#### 去除build文件中的残余文件
添加了hash之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多，因此这里介绍另外一个很好用的插件clean-webpack-plugin。
在配置文件的plugins中做相应配置:
```
const CleanWebpackPlugin = require("clean-webpack-plugin");
  plugins: [
    ...// 这里是之前配置的其它各种插件
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
  })
  ]
```