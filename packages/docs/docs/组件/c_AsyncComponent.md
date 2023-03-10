# AsyncComponent

```jsx
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
          {/* 由于在dumi中无法渲染Symbol(React.lazy())类型，故这里使用text站位，在普通项目中，这里使用<LazyText/>即可实现异步*/}
          <text>这是异步组件，详细请看代码</text>
          {/* <LazyText/>//这个是实际用法 */}
        </Suspense>
      </div>
    );
  };

```
