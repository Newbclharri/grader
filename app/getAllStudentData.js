/**
 * Imports all student data from an exogenous spreadsheet
 * using the library "ImportExportIDNumbers"
 * Imports Spanish II (periods 2,3,4, and 6) student data
 * and Spanish III (periods 7 and 8) student data
 * @return {Object} student data
 */

function getAllStudentData() {
  const allStudentData = ImportExportIDNumbers.getAllStudentData();  
  return allStudentData;
}