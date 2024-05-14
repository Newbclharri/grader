/**
 * returns the first found stat sheet
 * in the active spreadsheet
 * @return {object} statSheet
 */
function getStatSheet() {
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets();
  for(let i = 0; i < sheets.length; i++){
    const sheet = sheets[i]
    if(isStatSheet(sheet)){
      console.log("Master, getStatSheet(), SheetName: ",sheet.getName())
      return sheet;
    } 
  }
}