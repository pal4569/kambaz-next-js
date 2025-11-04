import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/[cid]/Assignments/reducer";
import todosReducer from "../Labs/Lab4/ReduxExamples/todos/todosReducer";
import counterReducer from "../Labs/Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Labs/Lab4/ReduxExamples/AddRedux/addReducer";
import helloReducer from "../Labs/Lab4/ReduxExamples/HelloRedux/helloReducer";

export const store = configureStore({
 reducer: { 
    coursesReducer,
    modulesReducer,
    accountReducer,
    todosReducer,
    counterReducer,
    addReducer,
    helloReducer,
    assignmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;