import Choice from "./Choice";

export interface Question {
  _id: string;
  title: string;
  points: number;
  questionText: string;
  questionType: "multiple-choice" | "true-false" | "fill-in-the-blank";

  choices: Choice[]

  correctBoolean: boolean | null;
  correctText: string | null;

  answers?: string[];
}
