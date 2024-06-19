function getUrl() {
  const section = getSection().toUpperCase();
  switch(section){
    case "A":
      return "https://docs.google.com/spreadsheets/d/16d1_RfAjZ6Wxf9HSIhuzHBo66LZpWuFo4a2RnIrkn2k/edit?usp=sharing";
    case "B":
      return "https://docs.google.com/spreadsheets/d/1mUGtF3zcgZs5bHN2QuULDSPNCtKmSYx8ohqJPDq4lR8/edit?usp=sharing";
    case "C":
      return "https://docs.google.com/spreadsheets/d/1hVoTabVT2M66bdi5Z-1Xh6pYQqEysn0FSiMmY57Sb4s/edit?usp=sharing";
  }
}
