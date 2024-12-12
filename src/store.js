import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user"
import { postReducer } from "./reducers/post"
import { authReducer } from "./reducers/auth"

export const store = configureStore({
    reducer:{
        user:userReducer,
        post:postReducer,
        auth:authReducer
    }
}) 