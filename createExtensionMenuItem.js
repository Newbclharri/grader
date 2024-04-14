function createExtensionMenuItem(){
  try{
    const uI = SpreadsheetApp.getUi();
    const activeSh = SpreadsheetApp.getActive().getActiveSheet();
    uI
      .createAddonMenu()
        .addItem('Check', 'setBackgroundColor')
        .addSeparator()
        .addItem('Grade', 'createReportFromMenu')
        .addSeparator()
        .addItem("CSV Reports",'insertCsvReportsFromMenu')
        .addToUi();
  }catch(err){
    console.log(err);
    uI.alert(err);
  }
}

function createReportFromMenu(){
  try{
    createStatSheet({section: "A", threshold: 10, max: 0, accuracy: true})
  }catch(err){
    console.log(err)

    SpreadsheetApp.getUi()
      .alert(err)
  }

}

function insertCsvReportsFromMenu(){
  insertCsvReadySheets()
}