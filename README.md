# my-todolist

一个基于 `React + TypeScript + Vite` 搭建的前端练习项目。

这个项目以 `Todo List` 为核心，分别使用多种状态管理方案实现同一套功能页面，同时补充了一个基于 `Ant Design` 的表单页面，适合用来学习 React 组件拆分、状态管理、路由组织、表单处理以及基础工程化结构。

## 项目特点

- 同一套 Todo 功能，分别使用 `useState`、`Redux Toolkit`、`Context + useReducer`、`Zustand` 实现
- 不同状态管理方案共用一致的 UI 交互体验，便于横向对比学习
- 使用 `React Router` 组织页面与路由
- 使用 `localStorage` 对 Todo 数据进行本地持久化
- 使用 `Ant Design` 构建表单页面
- 使用 `TypeScript` 为状态、组件 Props、Action、Store 提供类型约束

## 功能说明

### 1. Todo 模块

Todo 页面支持以下基础功能：

- 新增待办事项
- 删除待办事项
- 标记完成 / 取消完成
- 按 `all / active / completed` 进行筛选
- 编辑已有 Todo
- 统计总数、未完成数、已完成数
- 本地持久化保存

为了方便学习，本项目将同一套 Todo 功能分别实现为四个版本：

- `useState` 版本
- `Redux Toolkit` 版本
- `Context + useReducer` 版本
- `Zustand` 版本

这些版本在页面表现上保持一致，主要区别在于状态的组织和更新方式不同。

### 2. Form 模块

表单页面基于 `Ant Design Form` 实现，包含以下内容：

- 用户名
- 邮箱
- 手机号
- 性别
- 年龄
- 学历
- 技能
- 可工作日期
- 个人简介
- 协议勾选

同时实现了：

- 表单校验
- 提交 loading 状态
- 模拟异步请求提交
- 成功 / 失败消息提示
- 表单重置

## 技术栈

- React 19
- TypeScript
- Vite
- React Router DOM
- Redux Toolkit
- React Redux
- Zustand
- Ant Design
- ESLint

## 运行项目

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

启动后在浏览器中打开终端提示的本地地址即可。

### 3. 打包构建

```bash
npm run build
```

### 4. 本地预览构建结果

```bash
npm run preview
```

### 5. 代码检查

```bash
npm run lint
```

## 目录结构

```text
my-todolist
├─ public
├─ src
│  ├─ app                  # Redux store 配置
│  ├─ components           # 通用 UI 组件
│  ├─ context              # Context 相关状态管理实现
│  ├─ features
│  │  └─ todo              # 各种 Todo 实现版本
│  ├─ hooks                # 自定义 hooks
│  ├─ pages                # 页面级组件
│  ├─ router               # 路由配置
│  ├─ services             # 本地存储、模拟接口等服务
│  ├─ store                # Redux / Zustand 相关状态管理文件
│  ├─ types                # 全局类型定义
│  ├─ index.css            # 全局样式
│  └─ main.tsx             # 应用入口
├─ package.json
└─ README.md
```

## 核心学习点

通过这个项目可以重点练习和理解：

- React 组件拆分与复用
- Props 传值与事件回调
- `useState` 管理局部状态
- `useReducer` 与 `Context` 管理共享状态
- `Redux Toolkit` 中 `slice`、`store`、`dispatch`、`selector` 的使用
- `Zustand` 中 store 的定义与消费方式
- 使用 `localStorage` 做前端持久化
- 使用 `Ant Design Form` 完成表单开发与校验
- 使用 `React Router` 管理页面切换

## 本地持久化说明

Todo 数据会根据不同实现版本分别保存在浏览器的 `localStorage` 中，不同版本之间互不影响。当前项目中使用了以下 key：

- `todos-use-state`
- `todos-redux`
- `todos-zustand`
- `todos-context`

这样做的好处是：

- 每种状态管理方案都可以单独测试
- 不同版本的数据不会互相覆盖
- 便于对比不同实现方式下的数据流

## 项目说明

这个项目更偏向于学习型和演示型项目，重点不在复杂业务，而在于：

- 用统一的功能场景对比不同状态管理方案
- 在同一个项目中练习路由、组件、表单和持久化
- 逐步形成更清晰的前端工程结构

如果后续继续扩展，可以考虑加入：

- 单元测试
- 自定义主题切换
- 接入真实后端接口
- Todo 分类、搜索、拖拽排序
- 更完整的文档和演示截图

## 作者说明

这是一个适合作为 React 学习记录与状态管理对比示例的小项目。

如果你正在学习 React，这个项目很适合用来练习：

- 从简单的 `useState` 开始
- 逐步过渡到 `Context`、`Redux Toolkit`、`Zustand`
- 比较不同方案在代码组织上的差异

