/**
 * returns boolean if a specified stat sheet exists
 * in the active Spreadsheet
 * @param {String} target
 * @return {Boolean} found
 */

function hasStatSheet(){
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets();
  //Iterate over all sheets in the Spreadsheet
  for(let sheet of sheets){
    if(isStatSheet(sheet)) return true;
  }
  return false;
}