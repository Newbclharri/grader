function getSection() {
  const target = "section"
  const ss = SpreadsheetApp.getActive();
  const sheetName = "Info";
  let sheet, range, section, values,rowNumber, columnNumber, cell;
  if(ss.getSheetByName(sheetName)){
    sheet = ss.getSheetByName(sheetName);
    values = sheet.getDataRange().getValues();
    values.forEach((row,rowIndex)=>{
      row.forEach((value,columnIndex) =>{
        if(value.toLowerCase() === target){
          rowNumber = rowIndex + 1;
          columnNumber = columnIndex + 1;
        }
      })
    });
    cell = sheet.getRange(rowNumber + 1,columnNumber);
    section = cell.getValue();
    if(section){
      return section;
    }
  }
  section = getSectionByPeriods();
  return section;
}
