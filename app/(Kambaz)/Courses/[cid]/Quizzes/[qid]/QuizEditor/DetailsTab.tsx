import Quiz from "@/app/(Kambaz)/Models/Quiz";
import router from "next/router";
import { Form, Button } from "react-bootstrap";

interface DetailsTabProps {
  form: Quiz;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSave: () => Promise<void>;
  cid: string;
}

export default function DetailsTab({ form, handleChange, handleSave, cid }: DetailsTabProps) {
    return (
        <div className="container mt-4" id="wd-assignment-editor">
        <Form>
            <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                name="instructions"
                value={form.instructions ?? ""}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group>
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select name="quizType" value={form.quizType} onChange={handleChange}>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                </Form.Select>
            </Form.Group>

            <br />

            <Form.Group className="mb-3">
                <Form.Label>Points</Form.Label>
                <Form.Control
                    type="number"
                    name="points"
                    value={form.points ?? ""}
                    onChange={handleChange}
                    min={0}
                    step={1}
                />
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select name="assignmentGroup" value={form.assignmentGroup} onChange={handleChange}>
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                </Form.Select>
            </Form.Group>

            <br />

            <Form.Group className="mb-3">
                <Form.Label>Shuffle Answers</Form.Label>

                <Form.Select
                    name="shuffleAnswers"
                    value={form.shuffleAnswers ? "true" : "false"}
                    onChange={handleChange}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
            </Form.Group>

            <br />

            <Form.Group className="mb-3">
                <Form.Label>Time Limit</Form.Label>
                <Form.Control
                    type="number"
                    name="minutes"
                    value={form.timeLimit ?? ""}
                    onChange={handleChange}
                    min={0}
                    step={1}
                />
            </Form.Group>

            <br />  

            <Form.Group>
                <Form.Label>Multiple Attempts</Form.Label>
                <Form.Select
                    name="multipleAttempts"
                    value={form.multipleAttempts ? "true" : "false"}
                    onChange={handleChange}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
            </Form.Group>

            <br />

            <Form.Group>
                <Form.Label>Show Correct Answers</Form.Label>
                <Form.Select 
                    name="showCorrectAnswers"
                    value={form.showCorrectAnswers ? "true" : "false"}
                    onChange={handleChange}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
            </Form.Group>

            <br />

            <Form.Group className="mb-3">
            <Form.Label>Access Code</Form.Label>
            <Form.Control name="accessCode" value={form.accessCode} onChange={handleChange} />
            </Form.Group>

            <br />

            <Form.Group className="mb-3">
                <Form.Label>One Question at a Time</Form.Label>
                <Form.Select 
                    name="oneQuestionAtATime"
                    value={form.oneQuestionAtATime ? "true" : "false"}
                    onChange={handleChange}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
            </Form.Group>
            
            <br />

            <Form.Group>
                <Form.Label>Webcam Required</Form.Label>
                <Form.Select 
                    name="webcamRequired"
                    value={form.webcamRequired ? "true" : "false"}
                    onChange={handleChange}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
            </Form.Group>

            <br />

            <Form.Group className="mb-3">
                <Form.Label>Lock Questions After Answering</Form.Label>
                <Form.Select 
                    name="lockQuestionsAfterAnswering"
                    value={form.lockQuestionsAfterAnswering ? "true" : "false"}
                    onChange={handleChange}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="dueDate"
                    value={form.dueDate || ""}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Available date</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="available"
                    value={form.available || ""}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Until date</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="untilDate"
                    value={form.untilDate || ""}
                    onChange={handleChange}
                />
            </Form.Group>


            <div className="d-flex gap-2 mt-3">
            <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
            Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
            Save
            </Button>
            </div>
        </Form>
        </div>
    )
}