/*
 * @Author: 上心
 * @Description:
 * @Date: 2023-04-10 09:46:39
 * @LastEditTime: 2023-04-10 11:16:49
 * @FilePath: \网络和git学习\10. 聊天机器人-接口封装\静态页面\js\user.js
 */
// 用户登录和注册的表单项验证的通用代码
/**
 * 对某一个表单项进行验证的构造函数
 */
class FieIdValidator {
  /**
   * 构造器
   * @param {String} txtId 文本框的Id
   * @param {Function} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    // 失去焦点
    this.validattorFunc = validatorFunc;
    this.input.onblur = () => {
      this.validate();
    };
  }
  /**
   * 验证成功，返回true, 失败返回false
   */
  async validate() {
    const err = await this.validattorFunc(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  /**
   * 对传入的所有验证器进行统一的验证, 所有的验证通过返回true, 有一个没通过返回false
   * @param {FieIdValidator[]} validators
   */
  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    const results = await Promise.all(proms);
    return results.every((r) => r);
  }
}
