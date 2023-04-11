const loginIdValidator = new FieIdValidator("txtLoginId", async (val) => {
  if (!val) {
    return "请填写账号";
  }
});

const loginPwdValidator = new FieIdValidator("txtLoginPwd", (val) => {
  if (!val) {
    return "请填写密码";
  }
});

const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieIdValidator.validate(
    loginIdValidator,
    loginPwdValidator
  );
  if (!result) {
    return;
  }
  const formData = new FormData(form); // 传入表单dom,得到一个表单数据对象
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const resp = await API.login(data);
  if (resp.code === 0) {
    alert("登录成功");
    location.href = "./index.html";
  } else {
    alert("登录失败，请检查账号或密码是否错误");
    loginPwdValidator.input.value = "";
  }
  // const data = {
  //   loginId: loginIdValidator.input.value,
  //   loginPwd: loginPwdValidator.input.value,
  //   nickname: nicknameValidator.input.value,
  // };
};
