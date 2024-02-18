"use client";

const times = () => {

const addSeconds = (fecha, segundos) => {
    // Convertir la cadena de fecha a un objeto Date
    let date = new Date(fecha);

    // Agregar los segundos
    date.setSeconds(date.getSeconds() + segundos);

    // Devolver la nueva fecha como cadena
    return date.toISOString().slice(11, 16);
};
const getLocalDateTimeFromOffset = (segundos) => {
  const date = new Date();

  date.setSeconds(date.getSeconds() + segundos);

  const utcTimeStringModified = date.toUTCString();

  return utcTimeStringModified.slice(17, 22);
};

  return {
    addSeconds,
    getLocalDateTimeFromOffset
  }
}

export default times;