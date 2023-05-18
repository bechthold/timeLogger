module.exports.formatFullDate = (dateTime) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

module.exports.formatDiffTime = (startDateTime, finishDateTime) => {
  const startDate = new Date(startDateTime);
  const finishDate = new Date(finishDateTime);
  const diffDate = finishDate - startDate;

  const hours = Math.floor(diffDate / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((diffDate / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((diffDate / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
