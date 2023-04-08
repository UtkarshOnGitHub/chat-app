import { legacy_createStore , combineReducers , compose , applyMiddleware} from "redux";
import thunk from "redux-thunk"
import { chatReducer } from "./store/reducers";





const rootReducer = combineReducers({
    chat:chatReducer
})
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer , createComposer(applyMiddleware(thunk)))