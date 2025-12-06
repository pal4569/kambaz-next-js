"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../../../client";
import Quiz from "@/app/(Kambaz)/Models/Quiz";
import { Button, Form } from "react-bootstrap";
import Answer from "@/app/(Kambaz)/Models/Answer";
import { useAppSelector } from "@/app/(Kambaz)/hooks";
import { v4 as uuidv4 } from "uuid";

export default function QuizPreview() {
    const { cid, qid } = useParams<{ cid: string; qid: string }>();
    const [page, setPage] = useState(0);
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
    const [answers, setAnswers] = useState<Answer[]>([]);
    const { currentUser } = useAppSelector((state) => state.accountReducer);
    const router = useRouter();

    const handleTrueFalse = (value: boolean) => {
        setAnswers(prev => {
            const copy = [...prev];
            const current = { ...copy[page] };

            current.trueFalse = value;
            copy[page] = current;
            return copy;
        });
    };

    const handleMultipleChoice = (choiceId: string) => {
        setAnswers(prev => {
            const copy = [...prev];
            const current = { ...copy[page] };

            current.selectedChoices = [choiceId];
            copy[page] = current;
            return copy;
        });
    };

    const handleFillIn = (value: string) => {
        setAnswers(prev => {
            const copy = [...prev];
            const current = { ...copy[page] };

            current.fillIn = value;
            copy[page] = current;

            return copy;
        });
    };


    function computeScore(quiz: Quiz, answers: Answer[]) {
        let score = 0;

        quiz.questions.forEach((question, index) => {
            const studentAnswer = answers[index];
            if (!studentAnswer) return;

            if (question.questionType === "true-false") {
                if (studentAnswer.trueFalse === question.correctBoolean) {
                    score += question.points ?? 1;
                }
            }

            if (question.questionType === "multiple-choice") {
                const correctChoice = question.choices.find(c => c.isCorrect);
                if (correctChoice && studentAnswer.selectedChoices[0] === correctChoice._id) {
                    score += question.points ?? 1;
                }
            }

            if (question.questionType === "fill-in-the-blank") {
                if (
                    studentAnswer.fillIn.trim().toLowerCase() ===
                    question.correctText?.trim().toLowerCase()
                ) {
                    score += question.points ?? 1;
                }
            }

        });

        return score;
    }

    const handleSubmit = () => {
        if (!currentUser) return;

        const score = computeScore(quiz, answers);

        const submission = {
            _id: uuidv4(),
            quizId: qid,
            userId: currentUser._id ?? "",
            submittedAt: new Date().toISOString(),

            score: score,
            totalPoints: quiz.points,
            answers: answers,
        }
        client.createQuizSubmission(qid, submission);
        router.push(`/Courses/${cid}/Quizzes`)
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
        if (quiz) {
            setAnswers(
                quiz.questions.map(q => ({
                    questionId: q._id,
                    selectedChoices: [],
                    trueFalse: null,
                    fillIn: "",
                    correct: false
                }))
            );
        }
    }, [quiz]);

    if (!quiz.questions.length || !answers.length) {
        return <h2>Loading...</h2>;
    }
    else {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "10vh" }}>
                <div className="text-center">
                    <h1>{quiz.name}</h1>
                    <hr />
                    <h3>{quiz.questions[page].title}</h3>
                    <p>{quiz.questions[page].questionText}</p>
                    {quiz.questions[page].questionType === "true-false" && (
                        <div className="d-flex justify-content-center gap-4 mt-3">
                            <p className="fw-bold">True or False</p>
                            <Form.Check 
                                type="radio"
                                label="True"
                                name={`tf-${page}`}
                                checked={answers[page]?.trueFalse === true}
                                onChange={() => handleTrueFalse(true)}
                            />
                            <Form.Check 
                                type="radio"
                                label="False"
                                name={`tf-${page}`}
                                checked={answers[page]?.trueFalse === false}
                                onChange={() => handleTrueFalse(false)}
                            />
                        </div>
                    )}
                    {quiz.questions[page].questionType === "multiple-choice" && (
                        <div className="d-flex justify-content-center gap-4 mt-3">
                            <p className="fw-bold">Select One</p>

                            <div className="d-flex flex-column gap-3">
                                {quiz.questions[page].choices.map(choice => (
                                    <Form.Check
                                        key={choice._id}
                                        type="radio"
                                        name={`mc-${page}`}
                                        label={choice.text}
                                        checked={answers[page]?.selectedChoices?.includes(choice._id)}
                                        onChange={() => handleMultipleChoice(choice._id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {quiz.questions[page].questionType === "fill-in-the-blank" && (
                    <div className="d-flex flex-column align-items-center mt-3" style={{ width: "100%" }}>
                        <p className="fw-bold">Enter Your Answer</p>

                        <Form.Control
                        type="text"
                        placeholder="Type your answer here"
                        value={answers[page]?.fillIn ?? ""}
                        onChange={(e) => handleFillIn(e.target.value)}
                        style={{ maxWidth: "400px" }}
                        />
                    </div>
                    )}
                    <hr />
                    {page > 0 &&             
                    <Button 
                        className="ms-3 me-3"
                        onClick={() => setPage(page - 1)}>
                        🡨 Prev
                    </Button>
                    }
                    {page < quiz.questions.length - 1 &&             
                    <Button 
                        className="ms-3 me-3"
                        onClick={() => setPage(page + 1)}>
                        Next 🡪
                    </Button>
                    }
                    {page == quiz.questions.length - 1 &&             
                    <Button
                        variant="secondary"
                        className="ms-3 me-3"
                        onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                    }
                <div className="mt-5">
                    {quiz.questions.map((question, index) => (
                        <p 
                            key={index}
                            onClick={() => setPage(index)}
                            className={page === index ? "text-primary fw-bold" : "text-dark"}
                            style={{ cursor: "pointer" }}
                        >
                        ❓Question {index + 1}</p>
                    ))}
                </div>
                </div>
            </div>
        );
    }
}