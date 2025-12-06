import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LatestSubmissionEntry } from "@/app/(Kambaz)/Models/QuizSubmission";

interface QuizSubmissionState {
  quizSubmissions: LatestSubmissionEntry[];
}

const initialState: QuizSubmissionState = {
  quizSubmissions: [],
};

const quizSubmissionSlice = createSlice({
  name: "quizSubmissions",
  initialState,
  reducers: {
    setQuizSubmissions: (
      state,
      { payload }: PayloadAction<LatestSubmissionEntry[]>
    ) => {
      state.quizSubmissions = payload;
    },
  },
});

export const { setQuizSubmissions } = quizSubmissionSlice.actions;
export default quizSubmissionSlice.reducer;