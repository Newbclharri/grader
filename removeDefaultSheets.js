/**
 * removes any unnamed sheets
 * in the active Spreadsheet
 */
function removeDefaultSheets() {
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets();
  sheets.forEach(sheet=>{
    const sheetName = sheet.getName();
    const substring = sheetName.substring(0,5).toLowerCase();
    if(substring === "sheet"){
      ss.deleteSheet(sheet);
    } 
  })     
}

function runRemoveDefaultSheets(){
  if(hasAFormResponseSheet()) removeDefaultSheets();
}