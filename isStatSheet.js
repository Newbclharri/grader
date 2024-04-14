/**
 * returns true if a tab with response form stats is found
 * in the active spreadsheet
 * or false otherwise
 * @param {object} sheet - sheet default is the active sheet in the Spreadsheet
 * @return {boolean}
 */
function isStatSheet(sheet) {
  try{
    sheet = typeof sheet === "object" ? sheet : SpreadsheetApp.getActive().getActiveSheet();

    if(!isCampanita(sheet)){
      const sheetName = sheet.getName().toLowerCase();
      const separatedStrings = sheetName.split(" ");
      if(separatedStrings.includes("weekly"));
      return true;
    };
    return false;
    
  }catch(err){
    console.log(err);
  };
};