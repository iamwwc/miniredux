import React from 'react'
import { connect } from "react-redux";
import { SET_MESSAGE, SET_TRENDINGS } from '../constant'
import { ListContext } from "../context/list";
// https://github-trending-api.now.sh/repositories?since=daily
class Application extends React.Component {
    render() {
        debugger
        return (
            <div id="app">
                <div id="greeting">
                    <input type="text" onChange={v => this.handleOnChange(v)} placeholder="hello world" />
                    <div>{this.props.message}</div>
                </div>
                <br></br>
                <div className="trendings">
                    <span id="title">今日Github流行</span>
                    <ol>
                        {
                            this.props.trendings.map(t => {
                                return (
                                    <li key={t.url}>{t.description}</li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
    handleOnChange(v) {
        this.props.setMessage(v.target.value)
    }
    componentDidMount() {
        // 我原本的错误认识是
        // 异步请求结束获得数据setState更新，再dispatch到redux，总想着得到异步数据之后再初始化store
        // 为此查了好多dispatch如何返回Promise的文档，其实完全是歧路。
        // 而正确的做法是异步请求结束直接dispatch的redux的state，connec封装的HOC会订阅store的变化
        // 自动为我们触发组件更新
        // 这样整个思路都缕清晰了，突然觉着redux并没有那么难懂
        // https://stackoverflow.com/a/40386189/7529562
        // 有时组件渲染依赖于state中变量x，但异步请求数据还没返回导致组件渲染时x可能为undefined
        // 这时组件渲染就会报错，解决办法判断x若为undefined就给个默认值
        (async function () {
            // 不同的组件往往依赖部分相同的数据，需要将异步函数拿出来调用，之前我是用redux-thunk，直接将action写成异步。
            // 其实应该将api调用放在单独的文件，本身不依赖任何redux的东西。
            // 需要数据就去取，取完之后同步调用dispatch到store中，就不需要将action用thunk搞成异步
            // 而且thunk搞成的异步action特别难用
            const result = await (await fetch('https://github-trending-api.now.sh/repositories?since=daily')).json()
            this.props.setTrendings(result)
        }.bind(this)())
    }
}

Application.contextType = ListContext

function mapStateToProps(state) {
    return {
        message: state.message,
        trendings: state.trendings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setMessage: msg => dispatch({ type: SET_MESSAGE, payload: msg }),
        setTrendings: t => dispatch({ type: SET_TRENDINGS, payload: t })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)
