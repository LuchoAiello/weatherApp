"use client";
import times from "../Hooks/times";
import { useState, useEffect } from "react";
import axios from "axios";

const callToApi = (city) => {
  const [icon, setIcon] = useState("");
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [dateNow, setDateNow] = useState();
  const [dateSunset, setDateSunset] = useState();
  const [dateSunrise, setDateSunrise] = useState();
  const [openContent, setOpenContent] = useState(false);

  const { addSeconds, getLocalDateTimeFromOffset } = times();

  const apiKey = "1945e7886e00e2c7a4a25eb12f2dee8e";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang='sp, es'&units=metric`;
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=%27sp,%20es%27&units=metric`;

  useEffect(() => {
    if (city != "") {
      const fetchWeatherData = async () => {
        try {
          const { data } = await axios.get(url);
          setData(data);
          setIcon(data.weather[0].main);
          setDateNow(getLocalDateTimeFromOffset(data.timezone));
          const data2 = await axios.get(url2);
          setData2(data2.data.list.slice(0, 9));
          const urlSunriseSunset = `https://api.sunrise-sunset.org/json?lat=${data.coord.lat}&lng=${data.coord.lon}&formatted=0`;
          const dataSun = await axios.get(urlSunriseSunset);
          setDateSunrise(
            addSeconds(dataSun.data.results.sunrise, data.timezone)
          );
          setDateSunset(addSeconds(dataSun.data.results.sunset, data.timezone));

          setOpenContent(true);
        } catch (error) {
          console.log("fetchWeather error:", error);
        }
      };

      fetchWeatherData();
    }
  }, [city]);

  return {
    data,
    data2,
    dateNow,
    dateSunset,
    dateSunrise,
    icon,
    openContent,
  };
};

export default callToApi;
