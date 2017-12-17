// Greeter.js
import React, {Component} from 'react'
// es6语法，import会被转码为require去执行
import config from './config.json';
// var config = require('./config.json');


import styles from './Greeter.css';

// 返回一个React组件
class Greeter extends Component{
  render() {
    return (
      // <div>  
      // 使用cssModule添加类名的方法
      // 放心使用吧，相同的类名也不会造成不同组件之间的污染。
      <div className={styles.root}> 
        {config.greetText}
      </div>
    );
  }
}

export default Greeter


// module.exports = function() {
//     var greet = document.createElement('div');
//     greet.textContent = "Hi there and greetings!";
//     return greet;
//   };
