import Lesson from "./Lesson";

export default interface Module {
  _id: string;
  course: string;
  name: string;
  lessons?: Lesson[];
  editing?: boolean;
  children?: Module[];
}