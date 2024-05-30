/**
 * returns a date converted to a 3 letter abbreviated month
 * 2 digit day
 * and four digit year format
 * @param {date} dateString
 * @returns {date}
 */
function formatDate(date) {
  const ss = SpreadsheetApp.getActive();
  try{
    const timeZone = ss.getSpreadsheetTimeZone();
    return Utilities
      .formatDate(new Date(date), timeZone,"MMM/dd/yyyy");
  }catch(err){
    console.log(ss.getName(), ": ", "formatDate: ", err);
  }
}
