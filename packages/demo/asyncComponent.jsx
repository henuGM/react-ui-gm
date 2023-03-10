import React, { Component,Suspense } from "react";
import {AsyncComponent} from "react-ui-gm"
/* 数据模拟 */
const getData=()=>{
    return new Promise((resolve)=>{
        //模拟异步
        setTimeout(() => {
             resolve({
                 name:'alien',
                 say:'let us learn React!'
             })
        }, 3000)
    })
}
/* 测试异步组件 */
function Test({ rdata  , age}){
    const { name , say } = rdata
    return <div>
        <text>这是一个异步组件</text>
    </div>
}
/* 父组件 */
export default class AsyncDemo extends React.Component{
    LazyTest = AsyncComponent(Test,getData) /* 需要每一次在组件内部声明，保证每次父组件挂载，都会重新请求数据 ，防止内存泄漏。 */
    render(){
        const { LazyTest } = this
        return <div>
           <Suspense fallback={<div>loading...</div>} >
              <LazyTest age={18}  />
          </Suspense>
        </div>
    }
}