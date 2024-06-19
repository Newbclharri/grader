/**
 * Google Apps Script trigger
 * that executes the included functions following
 * a form response submission
 */
function onSubmit() {
  //insertCountSubmissionsColumn();
  setBackgroundColorOnSubmit(7)
  if(hasAFormResponseSheet() && hasADefaultSheet()) removeDefaultSheets();
}
