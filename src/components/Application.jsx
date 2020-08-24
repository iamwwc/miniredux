import React from 'react'
import { connect } from "react-redux";
import { SET_MESSAGE, SET_TRENDINGS } from '../constant'

// https://github-trending-api.now.sh/repositories?since=daily
class Application extends React.Component {
    render() {
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
        (async function () {
            const result = await (await fetch('https://github-trending-api.now.sh/repositories?since=daily')).json()
            this.props.setTrendings(result)
        }.bind(this)())
    }
}

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