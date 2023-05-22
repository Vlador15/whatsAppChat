export const getTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`; // форматируем строку времени

  return time;
};
