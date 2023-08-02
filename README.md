<<<<<<< HEAD
# hospital

#### 介绍
{**以下是 Gitee 平台说明，您可以替换此简介**
Gitee 是 OSCHINA 推出的基于 Git 的代码托管平台（同时支持 SVN）。专为开发者提供稳定、高效、安全的云端软件开发协作平台
无论是个人、团队、或是企业，都能够用 Gitee 实现代码托管、项目管理、协作开发。企业项目请看 [https://gitee.com/enterprises](https://gitee.com/enterprises)}

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
=======
# 医疗连接

## 一、接口

服务器地址:http://syt.atguigu.cn
医院接口：http://139.198.34.216:8201/swagger-ui.html
公共数据接口：http://139.198.34.216:8202/swagger-ui.html
会员接口：http://139.198.34.216:8203/swagger-ui.html
短信验证码接口：http://139.198.34.216:8204/swagger-ui.html
订单接口：http://139.198.34.216:8206/swagger-ui.html
文件上传接口：http://139.198.34.216:8205/swagger-ui.html
后台用户接口：http://139.198.34.216:8212/swagger-ui.html

## 二、项目其他配置

## 2.1 浏览器自动打开

找到 package.json 配置文件!

```
 "scripts": {
  "dev": "vite --open",
  "build": "vue-tsc && vite build",
  "preview": "vite preview"
 },
```

## 2.2src 别名的配置

找到 vite.config.ts 配置文件。

**如果红色语法提示请安装@types/node 是 TypeScript 的一个声明文件包，用于描述 Node.js 核心模块和常用的第三方库的类型信息**

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
 plugins: [vue()],
 resolve: {
  alias: {
   "@": path.resolve(__dirname, 'src')
  }
 }
})
```

找到`tsconfig.json`配置文件,找到配置项 compilerOptions 添加配置,这一步的作用是让 IDE 可以对路径进行智能提示

```
 "baseUrl": ".",
  "paths": {
   "@/*": ["src/*"]
  }
```

//微信开放平台官网地址
https://open.weixin.qq.com
//查看微信扫码登录文档
https://mp.weixin.qq.com/

项目当中全部路由:、
用户未登录可以访问的路由
/home
/hospital/register
/hospital/detail
/hospital/notice
/hospital/close
/hospital/search
剩下其余的路由未登录不能访问的,如果用户登录了全部的路由都是可以访问的
>>>>>>> bdfaa9f (1)
