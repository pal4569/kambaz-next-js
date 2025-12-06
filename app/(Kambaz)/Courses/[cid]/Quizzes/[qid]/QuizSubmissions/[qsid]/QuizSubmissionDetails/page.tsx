"use client"

import Quiz from "@/app/(Kambaz)/Models/Quiz";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../../../../../client";
import QuizSubmission from "@/app/(Kambaz)/Models/QuizSubmission";
import Answer from "@/app/(Kambaz)/Models/Answer";

export default function QuizSubmissionDetails() {
    const { cid, qid, qsid } = useParams<{ cid: string; qid: string; qsid: string }>();
    const [quiz, setQuiz] = useState<Quiz>({
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

    const [quizSubmission, setQuizSubmission] = useState<QuizSubmission>({
        _id: "",
        quizId: "",
        userId: "",

        submittedAt: "",
        score: 0,
        totalPoints: 1,

        answers: [],
    });

    function formatDate(dateString: string | null) {
        if (!dateString) return "No date";

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid date";

        const datePart = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
        }).format(date);

        const timePart = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).format(date).toLowerCase();

        return `${datePart} at ${timePart}`;
    }


    useEffect(() => {
        const fetchQuiz = async () => {
            if (qid && qid !== "new") {
                const quiz = await client.findQuizById(cid, qid);
                setQuiz(quiz);
            }
        };

        fetchQuiz();
    }, [qid, cid]);

    useEffect(() => {
        const fetchQuizSubmission = async () => {
            if (qsid && qsid !== "new") {
                const quizSubmission = await client.findQuizSubmissionById(qsid);
                setQuizSubmission(quizSubmission);
            }
        };

        fetchQuizSubmission();
    }, [qsid]);

    return (
        <div>
            <h1>Submission for {quiz.name}</h1>
            <h3>Submission Details: </h3>
            <p>Score {(quizSubmission.score / quizSubmission.totalPoints) * 100}%</p>
            <p>Submission time: {formatDate(quizSubmission.submittedAt)}</p>
            {quiz.questions.map((question, index) => {
                const studentAnswer = quizSubmission.answers[index];

                if (!studentAnswer) {
                    return (
                        <div key={index}>
                        <h3>{question.title}</h3>
                        <p>{question.questionText}</p>
                        <p className="text-warning">No answer recorded.</p>
                        </div>
                    );
                }

                return (
                    <div key={index}>
                        <h3>{question.title}</h3>
                        <p>{question.questionText}</p>
                        {question.questionType === "true-false" && (
                            <>
                                <b>Your answer: {String(studentAnswer.trueFalse)}</b>

                                {studentAnswer.trueFalse === question.correctBoolean ? (
                                    <p className="text-success fw-bold">Correct</p>
                                ) : (
                                    <div>
                                        <p className="text-danger fw-bold">Incorrect</p>
                                        <p>Correct Answer: {String(question.correctBoolean)}</p>
                                    </div>
                                )}
                            </>
                        )}
                        
                        {question.questionType === "multiple-choice" && (
                        <>
                            <p>
                            <b>Your answer:{" "}
                                {
                                question.choices.find(
                                    (c) => c._id === studentAnswer.selectedChoices[0]
                                )?.text
                                }
                            </b>
                            </p>

                            {(() => {
                            const correctChoice =
                                question.choices.find((c) => c.isCorrect);

                            const isCorrect =
                                studentAnswer.selectedChoices[0] === correctChoice?._id;

                            return isCorrect ? (
                                <p className="text-success fw-bold">Correct</p>
                            ) : (
                                <div>
                                <p className="text-danger fw-bold">Incorrect</p>
                                <p>
                                    Correct Answer: <b>{correctChoice?.text}</b>
                                </p>
                                </div>
                            );
                            })()}
                        </>
                        )}

                        {question.questionType === "fill-in-the-blank" && (
                        <>
                            <p>
                            <b>Your answer: {studentAnswer.fillIn || "(no answer)"}</b>
                            </p>

                            {(() => {
                            const correctText = question.correctText?.trim().toLowerCase() ?? "";
                            const studentText = studentAnswer.fillIn?.trim().toLowerCase() ?? "";

                            const isCorrect = studentText === correctText;

                            return isCorrect ? (
                                <p className="text-success fw-bold">Correct</p>
                            ) : (
                                <div>
                                <p className="text-danger fw-bold">Incorrect</p>
                                <p>
                                    Correct Answer: <b>{question.correctText}</b>
                                </p>
                                </div>
                            );
                            })()}
                        </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}