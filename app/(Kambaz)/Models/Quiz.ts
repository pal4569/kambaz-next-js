import { Question } from "./Question";

export default interface Quiz {
  _id : string;
  name: string;
  published?: boolean;
  instructions: string;
  course: string;

  quizType: string; // Graded Quiz (default), Practice Quiz, Graded Survey, Ungraded Survey
  points: number;
  assignmentGroup: string; // Quizzes (default), Exams, Assignments, Project
  shuffleAnswers: boolean; // true default
  timeLimit: number; // 20 mins default
  multipleAttempts: boolean; // false default
  howManyAttempts: number; // 1 default
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean; // true default
  webcamRequired: boolean; // false default
  lockQuestionsAfterAnswering: boolean; // false default
  viewResponses: boolean;
  requireLockdown: boolean;
  requireResults: boolean;
  
  questions: Question[];
  
  dueDate: string;
  available: string;
  untilDate: string;
}