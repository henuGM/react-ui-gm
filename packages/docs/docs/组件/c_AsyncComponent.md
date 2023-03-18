# AsyncComponent
由于在dumi中无法渲染Symbol(React.lazy())类型,故这里无法展示；


[展示链接](https://react-ui-gm-demo.netlify.app)

AsyncComponent的代码只有这一个函数：
AsyncComponent接受Component和api两个参数，通过promise将异步数据挂载到Component上，然后将这个promise作为React.lazy的参数；

```
function AysncComponent(Component,api){
    const AysncComponentPromise = () => new Promise(async (resolve)=>{
          const data = await api()
          resolve({
              default: (props) => <Component rdata={data} { ...props}  />
          })
    })
    return React.lazy(AysncComponentPromise)
}
```

```
import React, { Component, Suspense } from 'react';
import { AsyncComponent } from 'react-ui-gm';

export default () => {
  const getData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'alien',
          say: 'let us learn React!',
        });
      }, 3000);
    });
  }
    function Test() {
      return <div>这是一个异步组件</div>;
    }
    let LazyText = AsyncComponent(Test, getData);
    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <LazyText/>
        </Suspense>
      </div>
    );
  };

```
