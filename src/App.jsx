import Weather from "./pages/Weather/Weather";
import bgVideo from "./assets/storm.mp4";

const App = () => {
  return (
    <div className="h-full w-full relative">
      <div
        style={{ background: "#00000070", zIndex: "-1" }}
        className="overlay left-0 top-0 w-full xl:h-[100%] h-[110%] absolute"
      ></div>
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 object-cover w-full h-[110%] xl:h-[100%] -z-10"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        <Weather />
      </div>
    </div>
  );
};

export default App;
