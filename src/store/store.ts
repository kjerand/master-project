import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./questions";
import adminReducer from "./admin";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    admin: adminReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
