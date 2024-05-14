/** search the string value in given array
 * find and return the "Timestamp" column position in the sheet
 * @param {Object} sheet
 * @param {Number} headerRow - default value = 1
 * @return {Number} column
 */
function getTimestampColumn(sheet, headerRow=1){
  const colStart = 1;
  const numRows = 1;
  const numCols = sheet.getLastColumn();
  const rangeHeader = sheet.getRange(headerRow, colStart, numRows, numCols);
  const headerValues = rangeHeader.getValues()[0];

  let column;
  try{
    headerValues.forEach((value,index) =>{
      if(value.toLowerCase() === "timestamp") column = index + 1;
    })
  }catch(err){
    console.log("Error: ",err)
  }
  return column;
}

function testGetTimeStamp(){
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getActiveSheet();
  console.log(getTimestampColumn(sh));
}