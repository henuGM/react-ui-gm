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
![在这里插入图片描述](https://img-blog.csdnimg.cn/3f6f814ed2e340878ea37f5f334687fd.png)
点击add new site：
![在这里插入图片描述](https://img-blog.csdnimg.cn/9dc5dffc3eeb45bca473afd178965b2d.png)
然后：Import an existing project
![在这里插入图片描述](https://img-blog.csdnimg.cn/997a8179471946209bcd6784e21d3c28.png)
选择github:
![在这里插入图片描述](https://img-blog.csdnimg.cn/4eeb598e813f4363b8da89367aa0b98a.png)
然后选择github账号中的repo：
![在这里插入图片描述](https://img-blog.csdnimg.cn/062d2ab5ff6341f3970461f2afe6c34b.png)
选择react-ui-teaching，然后：
![在这里插入图片描述](https://img-blog.csdnimg.cn/5caec2db52034d6889055737e8818da1.png)
选择分支；
设置build配置：
![在这里插入图片描述](https://img-blog.csdnimg.cn/c9c4f921328d4abb9a4946c919552b8f.png)
等待build部署：
![在这里插入图片描述](https://img-blog.csdnimg.cn/ad8f832615ef4eaf9782b39d7462bada.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/6841c10764844d6ea4081283f6abdd25.png)
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
![在这里插入图片描述](https://img-blog.csdnimg.cn/616c505683f84d7988e76120de8d5b85.png)
command错误，这样，我们直接使用npx dumi build命令构建：
![在这里插入图片描述](https://img-blog.csdnimg.cn/d822aeaf9c15434ea5f7386217150db4.png)
再试一次；
![在这里插入图片描述](https://img-blog.csdnimg.cn/4353f7c117654b15be6e6f315f0d1c4e.png)
构建成功；
![在这里插入图片描述](https://img-blog.csdnimg.cn/5b56a8237a9e40baa0d345116e63917a.png)

![!\[在这里插入图片描述\](https://img-blog.csdnimg.cn/a65b08cf2e564cdabebd30399816ca56.pn](https://img-blog.csdnimg.cn/ae289ee945f54c60b00233afed1aa465.png)

点domian setting：
![在这里插入图片描述](https://img-blog.csdnimg.cn/61b201c919bc43869bb3b3d8804f5ca5.png)
Edit site name:
![在这里插入图片描述](https://img-blog.csdnimg.cn/062358736b524df2a2fd49e688b1aeff.png)修改成功：
![在这里插入图片描述](https://img-blog.csdnimg.cn/37080c223f774c6cb800f482c990e288.png)

