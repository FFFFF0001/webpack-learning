//main.js 入口文件
const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());
// 终端中输入如下命令
// webpack app/main.js public/bundle.js
// 如果webpack不是全局安装的，那么当在终端中使用此命令时，
// 需要额外指定其在node_modules中的地址，
// 在终端中输入如下命令
// node_modules/.bin/webpack app/main.js public/bundle.js