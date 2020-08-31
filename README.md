## 简单介绍

一个简单的react，redux应用

使用了一个接口来获取现在流行的Github项目。

同时也揭示了redux如何配合异步请求来更新数据、触发组件的重新渲染。

另外：

1. 演示如何使用React.Provider和Consumer
## 问题发现

Application.tsx展示了如何在组件中预取数据dispatch到store中，但异步代码耦合在组件代码中无法被其他组件逻辑复用

## 存在的问题

我们经常要将异步请求从组件中剥离做成一个单独的函数，不同组件需要这些数据时都可以来调用这个async函数来获取相同的数据。
async函数得到数据后dispatch更新到store

#### 为什么？

组件之间存在依赖，往往需要获取其他组件所需数据中的某个字段

问题在于非组件函数无法使用connect获得dispatch，也就无法更新store。

## 这里有两个中间件都可以解决

https://juejin.im/entry/6844903508571848717

1. redux-thunk
2. redux-saga
