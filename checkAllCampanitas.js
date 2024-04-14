/**
 * flags all sheets in this Spreadsheet for unacceptable
 * student responses to short answer questions.
 * if a student response from a particular submission is unacceptbale
 * the background color for the row is set to a specific color.
 */

function checkAllCampanitas() {
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets();
  //Iterate over all sheet object in the active Spreadsheet
  sheets.forEach(sheet =>{
    if(isCampanita(sheet)){
      setBackgroundColor(sheet,10);
    }
  })
}
