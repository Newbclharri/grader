/**
 * checks if the active Spreadsheet
 * has a default sheet
 * @return {Boolean} isDefaultSheet
 */
function hasADefaultSheet() {
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets();
  let isDefaultSheet = false;
  sheets.forEach(sheet =>{
    const sheetName = sheet.getName();
    const target = "sheet";
    const substring = sheetName.substring(0,5).toLowerCase();
    if(substring === target){
      const lastRow = sheet.getLastRow();
      if(lastRow === 0){
        isDefaultSheet = true;
      }
    }
  })
  return isDefaultSheet;
}
