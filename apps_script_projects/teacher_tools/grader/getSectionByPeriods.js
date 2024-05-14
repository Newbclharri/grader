function getSectionByPeriods( numRowsHeader = 1) {
    const ss = SpreadsheetApp.getActive();
    const ssName = ss.getName();
  try{
    //get first sheet which should be a form response
    const sheet = ss.getSheets()[0];

    ////////////GET EMAIL ADDRESS COLUMN NUMBER FROM SPECIFIED SHEET////////////////
    const emailColumn = getColumnNumber(sheet.getName(), "Email Address");

    /////////////RANGE VARIABLES///////////////
    const rowStart = numRowsHeader + 1;
    const lastRow = sheet.getLastRow();
    const numRows = lastRow - numRowsHeader;

    ////////GET EMAILS FROM EMAIL COLUMN////////
    const emails = sheet.getRange(rowStart, emailColumn, numRows)
      .getValues();

    ///////EXTRACT STUDENT ID'S FROM EMAILS////////
    const studentIds = [];
    emails.forEach(row =>{
      //extract email string from array row
      const email = row[0];

      //extract student ID from email prefix
      if(isStuEmail(email)){
        const stuId = getEmailPrefix(email);
        studentIds.push(stuId)
      }
    });
    /////ITERATE STUDENT DATA OBJECT TO GET EXISTING CLASS PERIODS ASSOCIATED WITH STUDENT ID///////
    const periods = getPeriodsFromArray(studentIds);

    /////DETERMINE A, B, OR C (SPANISH III) BASED ON EXISTING CLASS PERIODs/////
    const section = determineSection(periods);
    console.log("Master,getSectionByPeriods, section: ",section)
    return section;
  }catch(err){
    console.log(ssName, ": ", "Function: getSection: ", err);
  }
}

function getPeriodsFromArray(array = [], data = getAllStudentData()){
  try{
    const periods = [];

    ///LOOP THROUGH STUDENT ID ARRAY AND PUSH EXISTING CLASS PERIODS/////
    array.forEach(id =>{    
      if(data[id]){
        const student = data[id]
        const period = student.period;
        if (!periods.includes(period)){
          periods.push(period)
        }
      }
    });
    return periods;
  }catch(err){
    console.log(ssName, ": ", "Function: getSection | getPeriodsFromArray: ", err);
  }
}

function determineSection(array = []){
  try{
    let section;
    switch(array.length){
      case 3:
        if(array.includes(2) && array.includes(3) && array.includes(4)){
          console.log("Master, getSectionByPeriods, periods: ",array)
          section = "A";
          break;
        }
      case 2:
        if(array.includes(7) && array.includes(8)){
          section = "C";
          break;
        }
      case 1:
        if(array.includes(6)){
          section = "B";
          break;
        }
      default:
        console.log(array)
        section = "All Periods"
    }
    return section;  
  }catch(err){
    console.log(ssName, ": ", "Function: getSection | determineSection: ", err);
  }
}