# Button

```jsx
import React, { useRef, useEffect } from "react";
import Form, { Input, Select, SButton } from "react-ui-gm";
import 'react-ui-gm/dist/style.css'

const FormItem = Form.FormItem;
const Option = Select.Option;
export default () =>{
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
return (<>
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
</>)};
```
## API
Name | Description | Type | Default | Options
-----|-------|------|--------|------|
color | 有对颜色进行约束 | String | White| black \| gray \| red \| yellow \| green \| blue \| indigo \| purple \| pink
size | 目前只有三种，可自行覆盖样式 | String | medium | small \| medium \| large
plain | 对按钮朴素处理 | Boolean | false | true \| false
round | 对按钮进行圆角处理 | Boolean | false | true \| false
icon | 为按钮添加图标，或单独使用图标 | string | null | options如下

## Icon Options
Options | Description
--------|------------
juzhongduiqi|居中对齐
zuuoduiqi|左对齐
yiwen|疑问
xuanzewendnag|选择文档
youduiqi|右对齐
xunhuan|循环
bianji|编辑
xiugai|修改
xinhao|信号
xiaoxi|消息
xiazai2|下载2
tianjiawenjian|添加文件
tianjiawendang|添加文档
tianjia2|添加2
tianjia1|添加1
tixing|提醒1
tishi|提示
suoxiao|缩小
gongzuotai|工作台
zhichuhetong|支出合同