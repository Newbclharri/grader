function frameSheet(numRows, numCols, sheet = SpreadsheetApp.getActive().getActiveSheet()) {
  sheet.setFrozenRows(numRows);
  sheet.setFrozenColumns(numCols);
}