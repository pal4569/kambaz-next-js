"use client";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addAssignment, setAssignments, updateAssignment } from "../../reducer"; // adjust path
import { useAppDispatch, useAppSelector } from "@/app/(Kambaz)/hooks";
import Assignment from "@/app/(Kambaz)/Models/Assignment";
import * as client from "../../../../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { assignments } = useAppSelector((state) => state.assignmentReducer);

  const [form, setForm] = useState<Assignment>({
    _id: "",
    title: "",
    course: "",
    description: "",
    points: 0,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    editing: false,
    completed: false,
  });


  useEffect(() => {
    const fetchAssignment = async () => {
      if (aid && aid !== "new") {
        const assignment = await client.findAssignmentById(aid);
        console.log(assignment);
        setForm(assignment);
      } else {
        setForm({
          _id: aid as string,
          title: "",
          course: cid as string,
          description: "",
          points: 0,
          dueDate: "",
          availableFrom: "",
          availableUntil: "",
          editing: false,
        });
      }
    };

    fetchAssignment();
  }, [aid, cid]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    if (!form) return;

    if (aid === "new" || !assignments.some(a => a._id === aid)) {
      const created = await client.createAssignmentForCourse(cid, form);
      dispatch(setAssignments([...assignments, created]));

    } else {
      const updated = await client.updateAssignment(form._id, form);

      const newAssignments = assignments.map(a =>
        a._id === updated._id ? updated : a
      );

      dispatch(setAssignments(newAssignments));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };



  return (
    <div className="container mt-4" id="wd-assignment-editor">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            name="points"
            value={form.points}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="date"
            name="availableFrom"
            value={form.availableFrom}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control
            type="date"
            name="availableUntil"
            value={form.availableUntil}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex gap-2 mt-3">
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Assignments`)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
        </div>
      </Form>
    </div>
  );
}
