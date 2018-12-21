# 消防APP模板使用说明

> [消防APP模板地址](http://gitlab.hekr.me/front-end/fire-app-template)

## 1 环境搭建

### 1.1 构建命令

``` bash
# 安装依赖
npm install

# 启动本地服务（默认test环境接口） localhost:8080
npm run dev

# 打包测试版本
npm run build:test

# 打包灰度版本
npm run build:gray

# 打包正式版本
npm run build:prod
```

### 1.2 开发目录

```bash
template
├─ build
│    └─ build-version.js     # 打包后生成版本信息json
├─ config
│    ├─ index.js
│    └─ prod.env.js          # 配置版本信息和pid信息
├─ src
│    ├─ App.vue              # 入口文件
│    ├─ main.js              # 主文件
│    ├─ assets
│    │    ├─ iconfont        # 字体图标
│    │    ├─ images          # 静态图片
│    │    ├─ stylus          # 样式文件
│    │    └─ utils           # js脚本
│    ├─ components           # 组件文件
│    │    ├─ hk-ui             # hekr公用组件
│    │    ├─ page              # 业务组件
│    │    └─ vant-ui
│    ├─ directive            # 指令文件夹
│    │    └─ index.js
│    ├─ mixins               # mixins文件
│    │    └─ scan.vue
│    ├─ prototype            # 挂载vue原型上的对象集合
│    │    ├─ hekr.js
│    │    └─ index.js
│    ├─ router               # 路由
│    │    └─ index.js
│    ├─ service              # api接口文件
│    │    ├─ api
│    │    ├─ request
│    │    └─ server
│    ├─ store                # vue store
│    │    ├─ actions.js
│    │    ├─ getters.js
│    │    ├─ index.js
│    │    ├─ mutations.js
│    │    └─ state.js
│    └─ views                # 页面
│           ├─ 404             # 404页面
│           ├─ bind            # 绑定设备相关页面
│           ├─ ctrl            # 设备控制页面
│           ├─ device          # 设备页面
│           ├─ home            # 主页
│           ├─ login           # 登录相关页面
│           ├─ message         # 消息页面
│           ├─ project         # 项目页面
│           └─ user            # 个人中心页面
├─ index.html
└─ package.json
```

## 2 基本信息配置

### 2.1 app基本信息配置

配置文件`config/prod.env.js`

```js
module.exports = {
  NODE_ENV: '"production"',
  API_ENV: `"${process.env.API_ENV}"`, // 接口环境 test, gray, prod
  BUILDTIME_ENV: `"${parseInt(Date.now() / 1000 / (60 * 10))}"`, // zip小版本，不用卸载app，热更新，时间戳间隔为10分钟
  VERSION_ENV: '"1.0.0"', // app大版本，需要app重新安装时该版本才会变动
  PID_ENV: '"00000000000"' // 当前app的厂家pid, 区分app的标识
}
```

### 2.2 本地存储key值配置

文件`src/store/state.js`

### 2.3 css变量配置

文件`src/assets/stylus/var.styl`，包括颜色配置和间距配置

### 2.4 字体图标设置

文件`src/assets/stylus/icon.styl`

操作流程：

1. 登录iconfont网站，链接：[http://www.iconfont.cn](http://www.iconfont.cn)

2. 把需要的图标导入到项目里，设置项目的字体为`iconfont`, 前缀为`van-icon`

  ![](./iconfont.png)

3. 复制生成的Font class链接，引入到`icon.styl`里

4. 使用时可以直接用name：`van-icon(name="XXX")`

## 3. 集成模块说明

### 3.1 Zip更新

1. 构建打包的时候执行`build/build-version.js`文件，生成带有版本信息的json文件
2. 进入app执行`src/assets/utils/zipUpdate.js`中的方法
3. 判断大版本（VERSION_ENV）和小版本（BUILDTIME_ENV），大版本更新提示卸载重装APP，小版本更新提示后执行`Matrix.upgradeH5`方法更新

### 3.2 接口拦截

* 相关文件为`src/service/request.index.js`
* 设置请求超时时间和部分错误提示语
* 如果是get请求，添加时间戳，解决缓存问题

### 3.3 开发环境Matrix

* 正式打包后Matrix对象为app外壳提供，开发过程中可以模拟Matrix对象返回
* 相关文件：`src/assets/utils/matrix.js`
* 文件可以设置默认返回结果，比如扫码和获取clientId

### 3.4 安卓返回键

* 安卓返回时会执行`Matrix.back`方法，所以可以通过重置方法来实现某些效果
* 集成的有在首页和登录页需要按两次返回退出APP

### 3.5 移动端适配使用Rem

* 基数是20px, 使用postcss，开发中使用px或rem都可以，打包时会转成对应rem
* 相关文件有：`src/assets/utils/rem.js`, `.postcssrc.js`

### 3.6 定位天气

* 使用高德地图进行定位（AMap.Geolocation）和天气查询（AMap.Weather）

### 3.7 消息推送

* 登录时或自动登录状态下进入APP时，获取并绑定clientId
* 手动退出时解绑clientId

### 3.8 左右切换动画

* Tab式切换，平滑左右切换

```js
// 核心代码，举例设备控制页面左右切换
export default {
  data () {
    return {
      transitionName: 'slide-right',
      items: ['CtrlInfo', 'CtrlStatus', 'CtrlThreshold', 'CtrlAlarm', 'CtrlFault']
    }
  },
  watch: {
    '$route' (to, from) {
      let toDepth = this.items.indexOf(to.name)
      let fromDepth = this.items.indexOf(from.name)
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
```

* 列表式切换，层级左右切换

```js
// 核心代码，举例我的页面从列表切换到页面，进入和返回效果
export default {
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  watch: {
    '$route' (to, from) {
      let toDepth = to.name
      this.transitionName = toDepth === 'UserList' ? 'slide-right' : 'slide-left'
    }
  }
}
```

### 3.9 安卓返回取消弹层

### 3.10 头像裁剪上传

## 4 标准规范

### 4.1 组件文件位置

* 公共组件，扩展性强，适用于其他项目，放在`src/components/hk-ui/`中，以`hk-`命名
* 公共业务组件，偏向于业务型公用组件，放在`src/components/pages/`中
* 某个页面使用的小组件，直接放在页面路径里

### 4.2 Router规范

* router的name首字母大写驼峰命名
* 合理使用push和replace
* push和replace一律使用name跳转

## 5 TodoList

- [x] 登陆、注册、忘记密码、找回密码功能
- [x] 绑定clientId，退出解绑
- [x] 接口拦截  统一处理错误消息、get请求统一加入随机数
- [x] matrix方法测试环境集成
- [x] zip自动更新
- [x] 安卓返回键集成
- [x] 扫码绑定流程
- [x] 集成调试工具vconsole
- [x] 集成图片预览插件
- [x] 使用rem
- [x] 引入fastClick
- [x] 头像裁剪上传
- [ ] 骨架屏
- [ ] 图片懒加载
- [ ] 天气图标

