import { Outlet } from "react-router-dom";
import ToastBox from "../Toast/ToastBox";

const Root = () => {
  return (
    <div>
      <Outlet></Outlet>
      <ToastBox></ToastBox>
    </div>
  );
};

export default Root;
