/**
 * Google Apps Script Trigger that
 * runs included functions after openinig
 * this Spreadsheet document
 */
function initialize(section, url) { 
  if(hasAFormResponseSheet() && hasADefaultSheet()) removeDefaultSheets();
  createStatSheet({section, max: 0, accuracy: true});
  exportWeeklyReport2(section,url)

}
