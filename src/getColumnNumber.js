function getColumnNumber(sheetName,target, options = {}){
  target = String(target).toLowerCase();
  let {url, headerRow} = options
  headerRow = headerRow || 1;
  const  ss = url ? SpreadsheetApp.openByUrl(url) : SpreadsheetApp.getActive();
  try{
    const sheet = ss.getSheetByName(sheetName);
    const columnNames = sheet
      .getRange(headerRow,1,1,sheet.getLastColumn())
      .getValues()[0];

    for(let i = 0; i < columnNames.length; i++){
      const name = String(columnNames[i]).toLowerCase();
      if(name === target) return i + 1;
    }
  }catch(err){
    console.log(ss.getName(),": ","getColumnNumber: ", err)
  }
}

function testGetColumnNum(){
  const colNum = getColumnNumber("A Weekly Stats",new Date("Feb/07/2024"));
  console.log(colNum)
}
