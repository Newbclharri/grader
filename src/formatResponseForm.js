/**
 * Formats response form by freezing rows and columns
 * and hiding columns with names
 * @params {object} [sheet=Active Sheet] default value is the active sheet in the Spreadsheet
 */
function formatResponseForm(sheet = SpreadsheetApp.getActive().getActiveSheet()) {
  sheet = typeof sheet.showSheet === "function" ? sheet : SpreadsheetApp.getActive().getActiveSheet()
  if(isCampanita(sheet)){
    sheet.setFrozenRows(1);
    sheet.setFrozenColumns(3);
    sheet.hideColumns(4,3)
  }
}