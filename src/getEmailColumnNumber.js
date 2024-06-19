/**
 * Searches the active Form Response sheet for the Email Address column
 * and returns the column number if found or 0 if not found
 * @param {Number} headerRow - headerRow default value = 1
 * @return {Number}
 */
function getEmailColumnNumber(headerRow = 1) {
  try{
    const sheet = SpreadsheetApp.getActive()
    .getActiveSheet();
    const colStart = 1;
    const numRows = 1;
    const numCols = sheet.getLastColumn();
    const headerTitles = sheet.getRange(headerRow, colStart,numRows, numCols)
      .getValues()[0]
    const target = "Email Address"

    for(let i = 0; i < headerTitles.length; i++){
      let title = headerTitles[i];
      if(title === target){
        return i + 1;
      }
    }
  }catch(err){
    console.log(err)
    
    SpreadsheetApp
    .getUi()
    .alert(err)
  }  
  return 0;
}