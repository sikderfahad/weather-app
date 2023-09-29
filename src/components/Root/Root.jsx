import { Outlet } from "react-router-dom";
import ToastBox from "../Toast/ToastBox";
import { useEffect, useState } from "react";
import WeatherLoading from "../Spinner/Spinner";

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return (
    <div>
      {!isLoading ? (
        <div>
          <Outlet></Outlet>
          <ToastBox></ToastBox>
        </div>
      ) : (
        <WeatherLoading></WeatherLoading>
      )}
    </div>
  );
};

export default Root;
