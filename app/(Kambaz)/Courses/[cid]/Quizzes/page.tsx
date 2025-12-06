"use client";

import { useAppSelector } from "@/app/(Kambaz)/hooks";
import Quiz from "@/app/(Kambaz)/Models/Quiz";
import { useParams } from "next/navigation";
import router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dropdown, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import * as client from "../../client";
import { useDispatch } from "react-redux";
import { setQuizzes } from "./reducer";
import QuizSubmission from "@/app/(Kambaz)/Models/QuizSubmission";
import { setQuizSubmissions } from "./[qid]/QuizSubmissions/reducer";

export default function Quizzes() {
    const { cid } = useParams<{ cid: string }>();
    const { quizzes } = useAppSelector((state) => state.quizReducer);
    const { quizSubmissions } = useAppSelector(
        (state) => state.quizSubmissions
    );
    const router = useRouter();
    const dispatch = useDispatch();
    const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);
    const { currentUser } = useAppSelector((state) => state.accountReducer);

    const onCreateQuizForCourse = async () => {
        if (!cid) return;
        router.push(`/Courses/${cid}/Quizzes/new/QuizEditor`);
    };

    const onRemoveQuiz = (qid: string) => {
        (async () => {
            await client.deleteQuiz(qid);
            dispatch(setQuizzes(quizzes.filter((q: Quiz) => q._id !== qid)));
        })();
    };

    const onEditQuiz = (qid: string) => {
        router.push(`/Courses/${cid}/Quizzes/${qid}/QuizEditor`);
    };

    const onTogglePublishQuiz = (qid: string) => {
        const quiz = quizzes.find(q => q._id === qid);
        if (!quiz) return;

        const updated = {
            ...quiz,
            published: !quiz.published
        };
        if (!quiz) return;
        (async () => {
            await client.updateQuiz(qid, updated);
            dispatch(setQuizzes(
                quizzes.map(q => q._id === qid ? updated : q)
            ));
        })();
    };

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
        const fetchQuizzes = async () => {
            const quizzes = await client.findQuizzesForCourse(cid);
            dispatch(setQuizzes(quizzes));
        };
        fetchQuizzes();
    }, [cid]);

    useEffect(() => {
        const fetchQuizSubmissions = async () => {
            if (!cid || !currentUser?._id) return;

            const quizSubmissions = await client.findLatestQuizSubmissionsForCourseUser(
                currentUser._id
            );
            dispatch(setQuizSubmissions(quizSubmissions));
        };

        fetchQuizSubmissions();
    }, [currentUser?._id]);


    return (
        <div className="mt-3" style={{ width: "100%" }}>
            <div 
                id="wd-assignments"
                className="d-flex justify-content-between align-items-center mb-3"
            >

                <div className="position-relative d-inline-block">
                    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-secondary" />
                    <input 
                        type="text"
                        className="form-control ps-5"
                        placeholder="Search..."
                        id="wd-search-assignment"
                    />
                </div>

                <div className="d-flex align-items-center gap-2">
                    <button 
                        id="wd-add-assignment"
                        className="btn btn-danger"
                        onClick={onCreateQuizForCourse}
                    >
                        + Quiz
                    </button>

                    <Dropdown align="end">
                    <Dropdown.Toggle 
                        variant="light" 
                        bsPrefix="p-0 border-0 bg-transparent"
                    >
                        <IoEllipsisVertical className="fs-4" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => currentQuizId && onEditQuiz(currentQuizId)}>
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => currentQuizId && onRemoveQuiz(currentQuizId)}>
                            Delete
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => currentQuizId && onTogglePublishQuiz(currentQuizId)}>
                            Publish / Unpublish
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => console.log("Copy clicked")}>
                            Copy
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => console.log("Sort clicked")}>
                            Sort
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <br /><br /><br /><br />
            <ListGroup id="wd-modules" className="rounded-0 mt-0">
                {quizzes.map((quiz: Quiz) => {

                    const now = new Date();
                    const availableDate = new Date(quiz.available);
                    const untilDate = new Date(quiz.untilDate);
                    const latest = quizSubmissions.find(
                        (s) => s.quizId === quiz._id
                    );
                    let availabilityLabel = "";
                    if (now > untilDate) {
                    availabilityLabel = "Closed";
                    } else if (now >= availableDate && now <= untilDate) {
                    availabilityLabel = "Available";
                    } else {
                    availabilityLabel = `Not available until ${availableDate.toLocaleString()}`;
                    }

                    return (
                    ((currentUser?.role !== "STUDENT") || (quiz.published && (now >= availableDate && now <= untilDate))) && (
                        <ListGroupItem
                            key={quiz._id}
                            className={`wd-quiz p-0 mb-2 fs-5 border-4 ${currentQuizId === quiz._id ? "border-primary" : "border-black"}`}
                            onClick={() => setCurrentQuizId(quiz?._id)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="wd-title p-3 ps-2 bg-white d-flex align-items-center">
                                <div style={{ display: "inline-block" }} className="ms-4">
                                    
                                    <b 
                                        className="fs-4"
                                        onClick={() => {
                                            if (currentUser?.role === "STUDENT") {
                                                router.push(`/Courses/${cid}/Quizzes/${quiz._id}/QuizPreview`);
                                            }
                                            else {
                                                router.push(`/Courses/${cid}/Quizzes/${quiz._id}/QuizDetails`);
                                            }
                                        }}
                                    >{quiz.name}</b>

                                    <div>
                                        <b>{availabilityLabel}</b>
                                        <span> | </span>
                                        <b>Due {formatDate(quiz.dueDate)}</b>
                                        <span> | </span>
                                        <b>{quiz.points} Points</b>
                                        <span> | </span>
                                        <b>{quiz.questions.length} Questions</b>
                                    </div>

                                </div>
                                {currentUser?.role === "STUDENT" && latest && (
                                    <button
                                        className="btn btn-outline-primary ms-4"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(
                                                `/Courses/${cid}/Quizzes/${quiz._id}/QuizSubmissions/${latest.latestSubmission._id}/QuizSubmissionDetails`
                                            );
                                        }}
                                    >
                                        See Latest Submission
                                    </button>
                                )}

                                
                                {quiz.published 
                                    ? <span className="ms-auto fs-3">Published ✅</span> 
                                    : <span className="ms-auto fs-3">Unpublished 🚫</span> }
                            </div>
                        </ListGroupItem>
                    ));
                })}
            </ListGroup>
        </div>
    );
}
