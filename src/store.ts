import { configureStore } from '@reduxjs/toolkit'
import formulateReducer  from "./features/formulator/formulator.ts";


const store = configureStore({
    reducer: {
        formulate:  formulateReducer
    }
})

export default store

export  type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch