const WeatherLoading = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-fit h-fit animate-pulse">
        <img
          className="scale-50"
          src={"https://i.ibb.co/D9RgJ6h/rain.gif"}
          alt=""
        />
      </div>
    </div>
  );
};

export default WeatherLoading;
