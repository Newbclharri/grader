/**
 * 
 */
function getDateFriday() {
  //rename form response sheets with date of first response
  renameResponseSheets();

  //date object of the Monday for the earliest resposne form detected in the active Spreadsheet
  const mondayOfEarliestResponseForm = new Date(getDateMonday())

  //number of milliseconds in one day
  const MILLI_SECS_IN_A_DAY = 24 * 60 * 60 * 1000;

  //calculates the corresponding Friday by adding 4 days in milliseconds to the Monday date object
  const fridayOfEarliestResponseForm = new Date(mondayOfEarliestResponseForm
    //getTime() converts date object to milliseconds
    .getTime()
    //addition of four days to calculate the corresponding Friday from the provided Monday date
    + (4 * MILLI_SECS_IN_A_DAY));
  const timeZone = "CST";
  const formattedFridayDate = Utilities.formatDate(fridayOfEarliestResponseForm,timeZone,"MMM. dd, yyyy");

  return formattedFridayDate

}
