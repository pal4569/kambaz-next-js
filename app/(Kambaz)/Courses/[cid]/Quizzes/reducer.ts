import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type Quiz from "../../../Models/Quiz";

interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (
        state, 
        { payload }: PayloadAction<Quiz>
    ) => {
      const newQuiz: Quiz = {
        _id: uuidv4(),
        name: "",
        published: false,
        instructions: "",
        course: "",

        quizType: "Graded Quiz", // Graded Quiz (default), Practice Quiz, Graded Survey, Ungraded Survey
        points: 0,
        assignmentGroup: "", // Quizzes (default), Exams, Assignments, Project
        shuffleAnswers: true, // true default
        timeLimit: 20, // 20 mins default
        multipleAttempts: false, // false default
        howManyAttempts: 1, // 1 default
        showCorrectAnswers: "",
        accessCode: "",
        oneQuestionAtATime: true, // true default
        webcamRequired: false,  // false default
        lockQuestionsAfterAnswering: false, // false default
        viewResponses: false,
        requireLockdown: false,
        requireResults: false,

        questions: [],

        dueDate: "",
        available: "",
        untilDate: "",
      };
      state.quizzes = [...state.quizzes, newQuiz];
    },
    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((m) => m._id !== payload);
    },
    updateQuiz: (state, { payload }: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((m) =>
        m._id === payload._id ? payload : m
      );
    },
    editQuiz: (state, { payload }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === payload ? { ...q, editing: true } : q
      );
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

  },
});
export const { addQuiz, deleteAssignment, updateQuiz, editQuiz, setQuizzes } =
  quizSlice.actions;
export default quizSlice.reducer;