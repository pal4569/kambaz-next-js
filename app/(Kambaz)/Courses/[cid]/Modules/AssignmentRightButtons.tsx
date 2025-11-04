"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { Button } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { deleteAssignment } from "../Assignments/reducer";
import { useDispatch } from "react-redux";

export default function AssignmentRightButtons({
  aid,
}: {
  aid: string;
}) {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

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
            dispatch(deleteAssignment(aid));
          }
        }}
      >
        Delete
      </Button>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> );}