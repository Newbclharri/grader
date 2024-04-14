/**
 * user can define values for section, threshold, max
 * @param {Object} settings - user settings (default value = {})
 * @effect results in a stat sheet for Spanish II A day (periods, 2,3,4)
 * Spanish II B day (period 6)
 * Spanish III (periods 7 and 8)
 */

function createStatSheet(settings) {
    const{section,accuracy} = settings;
    //determine type of report to generate based on section value in the settings object
    const statSheetName = determineSheetName(section);
    const statSheet = SpreadsheetApp.getActive().getSheetByName(statSheetName);
    const studentData = accuracy ? getAccuratelyScoredCampanitas(settings) : getScoredCampanitas(settings);

    //insertStatSheet if not present in the active spreadsheet
    if(!statSheet){
      insertStatSheet();
      buildStatSheet();
    }else buildStatSheet(true)

  /**
   * insert specified stat sheet
   */
  function insertStatSheet(){
    const ss = SpreadsheetApp.getActive();
    const position = ss.getSheets().length + 1;
    ss.insertSheet(statSheetName, position);
  }

  /**
   * adds columns and data to specified statsheet
   */

  function buildStatSheet(build = true){
    const sh = SpreadsheetApp.getActive()
      .getSheetByName(statSheetName);

    if(build){
      sh.getDataRange().clear();
      insertStatColumns();
      populateStatColumns();
      sortColumns(statSheetName);
    }  


    //HELPER FUNCTIONS//
    /**
     * adds base column data to statsheet
     * columns: ID, Name, Period, Weekly Assignments Titled by Date, Average
     */
    function insertStatColumns(){
      const responseSheetNames = getResponseSheetNames();
      //set titles for header columns
      const columnNames = ["ID", "Name", "Period"];
      //add the names of each existing submission/response sheet to columnNames
      responseSheetNames.forEach(sheetName =>{
        columnNames.push(sheetName)
      })
      //Column "Average" is the last column title in the header row
      columnNames.push("Average")
      sh.getRange(1,1,1,columnNames.length)
        .setValues([columnNames])
      sh.setFrozenRows(1);
    }

    /**
     * populate columns with student date (D, name, period)
     * from studentData object
     */
    function populateStatColumns(){
      const numRowsHeader = 1;
      const responseSheetNames = getResponseSheetNames();
      const rowStart = numRowsHeader + 1,colStart = 1
      let row = 1;
      //Iterate over all student data in the object studentData for specific data (ID, name, period)
      //to populate rows
      for(let iD in studentData){
        let student = studentData[iD]
        //student ID serves as unique key values to retrieve weekly assignment scores      
        // const iD = key, 
        name = student.name, 
        period = student.period;
        const data = [iD, name, period];     
        
        let targetRange;
        let countZeros = 0;
        let countMissing = 0;
        //Inner loop:  For each student, count zero scores and missing scores
        responseSheetNames.forEach(sheetName =>{
          const responseScore = student[sheetName];
          if(responseScore || responseScore === 0){
            data.push(responseScore);
            if(responseScore === 0) countZeros++;
          }
          //if there is no responseScore, add empty space to column to indicate missing assignment 
          else{
            data.push("");
            countMissing++;
          }        
        })

        //push form repsponse average as last element in data array
        data.push(student.average);
        //set values for each row in the stat sheet
        targetRange = sh.getRange(row + rowStart, colStart, 1, data.length);
        targetRange.setValues([data]);

        //Highlight each column in the row except for the last column
        targetRange = sh.getRange(row + rowStart, colStart, 1, data.length - 1)
        //Highlight a student row if there is at least one missing assignment
        if(countMissing > 0) targetRange.setBackground("yellow");   
        //Highlight student row if there's at least one zero scored assignment
        if(countZeros > 0) targetRange.setBackground("red");             
        row++;
      }      
    }
  }

  /**
   * determines the name of the stat sheet based on the passed "section" argument
   * returns the corresponding stat sheet name
   * @param {String} section
   * @return {String}
   */

  function determineSheetName(section){
    switch(section){
      case "A":
        return "A Weekly Stats"
      case "B":
        return "B Weekly Stats"
      case "C":
        return "Esp3 Weekly Stats"
      default:
        return "Weekly Stats"
    }
  }
}

