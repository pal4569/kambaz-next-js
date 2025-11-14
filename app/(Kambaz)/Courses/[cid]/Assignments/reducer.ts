import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import db from "../../../Database";
import type Assignment from "../../../Models/Assignment";

const initialState = {
  assignments: db.assignments as Assignment[],
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
        state, 
        { payload }: PayloadAction<Assignment>
    ) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: payload.title,
        course: payload.course,
        description: "",
        points: 0,
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
        editing: false,
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((m) => m._id !== payload);
    },
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((m) =>
        m._id === payload._id ? payload : m
      );
    },
    editAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((m) =>
        m._id === payload ? { ...m, editing: true } : m
      );
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },

  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignments } =
  assignmentSlice.actions;
export default assignmentSlice.reducer;