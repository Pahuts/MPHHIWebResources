$(document).ready(function () {
  // Get the query string from the URL
    var queryString = window.location.search;
    queryString = queryString.substring(1);
  
    // Parse the query string and assign parameters to "params" object
    var queries = queryString.split("&");
    var params = {};
    var query;
    for (var i = 0; i < queries.length; ++i) {
        query = queries[i].split("=");
        params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
    }

    var sliceDate = params['id'].slice(0, -8)
    var docType = params['tp'];
    var mdcId = params['id'];
    if(docType == 'mdc') {
      $(".consultation-date").append(sliceDate);
    } else {
      $(".consultation-date").append(sliceDate);
    }
    

    var dateToday = new Date(); // get date today
    //var time = dateToday.getHours() + ":" + dateToday.getMinutes() + ":" + dateToday.getSeconds(); // sample how to get each value from date today
    var readableDate = dateToday.getMonth()+1 + "/" + dateToday.getDate() + "/" + dateToday.getFullYear(); // readable format
    //alert(readableDate);
    var parseDateTodayHoursToInt = parseInt(dateToday.getHours()); // get hours only and parse to integer, we will use this for our condition
    var revertToStandardTime = parseDateTodayHoursToInt - 12; // subtract by 12 because javascript returns military time, this will convert it to normal time for better user experience
    // Parse Date today to Integer
    var parseMonthToInt = parseInt(dateToday.getMonth()+1);
    var parseDayToInt = parseInt(dateToday.getDate());
    var parseYearToInt = parseInt(dateToday.getFullYear());
    // Slice Prescription Consultation Date to each Month, Day, Year
    var slicePresMonth = params['id'].slice(0, -16)
    var slicePresDay = params['id'].slice(2, -13)

    var parseConsultationMonthToInt = parseInt(slicePresMonth);

    if(parseConsultationMonthToInt > 9) { // check if year today is greater than 9
      var slicePrescYear = params['id'].slice(6, -8)
    } else {
      var slicePrescYear = params['id'].slice(5, -8)
    }

    console.log("Year: " + slicePrescYear)
    
    // Parse Sliced Prescription Consultation Month, Day, Year to Integer
    
    var parseConsultationDayToInt = parseInt(slicePresDay);
    var parseConsultationYearToInt = parseInt(slicePrescYear);
    
    
   if(docType == 'mdc'){
      var mdcArray = mdc.split(" ");
      var mdcMonth = mdcArray(0);
      var mdcDay = parseInt(mdcArray(1));
      var mdcYear = parseInt(mdcArray(2));

      if(mdcYear < parseYearToInt) { // check if consultation date year is less than year now
        $('.box-logo').append('<img class="box-image" src="../error_icon.jpg" />');
        $(".box-cent").css("border-top", "solid 5px red");
        $(".qr-code-state").append("Oh Snap!");
        $(".qr-content").append("The QR Code is not valid anymore. Please contact your doctor.");
        $(".qr-code-state").css("color", "red");
      } else if(mdcMonth < parseMonthToInt && mdcYear == parseYearToInt) { // check if consultation date month is less than month now
        $('.box-logo').append('<img class="box-image" src="../error_icon.jpg" />');
        $(".box-cent").css("border-top", "solid 5px red");
        $(".qr-code-state").append("Oh Snap!");
        $(".qr-content").append("The QR Code is not valid anymore. Please contact your doctor.");
        $(".qr-code-state").css("color", "red");
      } else if(mdcDay < parseDayToInt && parseConsultationMonthToInt == mdcMonth && mdcYear == parseYearToInt) { // check if consultation date is less than date today
        $('.box-logo').append('<img class="box-image" src="../error_icon.jpg" />');
        $(".box-cent").css("border-top", "solid 5px red");
        $(".qr-code-state").append("Oh Snap!");
        $(".qr-content").append("The QR Code is not valid anymore. Please contact your doctor.");
        $(".qr-code-state").css("color", "red");
      } else {
        $('.box-logo').append('<img class="box-image" src="../success_icon.jpg" />');
        $(".box-cent").css("border-top", "solid 5px #5BBA47");
        $(".qr-code-state").append("Awesome!");
        $(".qr-content").append("The QR Code is still valid. Please continue with the request.");
        $(".qr-code-state").css("color", "#5BBA47");
      }

   } else {
    if(parseConsultationYearToInt < parseYearToInt) { // check if consultation date year is less than year now
      $('.box-logo').append('<img class="box-image" src="../error_icon.jpg" />');
      $(".box-cent").css("border-top", "solid 5px red");
      $(".qr-code-state").append("Oh Snap!");
      $(".qr-content").append("The QR Code is not valid anymore. Please contact your doctor.");
      $(".qr-code-state").css("color", "red");
    } else if(parseConsultationMonthToInt < parseMonthToInt && parseConsultationYearToInt == parseYearToInt) { // check if consultation date month is less than month now
      $('.box-logo').append('<img class="box-image" src="../error_icon.jpg" />');
      $(".box-cent").css("border-top", "solid 5px red");
      $(".qr-code-state").append("Oh Snap!");
      $(".qr-content").append("The QR Code is not valid anymore. Please contact your doctor.");
      $(".qr-code-state").css("color", "red");
    } else if(parseConsultationDayToInt < parseDayToInt && parseConsultationMonthToInt == parseMonthToInt && parseConsultationYearToInt == parseYearToInt) { // check if consultation date is less than date today
      $('.box-logo').append('<img class="box-image" src="../error_icon.jpg" />');
      $(".box-cent").css("border-top", "solid 5px red");
      $(".qr-code-state").append("Oh Snap!");
      $(".qr-content").append("The QR Code is not valid anymore. Please contact your doctor.");
      $(".qr-code-state").css("color", "red");
    } else {
      $('.box-logo').append('<img class="box-image" src="../success_icon.jpg" />');
      $(".box-cent").css("border-top", "solid 5px #5BBA47");
      $(".qr-code-state").append("Awesome!");
      $(".qr-content").append("The QR Code is still valid. Please continue with the request.");
      $(".qr-code-state").css("color", "#5BBA47");
    }
   }

});