import React, { useRef, useEffect } from "react";
import Form, { Input, Select, SButton } from "react-ui-gm";

const FormItem = Form.FormItem;
const Option = Select.Option;

function FormDemo() {
  const form = useRef(null);
  const handleClick = () => {
    form.current.submit((res) => {
      console.log(res);
    });
  };
  const handleGetValue = () => {
    let node = form.current.getFieldsValue();
    console.log(node);
  };
  return (
    <div style={{ marginTop: "50px",marginLeft:"20px" }}>
      <Form initialValues={{ author: "我不是外星人" }} ref={form}>
        <FormItem
          label="请输入用户名"
          labelWidth={150}
          name="user"
          required
          rules={{
            rule: /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,32}$/,
            message: "名称仅支持中文、英文字母、数字和下划线，长度限制4~32个字",
          }}
          validateTrigger="onBlur"
        >
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem
          label="密码"
          labelWidth={150}
          name="password"
          required
          validateTrigger="onBlur"
        >
          <Input placeholder="请输入密码" />
        </FormItem>
        <FormItem
          label="邮箱"
          labelWidth={150}
          name="email"
          rules={{
            rule: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            message: "邮箱格式错误！",
          }}
          validateTrigger="onBlur"
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem
          label="手机"
          labelWidth={150}
          name="phone"
          rules={{ rule: /^1[3-9]\d{9}$/, message: "手机格式错误！" }}
          validateTrigger="onBlur"
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem
          label="登录方式"
          labelWidth={150}
          name="likes"
          required
        >
          <Select defaultValue={null} placeholder="请选择" width={120}>
            <Option value={1}> QQ </Option>
            <Option value={2}> WeChat </Option>
            <Option value={3}> Lark </Option>
          </Select>
        </FormItem>
        <SButton color="green" onClick={handleClick} type="button" plain>
          提交
        </SButton>
        <SButton className="concellbtn" color="green" type="reset" plain>
          重置
        </SButton>
      </Form>
      <div style={{ marginTop: "20px" }}>
        <SButton color="green" plain onClick={handleGetValue} type="button">
          获取表单数据
        </SButton>
        <SButton
          color="green"
          plain
          onClick={() =>
            form.current.validateFields((res) => {
              console.log("是否通过验证：", res);
            })
          }
        >
          动态验证表单
        </SButton>
        <SButton
          plain
          color="green"
          onClick={() => {
            form.current.setFieldsValue("password", {
              rule: (value = "") => value && value.length < 5,
              message: "密码不超过5位数",
            });
          }}
        >
          动态设置校验规则
        </SButton>
      </div>
    </div>
  );
}

export default FormDemo;
