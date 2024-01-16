# 第七章：使用Netlify无成本发布组件文档
### 为什么使用Netlify？
一开始一共有三个方案：
1、Github Page
2、Netlify
3、Vercel
Github Page只支持一个repo发布一个网站，而我们的项目是一个mononrepo项目，后续可能还有其他需要部署的项目，pass掉；
通过实操，目前通过vercel部署的网站正常无法访问，翻墙也不行，pass掉；
### 实操：
[Netlify官网](https://www.netlify.com/)
进入官网，点击右上角sign up；
选择github注册：
![在这里插入图片描述](../../public/docs/p7/1.png)

点击add new site：
![在这里插入图片描述](../../public/docs/p7/2.png)

然后：Import an existing project
![在这里插入图片描述](../../public/docs/p7/3.png)

选择github:
![在这里插入图片描述](../../public/docs/p7/4.png)

然后选择github账号中的repo：
![在这里插入图片描述](../../public/docs/p7/5.png)

选择react-ui-teaching，然后：
![在这里插入图片描述](../../public/docs/p7/6.png)

选择分支；
设置build配置：
![在这里插入图片描述](../../public/docs/p7/7.png)

等待build部署：
![在这里插入图片描述](../../public/docs/p7/8.png)

![在这里插入图片描述](../../public/docs/p7/9.png)

显示缺少.gitmodules文件:
原因是我们的monorepo项目中个子项目react-ui-teaching;
我们可以将monorepo项目名字修改为react-ui-teaching-monorepo；
然后新建一个repo放置子项目，这样可以互不干扰；
然后将子项目push到github；
在monorepo项目根目录下新建文件 .gitmodules:
```
[submodule "react-ui-teaching"]
	path = packages/react-ui-teaching
	url = https://github.com/henuGM/react-ui-teaching
```
push之后再重新试一下：
![在这里插入图片描述](../../public/docs/p7/10.png)

command错误，这样，我们直接使用npx dumi build命令构建：
![在这里插入图片描述](../../public/docs/p7/11.png)

再试一次；
![在这里插入图片描述](../../public/docs/p7/12.png)

构建成功；
![在这里插入图片描述](../../public/docs/p7/13.png)


![在这里插入图片描述](../../public/docs/p7/14.png)


点domian setting：
![在这里插入图片描述](../../public/docs/p7/15.png)

Edit site name:
![在这里插入图片描述](../../public/docs/p7/16.png)
修改成功：
![在这里插入图片描述](../../public/docs/p7/17.png)


