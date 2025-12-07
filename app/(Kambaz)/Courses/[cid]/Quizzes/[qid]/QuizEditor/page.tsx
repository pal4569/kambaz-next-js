"use client";

import { useAppDispatch, useAppSelector } from "@/app/(Kambaz)/hooks";
import Assignment from "@/app/(Kambaz)/Models/Assignment";
import Quiz from "@/app/(Kambaz)/Models/Quiz";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../../../client";
import { setQuizzes } from "../../reducer";
import { Form, Button } from "react-bootstrap";
import DetailsTab from "./DetailsTab";
import QuestionsTab from "./QuestionsTab";

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const [tab, setTab] = useState<string>("details");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { quizzes } = useAppSelector((state) => state.quizReducer);

  const [form, setForm] = useState<Quiz>({
    _id: "",
    name: "",
    published: false,
    instructions: "",
    course: cid,

    quizType: "", // Graded Quiz (default), Practice Quiz, Graded Survey, Ungraded Survey
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
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid && qid !== "new") {
        const quiz = await client.findQuizById(cid, qid);
        setForm(quiz);
      }
    };

    fetchQuiz();
  }, [qid, cid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let newValue: string | number | boolean = value;

    if (name === "multipleAttempts") {
      newValue = value === "true";
    }

    setForm({ ...form, [name]: newValue });
  };

  const handleSave = async () => {
    if (!form) return;

    if (qid === "new" || !quizzes.some(q => q._id === qid)) {
      const created = await client.createQuizForCourse(cid, form);
      dispatch(setQuizzes([...quizzes, created]));

    } else {
      if (!form || !form._id) return;
      const updated = await client.updateQuiz(form._id, form);

      const newQuizzes = quizzes.map(q =>
        q._id === updated._id ? updated : q
      );

      dispatch(setQuizzes(newQuizzes));
    }

    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <>
      <div className="d-flex justify-content-center gap-3 mb-4">
        <Button variant="secondary" onClick={() => setTab("details")}>
          Details
        </Button>
        <Button variant="secondary" onClick={() => setTab("questions")}>
          Questions
        </Button>
      </div>
      {tab === "details" ? (
        <DetailsTab 
          form={form}
          handleChange={handleChange}
          handleSave={handleSave}
          cid={cid}
        />
      ) : (
        <QuestionsTab 
          form={form}
          setForm={setForm}
          handleSave={handleSave}
        />
      )}
    </>
  );

}