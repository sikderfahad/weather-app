import { useState, useEffect } from "react";
import axios from "axios";
import { MdLocationPin } from "react-icons/md";
import { FaTemperatureHalf } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

import { GiWhirlwind } from "react-icons/gi";
import { TbClock24 } from "react-icons/tb";

import { TiWeatherPartlySunny } from "react-icons/ti";
import { FiSunrise, FiSunset } from "react-icons/fi";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("metric"); // Celsius by default
  const [error, setError] = useState(null);

  // Temperature unit symbols
  const unitSymbols = {
    metric: "C", // Celsius
    imperial: "F", // Fahrenheit
    standard: "K", // Kelvin
  };

  useEffect(() => {
    if (location) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${
            import.meta.env.VITE_weatherApiKey
          }`
        )
        .then((response) => {
          setWeatherData(response.data);
          setError(null);
          // Change body background color based on temperature
          document.querySelector("#main-root").style.backgroundColor =
            getBackgroundColor(response.data.main.temp);
        })
        .catch((error) => {
          console.log(error);
          setError(
            "Location not found. Please enter a valid city or ZIP code."
          );
          setWeatherData(null);
        });
    }
  }, [location, unit]);

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${
                import.meta.env.VITE_weatherApiKey
              }`
            )
            .then((response) => {
              console.log("temp: ", response.data.main.temp);
              setWeatherData(response.data);
              setLocation(response.data.name);
              setError(null);
              // Change body background color based on temperature
              document.querySelector("#main-root").style.backgroundColor =
                getBackgroundColor(response.data.main.temp);
            })
            .catch((error) => {
              console.log(error);
              setError("Error fetching weather data. Please try again later.");
              setWeatherData(null);
            });
        },
        (error) => {
          console.log(error);
          setError("Geolocation is not available or permission denied.");
          setWeatherData(null);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Determine background color based on temperature(temp = celsius unit)
  const getBackgroundColor = (temp) => {
    console.log(temp);

    // if (
    //   temp + 273.15 <= 273.15 &&
    //   temp <= 0 &&
    //   +((temp * 9) / 5 + 32).toFixed(2) <= 32
    // )
  };

  return (
    <div>
      <div id="main-root">
        <div className="min-h-screen flex flex-col justify-center items-center gap-5 z-10 pt-8 lg:pt-0">
          <div className="">
            <h1 className="text-3xl text-center font-semibold mb-4 text-white">
              Weather App
            </h1>
            <div className="flex flex-col items-center space-y-4">
              <input
                type="text"
                placeholder="Enter a location (e.g., city or ZIP code)"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                className="bg-blue-500 flex items-center justify-center gap-3 text-white py-2 px-4 rounded-lg transition hover:bg-blue-600 focus:outline-none"
                onClick={() => getLocationWeather()}
              >
                <MdLocationPin /> Your location Weather
              </button>
            </div>
            <div className="mt-4 text-center">
              <label className="font-semibold text-white">
                Select Temperature Unit:{" "}
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="metric">Celsius (°C)</option>
                <option value="imperial">Fahrenheit (°F)</option>
                <option value="standard">Kelvin (K)</option>
              </select>
            </div>
            {error && (
              <div
                className="flex my-5 items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 mr-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Alert!</span>
                <div>{error}</div>
              </div>
            )}
          </div>
          <div>
            {weatherData && (
              <div
                style={{ boxShadow: "0 0 20px #5173ca" }}
                className={`bg-[#00000063] shadow-xl rounded-2xl p-6 md:p-8 mt-6`}
              >
                <h2 className="text-2xl text-center mb-5 font-semibold text-white">
                  Weather in {weatherData.name}, {weatherData.sys.country}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    className={`rounded-lg p-2 text-white bg-[#DC3545] flex items-center gap-3 `}
                  >
                    <FaTemperatureHalf />
                    <p className="text-lg">
                      Temperature: {weatherData.main.temp}&deg;
                      {unitSymbols[unit]}
                    </p>
                  </div>
                  <div
                    className={`rounded-lg p-2 text-white bg-blue-500 flex items-center gap-3 `}
                  >
                    <WiHumidity className="transform scale-[1.5]" />
                    <p className="text-lg">
                      Humidity: {weatherData.main.humidity}%
                    </p>
                  </div>
                  <div
                    className={`rounded-lg p-2 text-white bg-green-500 flex items-center gap-3 `}
                  >
                    <GiWhirlwind />
                    <p className="text-lg">
                      Wind Speed: {(weatherData.wind.speed * 3.6).toFixed(2)}{" "}
                      km/h
                    </p>
                  </div>

                  <div className="text-center rounded-lg p-2 text-white bg-gray-900 flex items-center gap-3 ">
                    <TiWeatherPartlySunny />
                    <p className="text-lg">
                      Weather: {weatherData.weather[0].description}
                    </p>
                  </div>

                  <div className="rounded-lg p-2 text-white bg-gray-700 flex items-center gap-3 ">
                    <FiSunrise />
                    <p className="text-lg">
                      Sunrise:{" "}
                      {new Date(
                        weatherData.sys.sunrise * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="rounded-lg p-2 text-white bg-gray-700 flex items-center gap-3 ">
                    <FiSunset />
                    <p className="text-lg">
                      Sunset:{" "}
                      {new Date(
                        weatherData.sys.sunset * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="rounded-lg p-2 text-white bg-gray-700 flex items-center gap-3 ">
                    <TbClock24 />
                    <p className="text-lg">
                      Timezone: {weatherData.timezone / 3600} hours from UTC
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
