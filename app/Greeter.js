// Greeter.js
import React, {Component} from 'react'
// es6语法，import会被转码为require去执行
import config from './config.json';
// var config = require('./config.json');

// module.exports = function() {
//     var greet = document.createElement('div');
//     greet.textContent = "Hi there and greetings!";
//     return greet;
//   };

// 返回一个React组件
class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter