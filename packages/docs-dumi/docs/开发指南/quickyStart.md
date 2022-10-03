# 快速上手
## 完整引入CSS
在 src文件夹下 入口文件index 中引入CSS
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

++++  import 'react-ui-gm/dist/style.css'//完整引入所有css

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
```
## 按需引入CSS
为了减小引入包体积，可以使用按需引入方式
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

++++  import 'react-ui-gm/dist/Button/style.css'//需要哪个组件就在react-ui-gm后跟 /dist/Xxx/style.css

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
```
## 简单使用
```js
import { SButton } from "react-ui-gm"

function App() {
  return (
    <SButton color="red" >react-ui-gm</SButton>
  );
}

export default App;
```