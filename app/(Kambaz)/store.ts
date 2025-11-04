import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import todosReducer from "../Labs/Lab4/ReduxExamples/todos/todosReducer";
import counterReducer from "../Labs/Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Labs/Lab4/ReduxExamples/AddRedux/addReducer";

const store = configureStore({
 reducer: { 
    coursesReducer,
    modulesReducer,
    accountReducer,
    todosReducer,
    counterReducer,
    addReducer,
    },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;