function confirmDisbursement(selectedIds,selectedControl) {
  var confirmStrings = {
    title: "ALERT",
    subtitle: "Are you sure you want to disburse the selected items?",
    text: "NOTE: This will tag the appointments as disbursed and will be reflected on the doctor's dashboard."
  }
  Xrm.Navigation.openConfirmDialog(confirmStrings).then(
      function (success) {
          if (success.confirmed) {
              updateDisbursedField(selectedIds,selectedControl);
          }
      }
  );
}
    

function updateDisbursedField(selectedIds,selectedControl) { // update Disbursed two option field in retrieved Appointment
  var fullDate = new Date();
  var month = fullDate.getMonth() + 1;
  var date = fullDate.getDate();
  var year = fullDate.getFullYear();
  var hours = fullDate.getHours();
  var minutes = fullDate.getMinutes();
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var seconds = fullDate.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  if(month < 12) {
    var dateString = month + "/" + date + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " " + ampm;
  } else if(month == 13) {
    month = month - 1;
    var dateString = month + "/" + date + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " " + ampm;
  }
  
  // alert(dateString);
  // getFullYear() - Returns the 4-digit year
  // getMonth() - Returns a zero-based integer (0-11) representing the month of the year.
  // getDate() - Returns the day of the month (1-31).
  // getDay() - Returns the day of the week (0-6). 0 is Sunday, 6 is Saturday.
  // getHours() - Returns the hour of the day (0-23).
  // getMinutes() - Returns the minute (0-59).
  // getSeconds() - Returns the second (0-59).
  // getMilliseconds() - Returns the milliseconds (0-999).
  // getTimezoneOffset() - Returns the number of minutes between the machine local time and UTC.
    if (selectedIds != null && selectedIds != "") {
        var strIds = selectedIds.toString();
        var arrIds = strIds.split(",");
        for (var i = 0; i < arrIds.length; i++) {          
          console.log(arrIds[i]);
          // do your operations here
          // set to disbursed
          var entity = {};
          entity.mphhi_disbursed = true;
          entity.mphhi_disburseddate = dateString;

          Xrm.WebApi.online.updateRecord("msemr_appointmentemr", ""+arrIds[i]+"", entity).then(
              function success(result) {
                  var updatedEntityId = result.id;
              },
              function(error) {
                  Xrm.Utility.alertDialog(error.message);
              }
          );
        }       
    }
    else {
        alert("No records selected!");
    }
    if(selectedIds) {

    }


    // create pf disbursement records
    var entity = {};
      entity.mphhi_pfdisbursementname = dateString;

      Xrm.WebApi.online.createRecord("mphhi_pfdisbursement", entity).then(
          function success(result) {
              var newEntityId = result.id;
          },
          function(error) {
              Xrm.Utility.alertDialog(error.message);
          }
      );

    selectedControl.refresh();
    selectedControl.refresh();
}

