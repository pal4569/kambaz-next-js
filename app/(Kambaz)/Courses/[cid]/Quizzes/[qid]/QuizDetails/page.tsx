"use client";

import Quiz from "@/app/(Kambaz)/Models/Quiz";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../../../client";
import { Button } from "react-bootstrap";

export default function QuizDetails() {
    const { cid, qid } = useParams<{ cid: string; qid: string }>();
    const [quiz, setQuiz] = useState<Quiz>();
    const router = useRouter();

    function formatDate(dateString: string) {
        const date = new Date(dateString);

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
    return (
        <>
            <div className="d-flex justify-content-center gap-3 mb-4">
                <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/QuizPreview`)}>
                    Preview
                </Button>
                <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/QuizEditor`)}>
                    Edit
                </Button>
            </div>
            <div className="justify-content-center gap-3 mb-4">
                <h1>{quiz?.name}</h1>
                <p>Points | {quiz?.points}</p>
                <p>Assignment Group | {quiz?.assignmentGroup}</p>
                <p>Shuffle Answers | {quiz?.shuffleAnswers ? "Yes" : "No"}</p>
                <p>Time Limit | {quiz?.timeLimit} minutes</p>
                <p>Multiple Attempts | {quiz?.multipleAttempts}</p>
                <p>View Responses | {quiz?.viewResponses}</p>
                <p>Show Correct Answers | {quiz?.showCorrectAnswers}</p>
                <p>One Question at a Time | {quiz?.oneQuestionAtATime ? "Yes" : "No"}</p>
                <p>Require Respondus LockDown Browser | {quiz?.requireLockdown}</p>
                <p>Require to View Quiz Results | {quiz?.requireResults ? "Yes" : "No"}</p>
                <p>Webcam Required | {quiz?.webcamRequired ? "Yes" : "No"}</p>
                <p>Lock Questions After Answering | {quiz?.webcamRequired ? "Yes" : "No"}</p>
                <hr />
                <div className="row text-center fw-bold mb-2">
                    <div className="col">Due</div>
                    <div className="col">For</div>
                    <div className="col">Available from</div>
                    <div className="col">Until</div>
                </div>
                <div className="row text-center mb-2">
                    {quiz?.dueDate && <div className="col">{formatDate(quiz.dueDate)}</div>}
                    <div className="col">Everyone</div>
                    {quiz?.available && <div className="col">{formatDate(quiz.available)}</div>}
                    {quiz?.untilDate && <div className="col">{formatDate(quiz.untilDate)}</div>}
                </div>
            </div>
        </>
    );
}