function testExport2(){
  exportWeeklyReport2("C", "https://docs.google.com/spreadsheets/d/1hVoTabVT2M66bdi5Z-1Xh6pYQqEysn0FSiMmY57Sb4s/edit?usp=sharing")
}
function testcreatStatSheet(){
  createStatSheet({section: getSection(), threshold: 10 , max: 0, accuracy: true});
}

function testHeader(){
  const ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1hVoTabVT2M66bdi5Z-1Xh6pYQqEysn0FSiMmY57Sb4s/edit#gid=185006322");
  const sh = ss.getSheetByName("Jan. 08 - Jan. 12, 2024");
  const header = sh.getRange(1,1,1,sh.getLastColumn());
  console.log(header)
}

function testGetSection(){
  console.log(getSection())
}
