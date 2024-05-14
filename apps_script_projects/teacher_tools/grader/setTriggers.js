function setTriggers() {
  const uI = SpreadsheetApp.getUi();
  let message,alert;
  try{
    if(getResponseSheetNames().length){
      const triggers = ScriptApp.getProjectTriggers();
      triggers.forEach(trigger =>{
        // console.log(trigger.getEventType())
      })
      const spreadSh = SpreadsheetApp.getActive();

      if(!hasTrigger(ScriptApp.EventType.ON_FORM_SUBMIT, "onSubmit")){
        message = "onSubmit trigger set"
        console.log(message)
        alert = message
        ScriptApp
          .newTrigger("onSubmit")
          .forSpreadsheet(spreadSh)
          .onFormSubmit()
          .create()
      }else{
        message = "onSubmit trigger already exists";
        console.log(message);
        alert = message;
      }

      if(!hasTrigger(ScriptApp.EventType.ON_OPEN, "initialize")){
        message = "onOpen trigger set"
        ScriptApp
          .newTrigger("initialize")
          .forSpreadsheet(spreadSh)
          .onOpen()
          .create()
        console.log(message);
        alert += "\n" + message;
      }else{
        message = "onOpen trigger already exists";
        console.log(message);
        alert += "\n" + message;
      }

      if(!hasTrigger(ScriptApp.EventType.ON_CHANGE, "onChange")){
        ScriptApp
          .newTrigger("onChange")
          .forSpreadsheet(spreadSh)
          .onChange()
          .create()
        message = "onChange trigger set";
        console.log(message);
        alert += "\n" + message;
      }else{
        message = "onChange trigger already exists";
        console.log(message);
        alert += "\n" + message
      }

      if(!hasTrigger(ScriptApp.EventType.CLOCK,"runWeekly")){
        //execute daily btwn 8 - 9am
        ScriptApp
          .newTrigger("runWeekly")
          .timeBased()
          .everyWeeks(1)
          .onWeekDay(ScriptApp.WeekDay.FRIDAY)
          .atHour(16)
          .create();
        message = "weekly trigger set";
        console.log(message);
        alert += "\n" + message;
      }else{
        message = "weekly trigger already exists"
        console.log(message);
        alert += "\n" + message;
      }

      if(!hasTrigger(ScriptApp.EventType.CLOCK,"runDaily")){
        //execute daily btwn 8 - 9am
        ScriptApp
          .newTrigger("runDaily")
          .timeBased()
          .everyDays(1)
          .atHour(8)
          .create();

        //execute daily btwn 4 - 5pm
        ScriptApp
        .newTrigger("runDaily")
        .timeBased()
        .everyDays(1)
        .atHour(16)
        .create();
        message = "daily trigger set";
        console.log(message);
        alert += "\n" + message;
      }else{
        message = "daily trigger already exists"
        console.log(message);
        alert += "\n" + message;
      }
      uI.alert(alert) 
    }
  }catch(err){
    console.error(err);
  }  
}

function hasTrigger(eventType, handlerFunction) {
  var triggers = ScriptApp.getProjectTriggers();
  var triggerExists = false;
  triggers.forEach(function (trigger) {
    if(trigger.getEventType() === eventType &&
      trigger.getHandlerFunction() === handlerFunction)
      triggerExists = true;
  });
  return triggerExists;
}