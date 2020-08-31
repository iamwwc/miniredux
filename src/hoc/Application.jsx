import Application from '../components/Application'
import { ListContext } from '../context/list'
import React from "react";
Application.WrappedComponent.contextType = ListContext
class ApplicationHOC extends React.Component {
    render() {
        // Provider确保变量注入到全部子组件中，可以通过this.context获得
        // Consumer则用于订阅context变量变化，可以导致下面的函数被重新渲染
        return (
            <ListContext.Consumer>
                {(props) => {
                    return (
                        <Application {...props}></Application>
                    )
                }}
            </ListContext.Consumer>
        )
    }
}
export default ApplicationHOC