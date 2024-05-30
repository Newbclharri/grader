/**
 *returns all students in the provided classPeriod
 *@param {number}: Class period of student data to retrieve
 *@returns {Object} studentDataByPeriod An object containing organized by student ID.
 *where each ID numbers contains student name, period, and grade information 
 */
function getStudentDataByPeriod(classPeriod) {
  try{
    const allStudentData = ImportExportIDNumbers.getAllStudentData();
    const studentDataByPeriod = {}
    if(Number.isInteger(classPeriod)){
      for(let iD in allStudentData){
        const student = allStudentData[iD]
        if(student.period === classPeriod){
          studentDataByPeriod[iD] = student
        }
      }
    }else{
      return undefined
    }
    // console.log(studentDataByPeriod)
    return studentDataByPeriod
  }catch(err){
    console.log(err)
  }
}