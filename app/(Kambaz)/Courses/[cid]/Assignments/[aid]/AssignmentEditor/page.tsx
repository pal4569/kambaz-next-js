"use client";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addAssignment, updateAssignment } from "../../reducer"; // adjust path
import { useAppDispatch } from "@/app/(Kambaz)/hooks";
import Assignment from "@/app/(Kambaz)/Models/Assignment";
import db from "../../../../../Database/"

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const existing = db.assignments.find(a => a._id === aid);
  console.log(existing);

  const [form, setForm] = useState<Assignment>(
    (existing ??
      {
        _id: aid as string,
        title: "",
        course: cid as string,
        description: "",
        points: 0,
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
        editing: false,
      }) as Assignment
  );



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    if (existing) {
      dispatch(
        updateAssignment({
          ...form,
          _id: existing._id, 
          course: cid as string,
        })
      );
    } else {
      dispatch(
        addAssignment({
          _id: uuidv4(),
          title: form.title,
          description: form.description,
          points: Number(form.points),
          dueDate: form.dueDate,
          availableFrom: form.availableFrom,
          availableUntil: form.availableUntil,
          course: cid as string,
          editing: false,
        })
      );
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-4" id="wd-assignment-editor">
      <h2>{existing ? existing.title : "New Assignment"}</h2>
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
          <Button variant="secondary" onClick={() => router.push("/Courses/${cid}/Assignments")}>
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
