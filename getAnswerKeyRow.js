/**
 * Finds target submission row that holds correct answers
 * @param {Object} sheet
 * @param {String} target
 * @param {Number} headerRow - headerRow default values is 1
 * @return {Number} row
 */
function getAnswerKeyRow(sheet, target, headerRow = 1) {
  target = typeof sheet === "string" ? sheet : target;
  sheet = typeof sheet === "object" ? sheet : SpreadsheetApp.getActiveSheet();
  const rowStart = headerRow + 1;
  const colStart = 1;
  const numRows = sheet.getLastRow() - headerRow;
  const numCols = sheet.getLastColumn();
  const range = sheet.getRange(rowStart, colStart,numRows, numCols);
  const rows = range.getValues(); 
  let targetRow = headerRow + 1;
  let found = false;
  rows.forEach((row, rowIndex) =>{
    row.forEach((column, columnIndex) => {
      if(column === target){
        targetRow += rowIndex;
        found = true;
      }
    })
  })
  return targetRow
}

function testGetAnswerKeyRow(){
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getActiveSheet();
}


