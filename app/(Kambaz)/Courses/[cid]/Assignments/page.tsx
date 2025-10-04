import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "../Modules/AssignmentControlButtons";
import { FaFilePen } from "react-icons/fa6";
import AssignmentRightButtons from "../Modules/AssignmentRightButtons";
import { FaSearch } from "react-icons/fa";

export default function Assignment() {
  return (
    <div 
      id="wd-assignments">
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
      >
        + Assignment
      </button>
      <ListGroup className="rounded-0 mt-5" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-3 mb-5 fs-3" /> 
              <FaFilePen className="text-success me-4 mb-5" /> 
              <div style={{ display: "inline-block" }} className="ms-4 mb-8">
                <b className="fs-4">A1</b>
                <div>
                  <span className="text-danger">Multiple Modules</span>
                  <span> | </span>
                  <b>Not available until</b> 
                  <span> May 6 at 12:00am | </span>
                </div>
                <div>
                  <b>Due</b>
                  <span> May 13 at 11:59pm | 100 pts </span>
                </div>
              </div>
              <AssignmentRightButtons /> 
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-3 mb-5 fs-3" /> 
              <FaFilePen className="text-success me-4 mb-5" /> 
              <div style={{ display: "inline-block" }} className="ms-4 mb-8">
                <b className="fs-4">A2</b>
                <div>
                  <span className="text-danger">Multiple Modules</span>
                  <span> | </span>
                  <b>Not available until</b> 
                  <span> May 13 at 12:00am | </span>
                </div>
                <div>
                  <b>Due</b>
                  <span> May 20 at 11:59pm | 100 pts </span>
                </div>
              </div>
              <AssignmentRightButtons /> 
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-3 mb-5 fs-3" /> 
              <FaFilePen className="text-success me-4 mb-5" /> 
              <div style={{ display: "inline-block" }} className="ms-4 mb-8">
                <b className="fs-4">A3</b>
                <div>
                  <span className="text-danger">Multiple Modules</span>
                  <span> | </span>
                  <b>Not available until</b> 
                  <span> May 20 at 12:00am | </span>
                </div>
                <div>
                  <b>Due</b>
                  <span> May 27 at 11:59pm | 100 pts </span>
                </div>
              </div>
              <AssignmentRightButtons /> 
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
);}
