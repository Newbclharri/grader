function setSection(message = "Enter Section: ", invalid){
  const ss = SpreadsheetApp.getActive();
  const ui = SpreadsheetApp.getUi();
  const sheetName = "Info";
  const lastSheetIndex = ss.getSheets().length;
  
  const header = [];
  const col1 = "Section";
  let userInput,sheet, numRowsHeader, indexOflastRowHeader, lastColumn, rowStart, colStart;
  if(!ss.getSheetByName(sheetName)){
    ss.insertSheet(sheetName, lastSheetIndex); 
  }
  ///////////////SET SHEET HEADERS////////////////////
    sheet = ss.getSheetByName(sheetName);
    header.push([col1]); //[[col1]]
    numRowsHeader = header.length;
    indexOflastRowHeader = header.length - 1; 
    lastColumn = header[indexOflastRowHeader].length;
    rowStart = numRowsHeader + 1;
    colStart = 1;
    range = sheet.getRange(numRowsHeader,colStart);
    console.log(range.getValue())
    if(!range.getValue()){
      range = sheet.getRange(numRowsHeader, colStart, 1, lastColumn)
      range.setValues(header); 
    }
  ////////////////SET SECTION////////////////
  range = sheet.getRange(rowStart, colStart);
  if(!range.getValue()){
    range.setValue(Browser.inputBox(message).toUpperCase())
  }
  sheet.hideSheet();
}