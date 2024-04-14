/**
 * sort given sheet (sheetToSort), and specified columns, [array] columns
 * data in header rows, int numRowsHeader, is skipped in processing
 * @param {String} sheetToSort
 * @param [Array] columns 
 * @param {Number} numRowsHeader
 * 
 */

function sortColumns(sheetToSort,columns = [2,3], numRowsHeader = 1){
  const ss = SpreadsheetApp.getActive();
  let sh;
  if(typeof sheetToSort === "string"){
    sh = ss.getSheetByName(sheetToSort);
  }else{
    sh = sheetToSort
  }
  const rowStart = numRowsHeader + 1;
  const colStart = 1;
  const numRows = sh.getLastRow();
  const numCols = sh.getLastColumn();
  const range = sh.getRange(rowStart,colStart,numRows, numCols);
  
  //Iterate over column numbers in Array columns and sort
  columns.forEach(column =>{
    range.sort(column)
  })
}  