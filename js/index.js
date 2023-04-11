/*
 * @Author: 上心
 * @Description:
 * @Date: 2023-04-10 12:22:19
 * @LastEditTime: 2023-04-10 13:44:57
 * @FilePath: \网络和git学习\10. 聊天机器人-接口封装\静态页面\js\index.js
 */

(async function () {
  // 验证是否有登录，如果没有登录，跳转到登录页 如果有登录获取登录信息
  const resp = await API.profile();
  const user = resp.data;
  if (!user) {
    alert("未登录或登录已过期，请重新登录");
    location.href = "./login.html";
    return;
  }
  // 下面的代码环境，一定是登录状态
  const doms = {
    aside: {
      nickName: $("#nickname"),
      loginId: $("#loginId"),
    },
    close: $(".close"),
    chatContainer: $(".chat-container"),
    txtMsg: $("#txtMsg"),
    msgContainer: $(".msg-container"),
  };

  setUserInfo();

  // 注销事件
  doms.close.onclick = () => {
    API.loginOut();
    location.href = "./login.html";
  };

  // 加载历史记录
  await loadHistory();
  async function loadHistory() {
    const respData = await API.getHistory();
    for (const item of respData.data) {
      addChat(item);
    }
    console.log(respData);
    scorllBtn();
  }

  // 发送消息事件
  doms.msgContainer.onsubmit = (e) => {
    e.preventDefault();
    sendChat();
  };

  function setUserInfo() {
    doms.aside.nickName.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
  }

  // 根据消息对象，将其添加到页面中
  function addChat(chatInfo) {
    const div = $$$("div");
    div.classList.add("chat-item");
    if (chatInfo.from) {
      div.classList.add("me");
    }

    const img = $$$("img");
    img.className = "chat-avatar";
    img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";

    const content = $$$("div");
    content.className = "chat-content";
    content.innerText = chatInfo.content;

    const date = $$$("div");
    date.className = "chat-date";
    date.innerText = formatDate(chatInfo.createdAt);

    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);
    doms.chatContainer.appendChild(div);
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  //  聊天区域的滚动条滚到底部
  function scorllBtn() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  async function sendChat() {
    const content = doms.txtMsg.value.trim();
    if (!content) {
      return;
    }
    addChat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content,
    });
    doms.txtMsg.value = "";
    scorllBtn();
    const resp = await API.sendChat(content);
    addChat({
      from: null,
      to: user.loginId,
      ...resp.data,
    });
    scorllBtn();
  }
})();
