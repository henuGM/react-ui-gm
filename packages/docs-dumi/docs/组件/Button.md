# Button

```jsx
import React from 'react';
import {SButton} from 'react-ui-gm'
import 'react-ui-gm/dist/style.css'
export default () => 
<>
    <div>
      <SButton color="red" size="small">红色按钮</SButton>
      <SButton color="green" size="medium">绿色按钮</SButton>
      <SButton color="blue" size="large">蓝色按钮</SButton>
      <SButton color="red" size="small" plain>红色按钮</SButton>
      <SButton color="green" size="medium" plain>绿色按钮</SButton>
      <SButton color="blue" size="large" plain>蓝色按钮</SButton>
    </div>
    <br/>
    <div>
      <SButton color="red" size="small" round>红色按钮</SButton>
      <SButton color="green" size="medium" round>绿色按钮</SButton>
      <SButton color="blue" size="large" round>蓝色按钮</SButton>
      <SButton color="red" size="small" plain round>红色按钮</SButton>
      <SButton color="green" size="medium" plain round>绿色按钮</SButton>
      <SButton color="blue" size="large" plain round>蓝色按钮</SButton>
    </div>
    <br/>
    <div>
      <SButton color="red" size="small" icon="bianji"></SButton>
      <SButton color="green" size="medium" icon="xiaoxi"></SButton>
      <SButton color="blue" size="large" icon="gongzuotai"></SButton>
      <SButton color="red" size="small" plain icon="bianji"></SButton>
      <SButton color="green" size="medium" plain icon="xiaoxi"></SButton>
      <SButton color="blue" size="large" plain icon="gongzuotai"></SButton>
    </div>
    <br/>
    <div>
      <SButton color="red" size="small" icon="bianji">红色按钮</SButton>
      <SButton color="green" size="medium" icon="xiaoxi">绿色按钮</SButton>
      <SButton color="blue" size="large" icon="gongzuotai">蓝色按钮</SButton>
      <SButton color="red" size="small" plain icon="bianji">红色按钮</SButton>
      <SButton color="green" size="medium" plain icon="xiaoxi">绿色按钮</SButton>
      <SButton color="blue" size="large" plain icon="gongzuotai">蓝色按钮</SButton>
    </div>
</>;
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
binaji|编辑
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