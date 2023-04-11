/*
 * @Author: 上心
 * @Description:
 * @Date: 2023-04-10 09:47:59
 * @LastEditTime: 2023-04-10 12:13:59
 * @FilePath: \网络和git学习\10. 聊天机器人-接口封装\静态页面\js\reg.js
 */
/*
 * @Author: 上心
 * @Description:
 * @Date: 2023-04-10 09:47:59
 * @LastEditTime: 2023-04-10 12:12:21
 * @FilePath: \网络和git学习\10. 聊天机器人-接口封装\静态页面\js\reg.js
 */
const loginIdValidator = new FieIdValidator("txtLoginId", async (val) => {
  if (!val) {
    return "请填写账号";
  }
  // 判断账号是否存在
  const resp = await API.exists(val);
  if (resp.data) {
    return "该账号已被占用，请重新选择一个账号名";
  }
});

const nicknameValidator = new FieIdValidator("txtNickname", (val) => {
  if (!val) {
    return "请填写昵称";
  }
});

const loginPwdValidator = new FieIdValidator("txtLoginPwd", (val) => {
  if (!val) {
    return "请填写密码";
  }
});
const loginPwdAgainValidator = new FieIdValidator(
  "txtLoginPwdConfirm",
  (val) => {
    if (!val) {
      return "请填写确认密码";
    }
    if (val !== loginPwdValidator.input.value) {
      return "两次密码不一致，请重新填写";
    }
  }
);

const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieIdValidator.validate(
    loginIdValidator,
    nicknameValidator,
    loginPwdValidator,
    loginPwdAgainValidator
  );
  if (!result) {
    return;
  }
  const formData = new FormData(form); // 传入表单dom,得到一个表单数据对象
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const resp = await API.reg(data);
  if (resp.code === 0) {
    alert("注册成功");
    location.href = "./login.html";
  }
  // const data = {
  //   loginId: loginIdValidator.input.value,
  //   loginPwd: loginPwdValidator.input.value,
  //   nickname: nicknameValidator.input.value,
  // };
};
