/**
 * test function to retrieve dates from form response sheets
 * @return {Boolean}
 */
function getResponseDates() {
  sheet = sheet ? sheet : SpreadsheetApp.getActiveSheet();
  const headerRow = 1;
  const colStart = 1;
  const numRows = 1;
  const numCols = sheet.getLastColumn();
  const rangeHeader = sheet.getRange(headerRow, colStart, numRows, numCols);
  const headerValues = rangeHeader.getValues()[0];
  let timeStampeColumn;
  headerValues.forEach((value, column) =>{
    if(value.toLowerCase() === "timestamp" ){
      const firstResponse = sheet.getRange(headerRow + 1, column + 1).getValue();
      if(firstResponse) return true
    }
  })
}
