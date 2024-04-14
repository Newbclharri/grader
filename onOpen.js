/**
 * Google Apps Script Trigger that
 * runs included functions after openinig
 * this Spreadsheet document
 */
function onOpen() {
  createExtensionMenuItem();
  insertCountSubmissionsColumn();
  formatResponseForm();
  if(hasAFormResponseSheet() && hasADefaultSheet()) removeDefaultSheets();
}
