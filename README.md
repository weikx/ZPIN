# ZPIN

> 一个使用 [mpvue](https://github.com/Meituan-Dianping/mpvue) 搭建的智联招聘微信小程序
## 功能
- [x] **首页展示**
- [x] **详情展示**
- [x] **我的简历**
- [x] **搜索职位**
- [x] **求职进展**
- [ ] **我的订单**
- [ ] **编辑简历**
- [ ] **地图定位**

##目录结构
``` README
├─── README.md                // README
├─── index.html               // 入口页面
├─── build                    // 项目构建脚本
├─── config                   // 配置目录
├─── package.json             // 配置文件
├─── static                   // 静态资源
│    ├── font                 // 字体文件
│    ├── images               // 图片资源
│    ├── scss                 // 公共样式
└─── src                      // 主要代码
     ├─── components          // 公共组件
     │    ├─── list           // 公共列表组件
     │    └─── loading        // 公共加载中组件
     ├─── pages               // 项目页面
     │    ├─── advertisement  // 广告页面
     │    ├─── detail         // 公司详情
     │    ├─── index          // 主页
     │    ├─── me             // 我的
     │    ├─── resume         // 简历
     │    ├─── schedule       // 投递记录
     │    └───  search        // 搜索职位
     └─── utils               // 公用文件
          └───  api           // 接口请求
```
## Build Setup

``` bash
cd ZPIN

npm install

npm run dev

# 使用微信开发者工具预览
```

