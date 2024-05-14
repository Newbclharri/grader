function exportWeeklyReport2(section, url, numRowsHeader = 1){
  const data = getAccuratelyScoredCampanitas({section});
  const sourceSs = SpreadsheetApp.getActive();
  const header = getStatSheet()
    .getRange(1,1,1,getStatSheet().getLastColumn())
    .getValues();
  console.log("Export Header",header)
  const columnNames = [];
  let targetSs,targetSh,targetShName, targetRange,message
  targetSs = SpreadsheetApp.openByUrl(url);

    //format column header titles
    header[0].forEach(columnName =>{
      if(typeof columnName === "string"){
        columnNames.push(columnName)
      }else{
        columnNames.push(formatDate(columnName))
      }
    })

    //if sheet does not exist insert and format sheet
    if(!targetSs.getSheetByName(getResponseFormDateRange())){
      targetShName = getResponseFormDateRange();
      targetSs
        .insertSheet(targetShName,0);
    }
      //response form sheets are named by date range of each Monday - Friday weekly segment
      targetShName = getResponseFormDateRange();
      targetSh = targetSs.getSheetByName(targetShName);

      //clear all data from the exported sheet
      targetSh
        .getDataRange()
        .clear();

      //set the exported sheet header
      targetRange = targetSh.getRange(1,1,1,header[0].length);
      targetRange.setValues([columnNames]);

      let row = 1 + numRowsHeader;
      for(let id in data){
        const student = data[id];
        const studentData = [id];
      
        //retrieve student data corresponding to columnHeaders from data object
        for(let i = 1; i <= columnNames.length - 1; i++){
          const columnName = columnNames[i];
          let score;

          //If student information is of type string or is base info i.e. (name, period etc.)         
          if(typeof student[columnName] !== "object"){
            studentData.push(student[columnName.toLowerCase()]);
            
          }else{
            score = student[columnName].score;
            targetRange = targetSh.getRange(row,1,1,header[0].length - 1);
            if(score === 0) targetRange.setBackground("red");
            if(score === null){
              studentData.push("")
              targetRange.setBackground("yellow");
            }else{
              studentData.push(score);         
            }
          }          
        }
        targetRange = targetSh.getRange(row, 1, 1, header[0].length)
        targetRange.setValues([studentData])
        row++;
      }

      //freeze specific rows and columns in the target sheet on the target spreadsheet
      const idColumn =  getColumnNumber(
        targetSh.getName(),
        "id",
        {url}
      );
      const nameColumn = getColumnNumber(
        targetSh.getName(),
        "name",
        {url}
      );

      const periodColumn = getColumnNumber(
        targetSh.getName(),
        "period",
        {url}
      );
      console.log(targetSh.getName(), nameColumn)
      targetSh.hideColumns(nameColumn);
      targetSh.setFrozenRows(numRowsHeader);
      sortColumns(targetSh,[idColumn,periodColumn], {url})
      targetSh.setFrozenColumns(idColumn);

      ///////////////////////////SET COMMENTS//////////////////
      row = 1 + numRowsHeader;
      const lastRow = targetSh.getLastRow() - numRowsHeader
      const studentIds = targetSh.getRange(row,1,lastRow).getValues();

      studentIds.forEach((id, rowIndex)=>{
        rowIndex += row;
        const student = data[id[0]]
        const responseFormNames = getResponseSheetNames();
        responseFormNames.forEach(formName =>{
          const formColumn = columnNames.indexOf(formName) + 1;

          //remove existing cell comment
          console.log(formColumn)
          targetRange = targetSh.getRange(rowIndex, formColumn);
          if(targetRange.getComment()) targetRange.clearComment();

          //set comment if late submission
          if(student[formName].onTime === false){
            const dateSubmitted = student[formName].submitted
            const count = student[formName].count
            if(count === 1){
              message = "first submission: " + dateSubmitted;
            }else{
              message = "last submission: " + dateSubmitted
                + "\n" + count + " total submissions";
            }
            targetRange.setComment(message);
            targetRange.setBackground("#ffb3ff");
          }
        })
      })  
}