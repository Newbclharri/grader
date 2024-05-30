function fetchAllStudentData() {
  try{
    const url = "https://script.google.com/macros/s/AKfycbwNmtaBN5MnObaIIt4MLz5TJysqX-MZ4dvpgAo1vCOCS6NK4cDKrm-wicQVc6GUjdku/exec";
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    console.log(data);
    Logger.log(data);
  }catch(err){
    console.log(err);
    Logger.log(err);
  }
}

