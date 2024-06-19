/**
 * returns a single array of the different class periods found
 * in a sheet that has a header titled "PERIOD".
 * @param {object}
 * @returns {Array} Single array of different periods found
 */
function getPeriods(sheet = SpreadsheetApp.getActive().getActiveSheet()) {
  const foundPeriods = [];
  const colStart = getPeriodColumnNumber(sheet), lastRow = sheet.getLastRow();
  const range = sheet.getRange(1,colStart,lastRow);
  const periodCol = range.getValues();

  for(let row of periodCol){
    const period = row[0];
    if(Number.isInteger(period)){
      if(!foundPeriods.includes(period)) foundPeriods.push(period)
    }
  };
  return foundPeriods; 
};