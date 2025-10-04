import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <div 
        style=
            {{ 
                display: "inline-block",
                borderRadius: "15px",
                backgroundColor: "#f8f9fa",
                padding: "2px 8px",
                marginRight: "20px",
            }}>40% of total</div>
      <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      <IoEllipsisVertical className="fs-4" />
    </div> );}