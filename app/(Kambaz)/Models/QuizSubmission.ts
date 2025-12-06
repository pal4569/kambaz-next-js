import Answer from "./Answer";

export interface LatestSubmissionEntry {
  quizId: string;
  latestSubmission: QuizSubmission;
}

export default interface QuizSubmission {
    _id: string;
    quizId: string;
    userId: string;

    submittedAt: string;
    score: number,
    totalPoints: number,

    answers: Answer[];
}