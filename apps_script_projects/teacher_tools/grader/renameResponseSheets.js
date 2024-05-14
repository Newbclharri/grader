/**
 * Rename all form response sheets with date of first submission
 */

function renameResponseSheets() {
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets();
  //Iterate over all sheet objects in the Spreadsheet
  sheets.forEach(sheet =>{
    if(!isARenamedForm(sheet) && isCampanita(sheet)){
      const headerRow = 1;
      const colStart = 1;
      const numRows = 1;
      const numCols = sheet.getLastColumn();
      const rangeHeader = sheet.getRange(headerRow, colStart, numRows, numCols);
      const headerValues = rangeHeader.getValues()[0];
      const timeStampColumn = getTimestampColumn(sheet);
      //get the date object from the timestamp column of the first submission
      const date = sheet.getRange(headerRow + 1, timeStampColumn).getValue();
      const timeZone = ss.getSpreadsheetTimeZone();
      // Date Format example: Feb/05/2024
      const formattedDate = Utilities.formatDate(date,timeZone,"MMM/dd/yyyy"); // => Feb/05/2024
      //change the name of each form submission sheet to the date of submission
      sheet.setName(formattedDate)
    }    
  })
}


/**
 * returns a boolean if the Form Response sheet has been renamed
 * from the default "Form Response <nth value>" string
 * @param {object} sheet - default value is active sheet object
 * @return {boolean}
 */
function isARenamedForm(sheet = SpreadsheetApp.getActive().getActiveSheet()){
  sheet = typeof sheet === "object" ? sheet :SpreadsheetApp.getActive().getActiveSheet();
  const key = "form";
  let substring = sheet.getName();
  substring = substring   
    .substring(0,4)
    .toLowerCase();
  if(substring === key){
    return false;
  }
  return true;  
}

function testIsARenamedForm(){
  console.log(isARenamedForm());
}

/** search the string value in given array
 * find and return the "Timestamp" column position in the sheet
 * @param {Array} array
 * @return {Number} column
 */

// function getTimestampColumn(array){
//   let column;
//   array.forEach((value,index) =>{
//     if(value.toLowerCase() === "timestamp") column = index + 1;
//   })
//   return column;
// }