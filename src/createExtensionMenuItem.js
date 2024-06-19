function createExtensionMenuItem(){
  try{
    const uI = SpreadsheetApp.getUi();
    const activeSh = SpreadsheetApp.getActive().getActiveSheet();
    uI
      .createAddonMenu()
        .addItem('Set Triggers','setTriggers')
        .addItem('Delete Triggers', 'deleteTriggers')
        .addSeparator()
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
  const section = "A"
  try{
    createStatSheet({section, threshold: 10, max: 0, accuracy: true});
    exportWeeklyReport2(section, "https://docs.google.com/spreadsheets/d/1hVoTabVT2M66bdi5Z-1Xh6pYQqEysn0FSiMmY57Sb4s/edit#gid=1049976611")
  }catch(err){
    console.log(err)

    SpreadsheetApp.getUi()
      .alert(err)
  }

}

function insertCsvReportsFromMenu(){
  insertCsvReadySheets()
}

