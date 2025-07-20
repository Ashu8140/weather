import { useEffect, useState } from "react";
import { GetWeatherData } from "./api";
import { HiSearch } from "react-icons/hi";
import { WiHumidity } from "react-icons/wi";
import sun from "./assets/sun.jpg";
import cloud from "./assets/cloud.jpg";
import rain from "./assets/rain.jpg";
import { FaWind } from "react-icons/fa";


function Weather() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("Delhi");
  console.log(data);

  useEffect(() => {
    GetWeatherData(search)
      .then((r) => setData(r))
      .catch((error) => console.log("Network issue", error));
  }, [search]);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSearch() {
    if (query.trim() !== "") {
      setSearch(query);
    }
  }

  // Weather icon mapping
  const allIcons = {
    "01d": sun,
    "01n": sun,
    "02d": sun,
    "02n": sun,
    "03d": sun,
    "03n": sun,
    "04d": cloud,
    "04n": cloud,
    "09d": rain,
    "09n": rain,
  };

  if (!data || !data.main) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  const icons = allIcons[data.weather[0].icon] || sun;

  return (
    <div className="h-screen p-4 bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      <div className="bg-blue-950 p-6 mx-auto max-w-xl rounded-xl shadow-lg flex flex-col items-center">
        {/* Input and Search */}
        <div className="mt-4 flex items-center gap-2">
          <input
            placeholder="Enter Location"
            value={query}
            onChange={handleChange}
            className="border border-black px-2 py-2 text-black rounded-full"
          />
          <button
            className="border border-black px-4 py-3 rounded-full bg-white text-black"
            onClick={handleSearch}
          >
            <HiSearch />
          </button>
        </div>

        <img className="w-24 h-24 mt-6 rounded-full object-cover" src={icons} alt="weather" />

        <h1 className="mt-6 text-3xl font-semibold">{data.main.temp} °C</h1>
        <p className="text-2xl mt-2">{data.name}</p>
        <div className="mt-6 flex items-start text-lg">
          <FaWind className="text-2xl mr-2"/>
          <span>wind: {data.wind.speed}%</span>
        </div>

        <div className="mt-2 flex items-start text-lg">
          <WiHumidity className="text-4xl " />
          <span>Humidity: {data.main.humidity}%</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
