import { SET_MESSAGE , SET_TRENDINGS} from "../constant";

const initialState = {
    message: 'hello world',
    trendings: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_MESSAGE: {
            return {
                ...state,
                message: action.payload
            }
        }
        case SET_TRENDINGS: {
            return {
                ...state,
                trendings: action.payload
            }
        }
        default: return state
    }
}