/**
 * returns an array containing the names of all form submissions
 * in the active Spreadsheet
 * @return {Array} sheetNames
 */
function getResponseSheetNames() {
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets();
  const sheetNames =[];
  sheets.forEach(sheet =>{
    if(isCampanita(sheet)) sheetNames.push(sheet.getName())
  })
  return sheetNames;
}
