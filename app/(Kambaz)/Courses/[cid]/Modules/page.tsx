import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControl";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  return (
    <div>
      <div>
        <button>Collapse All</button> 
        <button>View Progress</button> 
        <select>
          <option value="PublishAll">Publish All</option>
        </select>
        <button>+ Module</button>
      </div>
      <div>
        <ModulesControls /><br /><br /><br /><br />
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />  Week 1 <ModuleControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES <ModuleControlButtons /> </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Introduction to the course <ModuleControlButtons /> </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Learn what is Web Development <ModuleControlButtons /> </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />  Week 2 <ModuleControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                LESSON 1 <ModuleControlButtons /> </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                LESSON 2 <ModuleControlButtons /> </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
);}
