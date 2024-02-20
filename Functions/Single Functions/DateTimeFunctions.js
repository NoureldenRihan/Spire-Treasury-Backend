const Months = require("../../Constants/Months");

// Gets A New ISO String Date and Splits it into Date and Time
function getDateAndTime() {
  const dateTime = new Date().toISOString();
  const splittedDateTime = dateTime.split("T");
  const date = splittedDateTime[0];
  const time = splittedDateTime[1].slice(0, 8);

  return { date, time };
}

// Modifies Date from '2024-01-01' --> '01 Jan 2024'
function getModifiedDate(date) {
  const splitDate = date.split("-");

  const day = splitDate[2];
  const month = Months[`${splitDate[1]}`];
  const year = splitDate[0];

  const fullDate = `${day} ${month} ${year}`;
  return fullDate;
}

// Modifies time from '19:30:1000z' --> '19:30'
function getModifiedTime(time) {
  return time.slice(0, 5);
}

// Extracts Day, Month, last two digits from Year, hour, minutes for a TimeCode for Transaction Codes
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
