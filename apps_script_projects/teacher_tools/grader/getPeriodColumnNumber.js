/**
 * Returns the column poisition in a sheet
 * that has the header title "period". Returns undefined if not found
 * @param {object} [sheet = default] default value is 
 * @param {number} [headerRow = 1] Position of header row. Default value is 1
 * the active sheet in the spreadsheet.
 * @return {number}
 */
function getPeriodColumnNumber(sheet = SpreadsheetApp.getActive().getActiveSheet(), headerRow = 1) {
  //handle optional parameter to ensure object is a sheet
  sheet = typeof sheet.showSheet === "function" ? sheet : SpreadsheetApp.getActive().getActiveSheet();
  const colStart = 1; numRows = 1, numCols = sheet.getLastColumn();
  const range = sheet.getRange(headerRow,colStart,numRows, numCols)
  const headers = range.getValues()[0];
  const key = "period";

  for(let columnIndex = 0; columnIndex < headers.length; columnIndex++){
    const header = headers[columnIndex].toLowerCase();
    if(header === key) return columnIndex + 1;
  }
  return;
}