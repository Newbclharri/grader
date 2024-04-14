function highlightRowsWithMissingValue(sheet,numRowsHeader = 1,bgColor = "yellow"){
  const rowStart = numRowsHeader + 1, columnStart = 1,
  numRows = sheet.getLastRow() - numRowsHeader, numColumns = sheet.getLastColumn() - 1; 
  const range = sheet.getRange(rowStart,columnStart, numRows, numColumns);
  const rows = range.getValues();
  let targetRange;
  rows.forEach((row, rowNum) =>{
    row.forEach((column, columnNum) =>{
      targetRange = sheet.getRange(rowNum + rowStart, columnStart,1,numColumns)
      if(!column && column !== 0){
        targetRange.setBackgroundColor(bgColor);
      }    
    })
  })
}