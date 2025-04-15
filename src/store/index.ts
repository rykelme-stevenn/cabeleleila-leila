import { configureStore } from "@reduxjs/toolkit";
import user  from './reducers/user/index'
import services  from "./reducers/services/services";
import scheduling from './reducers/scheduling/scheduling'

export const store = configureStore({
    reducer: {
        user,
        services,
        scheduling
    }
})

export type RootState = ReturnType<typeof store.getState>