"use client"
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { FaFilePen } from "react-icons/fa6";
import AssignmentRightButtons from "./AssignmentRightButtons";
import { FaSearch } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import AssignmentType from "../../../Models/Assignment";
import { useAppSelector } from "@/app/(Kambaz)/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAssignments, updateAssignment } from "./reducer";
import * as client from "../../client";
import type Assignment from "../../../Models/Assignment";

export default function Assignment() {
  const { cid } = useParams<{ cid: string }>();
  const { assignments } = useAppSelector((state) => state.assignmentReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const onCreateAssignmentForCourse = async () => {
    if (!cid) return;
    router.push(`/Courses/${cid}/Assignments/new/AssignmentEditor`)
  };
  const onRemoveAssignment = (assignmentId: string) => {
    (async () => {
      await client.deleteAssignment(assignmentId);
      dispatch(setAssignments(assignments.filter((a: Assignment) => a._id !== assignmentId)));
    })();
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      const assignments = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(assignments));
    };
    fetchAssignments();
  }, [cid]);

  return (
    <div id="wd-assignments">
      <div className="position-relative d-inline-block">
        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-secondary" />
        <input 
          type="text"
          className="form-control ps-5"
          placeholder="Search..."
          id="wd-search-assignment"
        />
      </div>
      <button 
        id="wd-add-assignment-group"
        className="btn btn-outline-secondary ms-5 me-2"
      >
        + Group
      </button>

      <button 
        id="wd-add-assignment"
        className="btn btn-danger"
        onClick={onCreateAssignmentForCourse}
      >
        + Assignment
      </button>
      <ListGroup className="rounded-0 mt-5" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS 
            <AssignmentControlButtons />
            <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((assignment: AssignmentType) => assignment.course === cid)
              .map((assignment: AssignmentType) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-assignment p-0 mb-4 fs-5 border-gray"
                >
                  <BsGripVertical className="me-3 mb-5 fs-3" /> 
                  <FaFilePen className="text-success me-4 mb-5" /> 
                {!assignment.editing}
                {assignment.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={assignment.title}
                    onChange={(e) =>
                      dispatch(
                        updateAssignment({
                          ...assignment,
                          title: e.target.value,
                        })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(
                          updateAssignment({
                            ...assignment,
                            editing: false,
                          })
                        );
                      }
                    }}
                  />
                )}
                  <div style={{ display: "inline-block" }} className="ms-4 mb-8">
                    <b className="fs-4">{assignment.title}</b>
                    <div>
                       <span className="text-danger">Multiple Modules</span>
                        <span> | </span>
                        <b>Not available until</b> 
                        <span> placeholder </span>
                    </div>
                    <div>
                      <b>Due</b>
                      <span> placeholder </span>
                    </div>
                  </div>
                  <AssignmentRightButtons 
                    aid={assignment._id}
                    deleteAssignment={onRemoveAssignment}/> 
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
);}