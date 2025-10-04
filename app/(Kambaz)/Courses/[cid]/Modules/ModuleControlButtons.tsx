import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa6";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> );}