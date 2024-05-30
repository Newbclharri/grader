/**
 * checks if the active spreadsheet
 * has a Form Response sheet
 * @return {Boolean} foundAResponseForm
 */
function hasAFormResponseSheet(){
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets();
  let foundAResponseForm = false;
  sheets.forEach(sheet =>{
    if(isCampanita(sheet)){
     foundAResponseForm = true;
    }
  })
  return foundAResponseForm;
}