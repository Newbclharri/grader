function runWeekly() {
  const section = getSection();
  const url = getUrl();
  
  HandleCampanitas.createStatSheet({section, max: 0, accuracy: true});

  //create CVS ready sheets for each A day | default = periods (2,3,4)
  HandleCampanitas.insertCsvReadySheets();
  
  //exports student friendly version to the specified spreadsheet via url
  HandleCampanitas.exportWeeklyReport2(section, url);
};