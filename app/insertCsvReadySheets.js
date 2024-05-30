function insertCsvReadySheets(...periods) {
  periods = periods.length || getPeriods(getStatSheet());
  const ss = SpreadsheetApp.getActive();
  const prefix = "P"
  const postfix = "CSV Ready"

  //if a CSV ready report by class period doesn't exist then create and insert one
  //there should be a csv ready report for each period found in Weekly Stats
  try{
    //loop through all periods on active Spreadsheet and create or overwrite corresponding CSV tab
    for(let period of periods){
      const lastSheet = ss.getSheets().length;
      const csvSheetName = prefix + period + " " + postfix
      let csvSheet = ss.getSheetByName(csvSheetName);

      //insert class period CSV if it does not exist on the active Spreadsheet
      if(!csvSheet){
        ss.insertSheet(csvSheetName,lastSheet);
      }
      csvSheet = ss.getSheetByName(csvSheetName)
      //overwrite existing data
      csvSheet.getDataRange().clear();
      setcsvSheetHeaders(csvSheet)
      setcsvClassData(csvSheet, period)
      csvSheet.setFrozenRows(1);
      csvSheet.sort(2);
    }
  }catch(err){
    console.log("insertcsvReadySheets: ", err);
  }
}

function setcsvSheetHeaders(csvSheet){
  try{
    const data = [["ID", "Name", "Score"]]
    const headers = data[0]
    const range = csvSheet.getRange(1,1,1,headers.length)
    range.setValues(data);
  }catch(err){
    console.log("setcsvSheetHeaders: ", err)
  }
}

function setcsvClassData(csvSheet, classPeriod, numRowsHeader = 1){
  try{    
    const studentData = getAccuratelyScoredCampanitas({period: classPeriod});
    const rows = [];

    //populate rows ror each student in student data object
    for(let id in studentData){
      const student = studentData[id]
      const {name, average} = student
      rows.push([id,name,average])
    }

    //set target sheet rows with student data  
    const rowStart = numRowsHeader + 1
    const colStart = 1;
    const numRows = rows.length
    const numCols = rows[0].length;
    csvSheet
    .getRange(rowStart, colStart, numRows, numCols)
    .setValues(rows)    
  }catch(err){
    console.log("setcsvClassData: ", err)
  }
}