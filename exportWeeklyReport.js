/**
 * inserts a sheet into the destination spreadsheet given the url
 * for the specified section
 * that displays student average of all form responses
 * in the week range of the earliest detected response form
 * in the active spreadsheet using an importrange formula
 * @param {string} url
 */

function exportWeeklyReport(url) {
  try{
    const ss = SpreadsheetApp.getActive();
    const weeklyStatSheetName = getStatSheet().getName();
    const formula = `=importrange("${ss.getUrl()}","${weeklyStatSheetName}!A1:G")`
    let targetSs,targetSh,targetShName,targetRange; 
    targetSs = SpreadsheetApp.openByUrl(url);
    //if sheet does not exist insert and format sheet
    if(!targetSs.getSheetByName(getResponseFormDateRange())){
      targetShName = getResponseFormDateRange()
      targetSs
        .insertSheet(targetShName,0);
      targetSh = targetSs.getSheetByName(getResponseFormDateRange())
      targetRange = targetSh.getRange(1,1);
      targetValue = targetRange.getValue();
      //allow access to use importrange formula
      DriveApp.getFileById(ss.getId()).setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
      targetRange.setValue(formula)
      targetSh.hideColumns(2)
      targetSh.setFrozenRows(1)
      targetSh.setFrozenColumns(1)
      //protect source docuemnt origin
      DriveApp.getFileById(ss.getId()).setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.EDIT);
    }
    targetShName = getResponseFormDateRange();
    targetSh = targetSs.getSheetByName(targetShName) 

    targetSh
      .getDataRange()
      .clearFormat()

    targetSh.hideColumns(2)
    highlightRowsWithMissingValue(targetSh);
    highlightRowsWithAZero(targetSh);
  }catch(err){
    console.log(err);
    Logger.log(err);
  }
  
}

function testExport(){
  exportWeeklyReport("https://docs.google.com/spreadsheets/d/1NMKiXx4NkHe9j_tw5CfQ1ltBQXwTCRllQKVbhMN1QU4/edit#gid=1764747354")
}

/**
 * 
 */
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

function highlightRowsWithAZero(sheet,numRowsHeader = 1,bgColor = "red"){
  const rowStart = numRowsHeader + 1, columnStart = 1,
  numRows = sheet.getLastRow() - numRowsHeader, numColumns = sheet.getLastColumn() - 1; 
  const range = sheet.getRange(rowStart,columnStart, numRows, numColumns);
  const rows = range.getValues();
  let targetRange;
  rows.forEach((row, rowNum) =>{
    row.forEach((column, columnNum) =>{
      targetRange = sheet.getRange(rowNum + rowStart, columnStart,1,numColumns)
      if(column === 0){
        targetRange.setBackgroundColor(bgColor);
      }     

    })
  })
}
