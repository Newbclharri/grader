function insertCsvReadySheets(...periods) {
  periods = periods.length || getPeriods(getStatSheet());
  const ss = SpreadsheetApp.getActive();
  const prefix = "P"
  const postfix = "CSV Ready"

  //if a CSV ready report by class period doesn't exist then create and insert one
  //there should be a csv ready report for each period found in Weekly Stats
  try{
    for(let period of periods){
      const lastSheet = ss.getSheets().length;
      const csvSheetName = prefix + period + " " + postfix
      let csvSheet = ss.getSheetByName(csvSheetName);
      if(!csvSheet){
        ss.insertSheet(csvSheetName,lastSheet);
        csvSheet = ss.getSheetByName(csvSheetName)
        setcsvSheetHeaders(csvSheet)
        setcsvClassData(csvSheet, period)
        csvSheet.setFrozenRows(1);
        csvSheet.sort(2);
      }
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

function setcsvClassData(csvSheet, classPeriod){
  try{
    const studentData = getAccuratelyScoredCampanitas({period: classPeriod});
    const rows = []
    for(let id in studentData){
      const student = studentData[id]
      const {name, average} = student
      rows.push([id,name,average])
    }
    rows.forEach((row,index) => {
      const numRowsHeader = 1
      const rowStart = numRowsHeader + 1
      const colStart = 1;
      const numRows = 1;
      const numCols = csvSheet.getLastColumn();
      csvSheet
      .getRange(rowStart + index, colStart, numRows, numCols)
      .setValues([row])
    })
  }catch(err){
    console.log("setcsvClassData: ", err)
  }
}