function runDaily() {
  const section = getSection();
  const url = getUrl();
  
  HandleCampanitas.createStatSheet({section, max: 0, accuracy: true});
  
  //exports student friendly version to the specified spreadsheet via url
  HandleCampanitas.exportWeeklyReport2(section,url);
};