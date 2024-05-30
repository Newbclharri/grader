/**
 * checks if the passed sheet argument is a form submission
 * or "campanita" by checking for specific header column values
 * unique to form submissions such as the "Timestamp" column
 * @ param {Object} sheet
 * @ return {Boolean}
 */

function isCampanita(sheet) {
  sheet = typeof sheet === "object" ? sheet : SpreadsheetApp.getActiveSheet();
  const headerRow = 1;
  const colStart = 1;
  const numRows = 1;
  const numCols = sheet.getLastColumn() ? sheet.getLastColumn() : 1;
  const rangeHeader = sheet.getRange(headerRow, colStart, numRows, numCols);
  const headerValues = rangeHeader.getValues()[0];
  let isResponseForm;
  let firstResponse;
  try{
    headerValues.forEach((value, column) =>{
      if(typeof value === "string" && value.toLowerCase() === "timestamp" ){
        // firstResponse = sheet.getRange(headerRow + 1, column + 1).getValue()
        isResponseForm = true;
      }
    })
  }catch(err){
    console.log("Error: ", err)
  }
  // if(firstResponse)return true;
  return isResponseForm;
}
