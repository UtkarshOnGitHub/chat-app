import { legacy_createStore , combineReducers , compose , applyMiddleware} from "redux";
import thunk from "redux-thunk"
import { chatReducer } from "./store/reducers";
import { userReducer } from "./store/users/reducer";





const rootReducer = combineReducers({
    chat:chatReducer,
    user:userReducer
})
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer , createComposer(applyMiddleware(thunk)))