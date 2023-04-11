/*
 * @Author: 上心
 * @Description:
 * @Date: 2023-04-10 09:58:23
 * @LastEditTime: 2023-04-10 09:59:29
 * @FilePath: \网络和git学习\10. 聊天机器人-接口封装\静态页面\js\common.js
 */
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function $$$(tagName) {
  return document.createElement(tagName);
}
