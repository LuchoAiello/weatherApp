"use client";
import styles from "./HomePage.module.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import searchImage from "../../../../public/Assets/search.png";
import Icons from "../../components/icons/Icons";
import Icons2 from "../../components/icons/Icons2";
import horizontalScroll from "../Hooks/horizontalScroll";
import callToApi from "../Hooks/callToApi";
import thermometer from "../../../../public/Assets/thermometer-glass-celsius.svg";
import barometer from "../../../../public/Assets/wi_barometer.svg";
import wind from "../../../../public/Assets/wi_wind.svg";

const HomePage = () => {
  const [city, setCity] = useState("");
  const [inputValue, setInputValue] = useState("");
  const itemsRef = useRef(null);

  const { handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove } =
    horizontalScroll(itemsRef);

  const { data, data2, dateNow, dateSunset, dateSunrise, icon, openContent } =
    callToApi(city);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(inputValue);
  };

  useEffect(() => {}, [city]);

  return (
    <>
      <section className={styles.contentAll}>
        <div
          className={`${styles.content} ${
            !(dateNow > dateSunrise && dateNow < dateSunset) & openContent
              ? styles.isNight
              : (dateNow > dateSunrise && dateNow < dateSunset) & openContent
              ? styles.isDay
              : ""
          } ${openContent ? styles.open : styles.closed}
            }`}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Busca "
              id="inputField"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit">
              <Image
                src={searchImage}
                alt="searchImage"
                width={1024}
                height={1024}
                className={styles.searchImage}
              />
            </button>
          </form>
          {data ? (
            <div>
              <Image
                src={Icons(icon, dateNow, dateSunrise, dateSunset)}
                alt="icons"
                width={180}
                height={180}
                className={styles.imageIcon}
              />
              <h1 className={styles.primaryTemp}>
                {data.main.temp.toFixed(0)}&deg;c
              </h1>
              <h4 className={styles.cityName}>{data.name}</h4>
              <div className={styles.secondaryTemps}>
                <p>
                  Mínima: {data.main.temp_min.toFixed(0)}&deg; |
                  Máxima: {data.main.temp_max.toFixed(0)}&deg;
                </p>
              </div>
              <div className={styles.sunSpot}>
                <p className={styles.sunSpotFlex}>
                  Amanecer: {dateSunrise}
                  <Image
                    src={Icons("Sunrise")}
                    alt="icons"
                    width={40}
                    height={40}
                  />
                </p>
                <p className={styles.sunSpotFlex}>
                  Anochecer: {dateSunset}
                  <Image
                    src={Icons("Sunset")}
                    alt="icons"
                    width={40}
                    height={40}
                  />
                </p>
              </div>
              <section className={styles.weatherData}>
                <div className={styles.scrollData}>
                  <h4 className={styles.titleWeatherDay}>
                    Pronóstico cada 3 horas
                  </h4>
                  <article
                    className={styles.allWeatherContent}
                    ref={itemsRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                  >
                    <div className={styles.allWeatherFlex}>
                      {data2 != null
                        ? data2.map((data) => {
                            return (
                              <div
                                className={styles.allWeatherDay}
                                key={data.dt}
                              >
                                <p className={styles.dateDay}>
                                  {data.dt_txt.slice(11, 13)}{" "}
                                  {data.dt_txt.slice(10, 13) < 12.1
                                    ? "am"
                                    : "pm"}
                                </p>
                                <Image
                                  src={Icons2(
                                    data.weather[0].main,
                                    data.dt_txt.slice(10, 16),
                                    dateSunrise,
                                    dateSunset
                                  )}
                                  alt="icons"
                                  width={40}
                                  height={40}
                                />
                                <p className={styles.rainPercentage}>
                                  {Math.floor(data.pop * 100)}%
                                </p>
                                <p className={styles.temperatureDay}>
                                  {data.main.temp.toFixed(0)}&deg;c
                                </p>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </article>
                  <article className={styles.moreData}>
                    <div className={styles.visibilityData}>
                      <h4>Visibilidad</h4>
                      <p className={styles.visibilityKm}>
                        {data.visibility.toFixed(0) / 1000} Km
                      </p>
                      <p className={styles.dataText}>
                        {data.visibility.toFixed(0) / 1000 > 5
                          ? "Vista completamente despejada"
                          : data.visibility.toFixed(0) / 1000 > 2.5
                          ? "Vista moderada"
                          : "Poca visibilidad"}
                      </p>
                    </div>
                    <div className={styles.windData}>
                      <h4 className={styles.titleImage}>
                        <Image alt="icons" src={wind} width={30} height={30} />
                        Viento
                      </h4>
                      <p className={styles.humidityPersentaje}>
                        {data.wind.speed} m/s
                      </p>
                      <p className={styles.dataText}>
                        Direccion del viento {data.wind.deg}&deg;
                      </p>
                    </div>
                  </article>
                  <article className={styles.moreData}>
                    <div className={styles.visibilityData}>
                      <h4 className={styles.titleImage}>
                        <Image
                          alt="icons"
                          src={thermometer}
                          width={30}
                          height={30}
                        />
                        Sensación
                      </h4>
                      <p className={styles.humidityPersentaje}>
                        {data.main.feels_like.toFixed(0)}&deg;
                      </p>
                      <p className={styles.dataText}>
                        {data.main.feels_like.toFixed(0) ==
                        data.main.temp.toFixed(0)
                          ? "Similar a la temperatura actual"
                          : data.main.feels_like.toFixed(0) >
                            data.main.temp.toFixed(0)
                          ? "Mayor a la temperatura actual"
                          : "Menor a la temperatura actual"}
                      </p>
                    </div>
                    <div className={styles.humidityData}>
                      <h4 className={styles.titleImage}>
                        <Image
                          alt="icons"
                          src={barometer}
                          width={30}
                          height={30}
                        />
                        Presión
                      </h4>
                      <p className={styles.humidityPersentaje}>
                        {data.main.pressure} hPa
                      </p>
                      <p className={styles.dataText}>
                        {data.main.pressure >= 1013.25
                          ? "La presión es alta"
                          : "La presión es baja"}
                      </p>
                    </div>
                  </article>
                </div>

              </section>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default HomePage;
