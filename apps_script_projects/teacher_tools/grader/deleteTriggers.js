function deleteTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  const ui = SpreadsheetApp.getUi();
  const message = "Triggers removed"
  try{
    triggers.forEach(trigger =>{
      ScriptApp.deleteTrigger(trigger)
    });
  console.log(message);
  ui.alert(message);
  }catch (err){
    console.error(err);
    ui.alert(err);
  }
}
