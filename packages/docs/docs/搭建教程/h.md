# 第八章：搭建表单系统

### 一个表单系统大体包括什么？

 1. FormStore：用来保存Form的状态Model；
 2. Form：作为暴露接口的上层Provider；
 3. FormItem：将表单控件设置为可控的；
### 功能实现
在src下新建FormSystem文件夹；
FormSystem下新建store文件夹、hook文件夹以及components文件夹；
##### 先写FormStore
store文件夹下新建FormStore.jsx:

```cpp
import React from 'react';
import {unstable_batchedUpdates} from 'react-dom';

const formApi=[
    'setCallback', //存放submit后的回调
    'dispatch',//派发器，触发事件
    'registerValidateFields',//注册表单单元项
    'resetFields',//重置表单
    'setFields',//重新设置全部表单项
    'setFieldsValue',//重新设置单一表单项
    'getFieldsValue',//获取所有表单项
    'getFieldValue',//获取指定表单项
    'validateFields',//验证表单
    'submit',//提交
    'unRegisterValidate',//取消注册
]

const isReg=(value)=> value instanceof RegExp;//通过instanceOf验证正则表达式

class FormStore{
    constructor(forceUpdate,defaultFormValue={}){
        this.FormUpdate=forceUpdate;//表单刷新方法
        this.model={};//初始数据集
        this.control={};//存放每一个FormItem的更新函数，状态改变时，需要把状态下发到每个需要更新的FormItem
        this.isSchedule=false;//是否开启调度
        this.callback={};//存放表单状态改变的回调函数
        this.penddingValidateQueue=[];//异步验证的批量更新队列
        this.defaultFormValue=defaultFormValue;//默认value
    }
    getForm(){
        return formApi.reduce((map,item)=>{//map是一直积累的{}
            map[item]=this[item].bind(this);
            return map;
        },{});
    }
    createValidate(validate){//转化成规范的validate
        const {value,rule,required,message}=validate;
        return {
            value,
            rule:rule||(()=>true),
            required:required||false,
            message:message||'',
            status:'pendding' 
        }
    }
    setCallback(callback){//用来绑定回调函数
        if(callback) this.callback=callback
    }
    dispatch(action,...arg){
        if(!action&&typeof action!=='object') return null;//action为null时
        const {type}=action;
        if(formApi.indexOf(type)!=-1){
            return this[type](...arg);
        }else if(typeof this[type]==='function'){
            return this[type](...arg);
        }
    }
    registerValidateFields(name,control,model){//注册表单单元项
        if(this.defaultFormValue[name]) model.value=this.defaultFormValue[name];
        const validate=this.createValidate(model);
        this.model[name]=validate;
        this.control[name]=control;
    }
    unRegisterValidate(name){//卸载表单单元项
        delete this.model[name];
        delete this.control[name];
    }
    resetFields(){//重置表单
        Object.keys(this.model).forEach(modelName=>{
            this.setValueClearStatus(this.model[modelName],modelName,null);
        })
    }
    setFields(object){//设置一组字段状态
        if(typeof object!=='object') return;
        Object.keys(object).forEach(modelName=>{
            this.setFieldsValue(modelName,object[modelName]);
        })
    }
    setFieldsValue(name,modelValue){
        const model=this.model[name];
        if(!model) return false;
        if(typeof modelValue==='object'){
            const {message,rule,value}=modelValue;
            if(message) model.message=message;
            if(rule) model.rule=rule;
            if(value) model.value=value;
            model.status='pendding';
            this.validateFieldValue(name,true);
        }else{
            this.setValueClearStatus(model,name,modelValue);
        }
    }
    setValueClearStatus(model,name,value){//清空指定状态
        model.value=value;
        model.status='pendding';
        this.notifyChange(name);
    }
    notifyChange(name){//通知状态改变了
        const controller=this.control[name];
        if(controller) controller?.changeValue();
    }
    getFieldsValue(){
        let formData={};
        Object.keys(this.model).forEach(modelName=>{
            formData[modelName]=this.model[modelName].value
        })
        return formData;
    }
    getFieldValue(name){
        const model=this.model[name];
        if(!model&&this.defaultFormValue[name]) return this.defaultFormValue[name];
        return model?model.value:null;
    }
    getFieldModel(name){
        const model=this.model[name];
        return model?model:{};
    }
    validateFieldValue(name,forceUpdate=false){//单一表单单元项验证
        const model=this.model[name];
        const lastStatus=model.status;
        if(!model) return null;
        const {required,rule,value}=model;
        let status='resolve';
        if(required&&!value) status='reject';
        else if(isReg(rule)){
            status=rule.test(value)?'resolve':'reject';
        }else if(typeof rule==='function'){
            status=rule(value)?'resolve':'reject';
        }
        model.status=status;
        if(lastStatus!==status||forceUpdate){
            const notify=this.notifyChange.bind(this,name);
            this.penddingValidateQueue.push(notify);
        }
        this.scheduleValidate();
        return status;
    }
    scheduleValidate(){//批量调度验证更新任务；
        if(this.isSchedule) return;
        this.isSchedule=true;
        Promise.resolve().then(()=>{
            unstable_batchedUpdates(()=>{
                do{
                    let notify=this.penddingValidateQueue.shift();
                    notify&&notify();
                }while(this.penddingValidateQueue.length>0)
                this.isSchedule=false;
            })
        })
    }
    validateFields(callback){
        let status=true;
        Object.keys(this.model).forEach(modelName=>{
            const modelStates=this.validateFieldValue(modelName,true);
            if(modelStates==='reject') status=false;
        })
        callback(status);
    }
    submit(cb){
        this.validateFields((res)=>{
            const {onFinish,onFinishFailed}=this.callback;
            cb&&cb(res);
            if(!res) onFinishFailed&&typeof onFinishFailed==='function'&&onFinishFailed();
            onFinish&&typeof onFinish==='function'&&onFinish(this.getFieldsValue());
        })
    }
}
export default(FormStore);
```
##### 创建一个用于创建formStore实例的钩子
hooks文件夹下新建useForm.js文件：
```cpp
import FormStore from "../store/FormStore";

function useForm(form,defaultFormValue={}){
    const formRef=React.useRef(null);
    const [,forceUpdate]=React.useState({});
    if(!formRef.current){
        if(form){
            formRef.current=form;
        }else{
            const formStoreCurrent=new FormStore(forceUpdate,defaultFormValue);
            formRef.current=formStoreCurrent.getForm();
        }
    }
    return formRef.current;
}
export default useForm;
```
在components文件夹下新建 Form.jsx、FormItem.jsx、FormContext.jsx、Input.jsx以及Message.jsx;
##### FormContext
```cpp
import FormContext from "./FormContext";
import useForm from "../hooks/useForm";
import { useImperativeHandle } from "react";

function Form({
    form,
    onFinish,
    onFinishFailed,
    initialValues,
    children
},ref){
    const formInstance=useForm(form,initialValues);
    //抽离这两个api;
    const {setCallback,dispatch,...provideerFormInstance}=formInstance;
    setCallback({
        onFinish,
        onFinishFailed
    });
    //useInperativeHandle在使用red时，自定义暴露给父组件的值
    useImperativeHandle(ref,()=>provideerFormInstance,[]);
    const RenderChildren=<FormContext.Provider value={formInstance}> {children} </FormContext.Provider>
    return <form
        onReset={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            formInstance.resetFields();
        }}
        onSubmit={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            formInstance.submit();
        }}
    >
        {RenderChildren}
    </form>
}
export default Form;
```
##### FormItem.jsx
```cpp
import React,{memo,useEffect,useContext,useState,useMemo,cloneElement,isValidElement} from "react";
import FormContext from "./FormContext";

function FormItem({
    name,
    children,
    label,
    height=50,
    labelWidth,
    required=false,
    rules={},
    trigger='onChange',
    validateTrigger='onChange'
}){
    const formInstance=useContext(FormContext);
    const {registerValidateFields,dispatch,unRegisterValidate}=formInstance;
    const [,forceUpdate]=useState({});
    const onStoreChange=useMemo(()=>{
        const onStoreChange={
            changeValue(){
                forceUpdate();
            }
        }
        return onStoreChange;
    },[formInstance]);
    useEffect(()=>{
        name&&registerValidateFields(name,onStoreChange,{...rules,required});
        return function(){
            name&&unRegisterValidate(name);
        }
    },[onStoreChange]);
    const getControlled=(child)=>{
        const mergeChildrenProps={...child.props};
        if(!name) return mergeChildrenProps;
        const handleChange=(e)=>{
            const value=e.target.value;
            dispatch({type:'setFieldsValue'},name,value);
        }
        mergeChildrenProps[trigger]=handleChange;
        if(required||rules){
            mergeChildrenProps[validateTrigger]=(e)=>{
                if(validateTrigger==trigger){
                    handleChange(e);
                }
                dispatch({type:'validateFieldValue'},name);
            }
        }
        mergeChildrenProps.value=dispatch({type:"getFieldValue"},name)||''
        return mergeChildrenProps;
    }
    let renderChildren;
    if(isValidElement(children)){
        renderChildren=cloneElement(children,getControlled(children));
    }else{
        renderChildren=children;
    }
    return <Label
        height={height}
        label={label}
        labelWidth={labelWidth}
        required={required}
           >
         {renderChildren}
         <Message
             name={name}
             {...dispatch({ type :'getFieldModel'},name)}
         />
     </Label>
}

export default memo(FormItem)
```
##### Label.jsx
```cpp
import React from 'react'

import './style.css'

function Index({ children , label ,labelWidth , required ,height}){
    return <div className="form-label"
        style={{ height:height + 'px'  }}
           >
       <div
           className="form-label-name"
           style={{ width : `${labelWidth}px` }}
       >
           {required ? <span style={{ color:'red' }} >*</span> : null}
           {label}:
        </div>  {children}
    </div>
}

export default Index

```
##### Message.jsx
```cpp
import React from "react";

import "./style.css";
function Message(props) {
  const { status, message, required, name, value } = props;
  let showMessage = "";
  let color = "#fff";
  if (required && !value && status === "reject") {
    showMessage = `${name} 为必填项`;
    color = "red";
  } else if (status === "reject") {
    showMessage = message;
    color = "red";
  } else if (status === "pendding") {
    showMessage = null;
  } else if (status === "resolve") {
    showMessage = "校验通过";
    color = "green";
  }
  return (
    <div className="form-message">
      {status === "resolve" || status === "pendding" ? (
        <></>
      ) : (
        <span style={{ color }}>{showMessage}</span>
      )}
    </div>
  );
}
export default Message;

```
##### style.css
```cpp
.form-label-name{
    display: inline-block;
}
.form-label{
    position: relative;
    height: 70px;
}
.form-message{
    position: absolute;
    bottom: 0;
    font-size: 12px;
}

.form-input{
    border: 1px solid #ccc;
    height: 35px;
    border-radius:5px ;
    width: 200px;
}

.form-select-option{
    width: 200px;
    height: 35px;
    background-color: #fff;
}
```

FormSystem文件夹下新建form.js暴露接口，然后写个小demo（index.jsx）：
```cpp
import React, { useRef, useEffect } from "react";

import Form, { Input, Select } from "./form";
import SButton from "../Button/button";
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

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/1e919cacb6164fa580f431ef3e2b1b7e.png)

