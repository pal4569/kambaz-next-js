import { Question } from "@/app/(Kambaz)/Models/Question";
import Quiz from "@/app/(Kambaz)/Models/Quiz";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

interface DetailsTabProps {
  form: Quiz;
  setForm: React.Dispatch<React.SetStateAction<Quiz>>;
  handleSave: () => Promise<void>;
}

export default function QuestionsTab({form, setForm, handleSave}: DetailsTabProps) {
    const handleQuizChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;

        setForm(prev => {
            const updatedQuestions = [...prev.questions];
            updatedQuestions[index] = {
                ...updatedQuestions[index],
                [name]: value
            };
            return { ...prev, questions: updatedQuestions };
        });
    };


    const setCorrectBoolean = (qIndex: number, value: boolean) => {
        const updated = [...form.questions];
        updated[qIndex].correctBoolean = value;
        setForm(prev => ({ ...prev, questions: updated }));
    };

    const addChoice = (qIndex: number) => {
        setForm(prev => {
            const updated = [...prev.questions];
            updated[qIndex].choices.push({
                _id: uuidv4(),
                text: "",
                isCorrect: false
            });
            return { ...prev, questions: updated };
        });
    };

    const removeChoice = (qIndex: number, cIndex: number) => {
        setForm(prev => {
            const updated = [...prev.questions];
            updated[qIndex].choices.splice(cIndex, 1);
            return { ...prev, questions: updated };
        });
    };


    const updateChoiceText = (qIndex: number, cIndex: number, value: string) => {
        setForm(prev => {
            const updated = [...prev.questions];
            updated[qIndex].choices[cIndex].text = value;
            return { ...prev, questions: updated };
        });
    };


    const setCorrectChoice = (qIndex: number, cIndex: number) => {
        setForm(prev => {
            const updated = [...prev.questions];

            updated[qIndex].choices = updated[qIndex].choices.map((choice, idx) => ({
                ...choice,
                isCorrect: idx === cIndex
            }));

            return { ...prev, questions: updated };
        });
    };

    const handleQuizChangeNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;

        setForm(prev => {
            const updated = [...prev.questions];
            updated[index] = {
                ...updated[index],
                [name]: Number(value)
            };
            return { ...prev, questions: updated };
        });
    };


    const handleNewQuestion = () => {
        setForm(prev => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    _id: uuidv4(),
                    title: "",
                    points: 0,
                    questionText: "",
                    questionType: "multiple-choice",
                    choices: [
                        { _id: uuidv4(), text: "", isCorrect: false },
                        { _id: uuidv4(), text: "", isCorrect: false }
                    ],
                    correctBoolean: null,
                    correctText: null,
                    answers: []
                }
            ]
        }));
    };

    const removeQuestion = (qIndex: number) => {
        setForm(prev => {
            const updated = [...prev.questions];
            updated.splice(qIndex, 1);
            return { ...prev, questions: updated };
        });
    };

    const updateFillInCorrectAnswer = (qIndex: number, value: string) => {
        setForm((prev) => {
            const updated = { ...prev };
            updated.questions[qIndex].correctText = value;
            return updated;
        });
    };

    return (
        <div>
            <h1 className="d-flex justify-content-center mb-3">Questions Tab</h1>
            {form.questions.map((question, index) => (
                <div key={index}>
                    <Form key={question._id}>
                        <h3 className="text-center">Question {index + 1}</h3>

                        <div className="d-flex gap-3 justify-content-center align-items-start mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                    name="title" 
                                    value={question.title} 
                                    onChange={(e) => handleQuizChange(e, index)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Question Type</Form.Label>
                                <Form.Select
                                    name="questionType"
                                    value={question.questionType}
                                    onChange={(e) => handleQuizChange(e, index)}
                                >
                                    <option value="multiple-choice">Multiple Choice</option>
                                    <option value="true-false">True or False</option>
                                    <option value="fill-in-the-blank">Fill in the Blank</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Pts</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="points"
                                    min={0}
                                    step={1}
                                    value={question.points}
                                    onChange={(e) =>
                                        handleQuizChangeNumber(e, index)
                                    }
                                />
                            </Form.Group>
                        </div>

                        <div className="d-flex justify-content-center mb-3">
                            <Form.Group className="w-50">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="questionText"
                                    value={question.questionText ?? ""}
                                    onChange={(e) => handleQuizChange(e, index)}
                                />
                            </Form.Group>
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                        {question.questionType === "true-false" && (
                            <div>
                                <h5>Correct Answer</h5>
                                <div className="d-flex gap-4">
                                    <Form.Check 
                                        type="radio"
                                        label="True"
                                        name={`correct-${question._id}`}
                                        checked={question.correctBoolean === true}
                                        onChange={() => setCorrectBoolean(index, true)}
                                    />
                                    <Form.Check 
                                        type="radio"
                                        label="False"
                                        name={`correct-${question._id}`}
                                        checked={question.correctBoolean === false}
                                        onChange={() => setCorrectBoolean(index, false)}
                                    />
                                </div>
                            </div>
                        )}

                        {question.questionType === "multiple-choice" && (
                            <div className="mt-3">
                                <h5>Choices</h5>
                                {question.choices?.map((choice, cIndex) => (
                                    <div 
                                        key={cIndex} 
                                        className="d-flex align-items-start gap-3 mb-3"
                                    >
                                        {/* Radio button for marking correct choice */}
                                        <Form.Check
                                            type="radio"
                                            name={`correct-${question._id}`}
                                            checked={choice.isCorrect}
                                            onChange={() => setCorrectChoice(index, cIndex)}
                                            className="mt-2"
                                        />

                                        {/* Choice text input */}
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            value={choice.text}
                                            onChange={(e) => updateChoiceText(index, cIndex, e.target.value)}
                                            placeholder={`Choice ${cIndex + 1}`}
                                        />

                                        {/* Remove button */}
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => removeChoice(index, cIndex)}
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}

                                {/* Add Choice */}
                                <Button 
                                    variant="outline-primary"
                                    type="button"
                                    onClick={() => addChoice(index)}
                                >
                                    + Add Choice
                                </Button>
                            </div>
                        )}

                        {question.questionType === "fill-in-the-blank" && (
                        <div className="mt-3">
                            <h5>Correct Answer</h5>

                            <Form.Control
                            type="text"
                            value={question.correctText ?? ""}
                            onChange={(e) => updateFillInCorrectAnswer(index, e.target.value)}
                            placeholder="Enter the correct answer"
                            className="mb-3"
                            />

                            <small className="text-muted">
                            Students must enter a matching answer (case-insensitive recommended).
                            </small>
                        </div>
                        )}

                        </div>
                    </Form>
                        <div className="d-flex justify-content-center mb-3">
                            <Button 
                            variant="danger"
                            onClick={() => removeQuestion(index)}>Remove Question</Button>
                        </div>
                <hr />
                </div>
            ))}
            <Button 
                className="justify-content-center"
                variant="secondary"
                onClick={() => handleNewQuestion()}>Add Question +</Button>
            <Button
                className="ms-3"
                variant="danger"
                onClick={handleSave}
            >Save</Button>
        </div>
    );
}