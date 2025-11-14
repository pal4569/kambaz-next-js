import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import db from "../Database";
import { v4 as uuidv4 } from "uuid"
import Enrollment from "../Models/Enrollment"

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: db.enrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
 name: "enrollments",
 initialState,
 reducers: {
   addNewEnrollment: (state, action: PayloadAction<Enrollment>) => {
     const newEnrollment: Enrollment = { ...action.payload, _id: uuidv4() };
     state.enrollments = [...state.enrollments, newEnrollment];
   },
    deleteEnrollment: (state, action: PayloadAction<string>) => {
      state.enrollments = state.enrollments.filter(
      (enrollment) => enrollment._id !== action.payload
     );
    },
   updateEnrollment: (state, action: PayloadAction<Enrollment>) => {
     state.enrollments = state.enrollments.map((e) =>
        e._id === action.payload._id ? action.payload : e
      );
   },
   setEnrollments: (state, { payload: enrollments }) => {
     state.enrollments = enrollments;
   },
 },
});
export const { addNewEnrollment, deleteEnrollment, updateEnrollment, setEnrollments } =
 enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;