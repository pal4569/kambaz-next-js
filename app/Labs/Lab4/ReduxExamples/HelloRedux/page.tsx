import { useAppSelector } from "@/app/(Kambaz)/hooks";
import helloReducer from "./helloReducer";

export default function HelloRedux() {
  const { message } = useAppSelector((state) => state.helloReducer);
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
    </div>
  );
}
