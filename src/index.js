import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './hoc/Application';
import { Provider } from "react-redux";
import { store } from "./store";
import * as serviceWorker from './serviceWorker';
import { ListContext } from "./context/list";
const inject = {
    name: 'wuweichao.x',
    where: 'shandong'
}
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ListContext.Provider value={inject}>
                <Application />
            </ListContext.Provider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
