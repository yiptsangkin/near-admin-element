<p align="center">
  <img width="180" src="https://github.com/yiptsangkin/near-admin-element/blob/main/public/static/images/logo/logo.svg">
</p>

<p align="center">
    <a href="https://github.com/vuejs/vue">
        <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen" alt="vue">
    </a>
    <a href="https://element.eleme.cn">
        <img src="https://img.shields.io/badge/element-2.13.2-brightgreen" alt="element">
    </a>
    <a href="https://github.com/yiptsangkin/near-admin-element">
        <img src="https://img.shields.io/badge/release-1.0.0-blue" alt="release">
    </a>
</p>

## 简介

[Near-Admin](https://github.com/yiptsangkin/near-admin-element)是一个基于 [vue](https://github.com/vuejs/vue) 和[element](https://element.eleme.cn)的中后台开发框架，支持多页多路由打包，内置了多页打包自定义配置，优化打包vendor，全局快捷键，i18n国际化解决方案（带机翻功能），全局字典，本地mock，动态路由，权限验证等功能，基于[typescript](https://www.typescriptlang.org/)，为后期兼容vue3做好铺垫。开发模式上只需要遵循框架约定的动态组件上开发即可，只需要专注于单个组件的开发。这是一个专注于开发者体验和用户体验的中后台开发框架，希望能够有效的提高工作效率。

- [在线预览](https://yiptsangkin.github.io/auth)
- [使用文档](https://yiptsangkin.github.io/near-admin-vue-site/zh/)
- [Gitter 讨论组](https://gitter.im/near-admin-vue/community)
- [QQ群(1091431440)](https://jq.qq.com/?_wv=1027&k=NenTtP1C) 入群请备注<<行业+企业+姓名>>

## 答疑

**1、为什么near-admin-vue是这样子的开发模式？**

从一开始，作者对于后台管理需要配置路由就是非常的反感，因此从一开始类似的基于路由的框架基本不在我的考虑范围，因此我才想开始自己制作一个框架，用于满足自己的开发需求，near-admin-vue从初始化项目之后，你可以专注于每个组件的开发，而不需要再去搭理路由，配置等任何东西，会有效的提高你的开发效率。

**2、为什么near-admin-vue使用的是多页的打包模式？**

严格意义上，near-admin-vue是一个可以打包多页多路由的框架，本质上相当于在一个项目中可以打包多个单页应用，于此同时，作者还增加了灵活的打包脚本，允许你可以在打包过程中只选择一个或者多个单页应用打包，发布应用的时候更加的灵活，不需要整体的打包，利用的好的话你可以轻松的实现微前端架构。

**3、框架本身内置了这么多种语言版本吗？**

框架本身带有机器翻译的脚本（Google Translate），因此使用者只需要维护一个版本的国际化文档内容，就可以直接快速的通过机器翻译出多个版本，对于一些翻译准确度没有非常高的国际化系统，非常的方便。

## 开发

```bash
# clone the project from github
git clone https://github.com/yiptsangkin/near-admin-vue.git

# enter the project directory
cd near-admin-vue

# install dependency
npm install

# run application with all pages
npm run serve

# run application with single page and pick target entry
npmr run single:serve

? Pick target entry ›  
◯   auth
◯   manage
```

## 构建

```bash
# build application with all pages
# uat
npm run uat:build
# dev
npm run dev:build
# prod
npm run prod:build

# build application with single page
npm run single:build

? Pick target entry ›  
◯   auth
◯   manage

? Pick target environment › - Use arrow-keys. Return to submit.
❯   prod
    uat
    dev

? Pick clean dist or not › - Use arrow-keys. Return to submit.
❯   yes
    no
```

## 工具

```bash
# translate
npm run translate

? Pick target language ›  
◯   ar_EG
◯   bg_BG
◯   ca_ES
◯   cs_CZ
◯   da_DK
◯   de_DE
◯   el_GR
◯   en_US
◯   es_ES
◯ ↓ et_EE

```

## 在线版本

[线上DEMO](https://yiptsangkin.github.io/auth) 由于github没办法配置history模式下的代理配置，所以独立页面等涉及动态路由的功能在github.io的线上版本会不可用，不过不用担心，项目本身有内置一个nginx配置的参考demo，可以参考内容对自己的项目进行配置。
