import sunrise from "../../../../public/Assets/wi_sunrise.svg";
import sunset from "../../../../public/Assets/wi_sunset.svg";

import limpioDia from "../../../../public/Assets/clear-day.svg";
import limpioNoche from "../../../../public/Assets/clear-night.svg";

import nubesDia from "../../../../public/Assets/partly-cloudy-day.svg";
import nubesNoche from "../../../../public/Assets/partly-cloudy-night.svg";

import lloviznaDia from "../../../../public/Assets/partly-cloudy-day-drizzle.svg";
import lloviznaNoche from "../../../../public/Assets/partly-cloudy-night-drizzle.svg";

import lluviaDia from "../../../../public/Assets/partly-cloudy-day-rain.svg";
import lluviaNoche from "../../../../public/Assets/partly-cloudy-night-rain.svg";

import nieveDia from "../../../../public/Assets/partly-cloudy-day-snow.svg";
import nieveNoche from "../../../../public/Assets/partly-cloudy-night-snow.svg";

import tormentaDia from "../../../../public/Assets/thunderstorms-day-rain.svg";
import tormentaNoche from "../../../../public/Assets/thunderstorms-night-rain.svg";

import nieblaDia from "../../../../public/Assets/partly-cloudy-day-fog.svg";
import nieblaNoche from "../../../../public/Assets/partly-cloudy-night-fog.svg";

import brumaDia from "../../../../public/Assets/partly-cloudy-day-haze.svg";
import brumaNoche from "../../../../public/Assets/partly-cloudy-night-haze.svg";

import humoDia from "../../../../public/Assets/partly-cloudy-day-smoke.svg";
import humoNoche from "../../../../public/Assets/partly-cloudy-night-smoke.svg";

const Icons = (icon, dateNow, dateSunrise, dateSunset) => {

  switch (icon) {
    case "Thunderstorm":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = tormentaDia;
      } else {
        icon = tormentaNoche;
      }
      break;
    case "Drizzle":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = lloviznaDia;
      } else {
        icon = lloviznaNoche;
      }
      break;
    case "Rain":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = lluviaDia;
      } else {
        icon = lluviaNoche;
      }
      break;
    case "Snow":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = nieveDia;
      } else {
        icon = nieveNoche;
      }
      break;
    case "Clear":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = limpioDia;
      } else {
        icon = limpioNoche;
      }
      break;
    case "Atmosphere":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = lluviaDia;
      } else {
        icon = lluviaNoche;
      }
      break;
    case "Clouds":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = nubesDia;
      } else {
        icon = nubesNoche;
      }
      break;
    case "Fog":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = nieblaDia;
      } else {
        icon = nieblaNoche;
      }
      break;
    case "Mist":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = nieblaDia;
      } else {
        icon = nieblaNoche;
      }
      break;
    case "Haze":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = brumaDia;
      } else {
        icon = brumaNoche;
      }
      break;
    case "Smoke":
      if (dateNow > dateSunrise && dateNow < dateSunset) {
        icon = humoDia;
      } else {
        icon = humoNoche;
      }
      break;
    case "Sunrise":
      icon = sunrise;
      break;
    case "Sunset":
      icon = sunset;
      break;
    default:
      icon = limpioDia;
  }
  return icon;
};

export default Icons;
