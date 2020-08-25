import { createStore } from 'redux'
import reducers from './reducers'
let enhancer = undefined
if (process.env.NODE_ENV === 'development'){
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true
    })
}

export const store = createStore(reducers,enhancer)