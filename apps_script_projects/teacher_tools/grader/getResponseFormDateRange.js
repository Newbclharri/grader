/**
 * returns the date range week (Monday through Friday)
 * of the earliest found response form
 * return {string} datRangeString
 */
function getResponseFormDateRange() {
  //PRECONDITION COMANDS
  renameResponseSheets();
  //VARIABLES//
  const timeZone = "CST";
  const dateStringFormat = "MMM. dd"
  const monday = new Date(getDateMonday());
  const formattedDateMonday = Utilities.formatDate(monday, timeZone, dateStringFormat);
  const friday = new Date(getDateFriday());
  const formattedDateFriday = Utilities.formatDate(friday, timeZone, dateStringFormat + ", yyyy");
  const dateRangeString = formattedDateMonday + " - " + formattedDateFriday;
  return dateRangeString
}
