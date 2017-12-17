//main.js 入口文件
// 单一的入口，其它的模块需要通过 import, require, url等与入口文件建立其关联
// const greeter = require('./Greeter.js');
// document.querySelector("#root").appendChild(greeter());


// 使用ES6的模块定义和渲染Greeter模块
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

import './main.css';

render(<Greeter />, document.getElementById('root'));