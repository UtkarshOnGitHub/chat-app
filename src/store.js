import { legacy_createStore , combineReducers , compose , applyMiddleware} from "redux";
import thunk from "redux-thunk"
import { chatReducer } from "./store/chat/reducers";
import { userReducer } from "./store/users/reducer";
import conversationReducer from "./store/conversation/reducer";





const rootReducer = combineReducers({
    chat:chatReducer,
    user:userReducer,
    conversation:conversationReducer
})
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer , createComposer(applyMiddleware(thunk)))