const Months = require("../../Constants/Months");

function getDateAndTime() {
  const dateTime = new Date().toISOString();
  const splittedDateTime = dateTime.split("T");
  const date = splittedDateTime[0];
  const time = splittedDateTime[1].slice(0, 8);

  return { date, time };
}

function getModifiedDate(date) {
  const splitDate = date.split("-");

  const day = splitDate[2];
  const month = Months[`${splitDate[1]}`];
  const year = splitDate[0];

  const fullDate = `${day} ${month} ${year}`;
  return fullDate;
}

function getModifiedTime(time) {
  return time.slice(0, 5);
}

function getTransactionDateTime(date, time) {
  const splitDate = date.split("-");
  const splitTime = time.split(":");

  const day = splitDate[2];
  const month = splitDate[1];
  const year = splitDate[0].slice(2, 4);

  const hour = splitTime[0];
  const minutes = splitTime[1];

  const TransactionDateTimeCode = `${day}${month}${year}${hour}${minutes}`;
  return TransactionDateTimeCode;
}

// Date And Time Functions Grouper
const DateTimeFunctions = {
  getDateAndTime,
  getModifiedDate,
  getModifiedTime,
  getTransactionDateTime,
};

module.exports = DateTimeFunctions;
