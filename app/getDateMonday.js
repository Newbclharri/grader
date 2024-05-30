/**
 * returns the date for the Monday of the earliest found
 * response form in the active Spreadsheet
 * in the format of 'MMM. dd, yyyy'
 * example: JAN. 01, 2004
 * @return {string} formattedDate
 */
function getDateMonday() {
  renameResponseSheets()
  let earliestDate, targetDate, difference, formattedDate 
  const MILLI_SECS_IN_A_DAY = 24 * 60 * 60 * 1000;
  const ss = SpreadsheetApp.getActive();
  const timeZone = "CST";
  const formattedString = "MMM. dd, yyyy"
  const sheets = ss.getSheets();
  const responseFormNames = [];
  try{
    sheets.forEach(sheet =>{
      if(isCampanita(sheet)){
        responseFormNames.push(sheet.getName())
      }
    })

    earliestDate = getEarliestFormDate();
    if(responseFormNames){
      responseFormNames.forEach(formName =>{
        let formDate = new Date(formName);
        if(formDate < earliestDate) earliestDate = formDate
      })

      difference = Math.abs(earliestDate.getDay() - 1)
      if (earliestDate.getDay() < 1){
        targetDate = new Date(earliestDate.getTime() + (difference * MILLI_SECS_IN_A_DAY))
      }else{
        targetDate = new Date(earliestDate.getTime() - (difference * MILLI_SECS_IN_A_DAY))
      }
      formattedDate = Utilities.formatDate(targetDate, timeZone, formattedString)
      return formattedDate
    }
  }catch(err){
    console.log(err)
  }
}

function testGetDateMonday(){
  console.log(new Date (getDateMonday()))
}

/**
 * returns the latest or earliest form response sheet
 * @return {object} earliestDate
 */

function getEarliestFormDate(){
  renameResponseSheets();
  
  const ss = SpreadsheetApp.getActive();
  const sheets = ss.getSheets();
  const responseFormDates = [];
  sheets.forEach(sheet =>{
    if(isCampanita(sheet)){
      responseFormDates.push(new Date(sheet.getName()))
    }
  })
  let earliestDate = responseFormDates[responseFormDates.length -1];
  responseFormDates.forEach(formDate =>{
    if(formDate < earliestDate) earliestDate = formDate
  })
  return earliestDate
}
