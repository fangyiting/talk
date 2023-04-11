var API = (function () {
  /*
   * @Author: 上心
   * @Description:
   * @Date: 2023-04-07 19:58:07
 * @LastEditTime: 2023-04-07 21:16:44
 * @FilePath: \网络和git学习\10. 聊天机器人-接口封装\静态页面\js\api.js
   */

  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  /**
   * get请求封装
   * @param {*} path
   * @returns
   */
  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }
  /**
   * post请求封装
   * @param {*} path 传递的路径
   * @param {*} bodyObj
   * @returns
   */
  function post(path, bodyObj) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      headers,
      method: "POST",
      body: JSON.stringify(bodyObj),
    });
  }
  /**
   * 注册接口
   * @param {} userInfo
   */
  async function reg(userInfo) {
    const resp = await post("/api/user/reg", userInfo);
    return await resp.json();
  }

  /**
   * 登录接口
   * @param {*} loginInfo
   * @returns
   */
  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const result = await resp.json();

    if (result.code === 0) {
      //登录成功
      // 将响应头中的token保存到localstorage
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  }

  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  async function sendChat(content) {
    const resp = await post("/api/chat", {
      content,
    });
    return await resp.json();
  }

  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }
  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
