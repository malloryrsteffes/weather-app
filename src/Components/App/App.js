import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WeatherDay from "../WeatherDay/WeatherDay";
import LocationSearch from "../LocationSearch/LocationSearch";
function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [locationKey, setLocationKey] = useState("");
  const [weatherInfo, setWeatherInfo] = useState();
  const [location, setLocation] = useState("");

  // Pad our incoming icon number
  // to comply with Accuweather's image URL setup
  const padNum = (num) => {
    const stringNum = num + "";
    const stringLen = stringNum.length;

    if (stringLen === 1) {
      return "0" + stringNum; // 4 -> 04
    } else {
      return stringNum;
    }
  };

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (locationKey) {
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey}`
      )
        .then((res) => res.json())

        .then((res) =>
          setWeatherInfo(
            res.DailyForecasts.map((df) => {
              return {
                min: df.Temperature.Minimum.Value,
                max: df.Temperature.Maximum.Value,
                description: df.Day.IconPhrase,
                icon: padNum(df.Day.Icon),
                day: days[new Date(df.Date).getDay()],
              };
            })
          )
        );
    }
  }, [locationKey]);

  useEffect(() => {
    console.log(weatherInfo);
  }, [weatherInfo]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row" id="entry">
          <div className="col-12 text-center text-white mb-4">
            <h2>Enter a valid US zip code to check the weather!</h2>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <LocationSearch
              onCityFound={(cityInfo) => {
                setLocationKey(cityInfo.key);
                setLocation(cityInfo.name + ", " + cityInfo.state);
              }}
            />
          </div>
          <div className="col-8">
            <h1>{location}</h1>
          </div>
        </div>

        <div className="card-deck mt-4">
          {!!weatherInfo &&
            weatherInfo.map((i, index) => (
              <div className="card " key={index}>
                <WeatherDay
                  day={i.day}
                  min={i.min}
                  max={i.max}
                  description={i.description}
                  icon={i.icon}
                />
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
