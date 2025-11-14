"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Button } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";

export default function AssignmentRightButtons({
  aid,
  deleteAssignment,
}: {
  aid: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  const { cid } = useParams();
  const router = useRouter();

  return (
    <div className="float-end">
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() =>
          router.push(`/Courses/${cid}/Assignments/${aid}/AssignmentEditor`)
        }
      >
        Edit
      </Button>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("Are you sure you want to delete this assignment?")) {
            deleteAssignment(aid);
          }
        }}
      >
        Delete
      </Button>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> );}