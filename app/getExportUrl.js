function getExportUrl(section) {
  let url
  switch(section){
    case "A":
      url = "https://docs.google.com/spreadsheets/d/16d1_RfAjZ6Wxf9HSIhuzHBo66LZpWuFo4a2RnIrkn2k/edit?usp=sharing";
      console.log(url);
      return url;
    case "B":
      url = "https://docs.google.com/spreadsheets/d/1mUGtF3zcgZs5bHN2QuULDSPNCtKmSYx8ohqJPDq4lR8/edit?usp=sharing";
      console.log(url);
      return url;
    case "C":
      url = "https://docs.google.com/spreadsheets/d/1hVoTabVT2M66bdi5Z-1Xh6pYQqEysn0FSiMmY57Sb4s/edit?usp=sharing";
      console.log(url);
      return url;    
  }
}

function testSwitch(){
  getExportUrl("A");
}
