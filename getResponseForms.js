function getResponseForms() {
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets()
  const responseForms = [];

  sheets.forEach(sheet => {
    if(isCampanita(sheet)){
      responseForms.push(sheet)
    }
  })
  return responseForms;
}
