$(document).ready(function() {
  // adjust colspan of fields
  $("#mphhi_dateofbirth_description").parent().parent().attr("colspan","2"); // birthdate
  $("#mphhi_dateofbirth_description").parent().css("width","100%");

  $("#mphhi_religion_name").parent().parent().attr("colspan","2"); // religion
  $("#mphhi_religion_name").parent().css("width","100%");

  $("#mphhi_citizenship_name").parent().parent().attr("colspan","2"); // citizenship
  $("#mphhi_citizenship_name").parent().css("width","100%");

  // get Age 
  // get birth date
  var bDate = $("#mphhi_dateofbirth_datepicker_description").val();
  var bSplit = bDate.split("/"); // split values
  var birthMonth = parseInt(bSplit[0]);
  var birthDay = parseInt(bSplit[1]);
  var birthYear = parseInt(bSplit[2]);

  // get date today
  var dateToday = new Date();

  // get month
  var month = dateToday.getMonth();
  // get day
  var day = dateToday.getDate();
  // get year
  var year = dateToday.getFullYear();

  // parse date to int
  var monthInt = parseInt(month);
  var dayInt = parseInt(day);
  var yearInt = parseInt(year);

    if(monthInt < birthMonth && dayInt < birthDay) {
      var getAge = yearInt - birthYear - 1;
      $("#mphhi_ageportal").val(getAge);
    } else if (monthInt == birthMonth && dayInt < birthDay){
      var getAge = yearInt - birthYear - 1;
      $("#mphhi_ageportal").val(getAge);
    } else if (monthInt == birthMonth && dayInt >= birthDay){
      var getAge = yearInt - birthYear;
      $("#mphhi_ageportal").val(getAge);
    }else {
      var getAge = yearInt - birthYear;
      $("#mphhi_ageportal").val(getAge);
    }


  // disable age field
  if(isNaN($("#mphhi_ageportal").val())) {
    $("#mphhi_ageportal").parent().parent().parent().hide();
  } else {
    $("#mphhi_ageportal").parent().parent().parent().show();
  }
  $("#mphhi_ageportal").prop("disabled",true); // disable age field
  
});

