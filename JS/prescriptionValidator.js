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

    var getPrescriptionDate = params['dt'];
    var splitDate = getPrescriptionDate.split("/");
    var prescDateString = splitDate[0] + "/" + splitDate[1] + "/" + splitDate[2];
    // alert(splitDate[0] + "/" + splitDate[1] + "/" + splitDate[2]);

    var docType = params['tp']; // parameter for doctype -- mdc lang naman yung doctype

    var dateToday = new Date(); // get date today
    //var time = dateToday.getHours() + ":" + dateToday.getMinutes() + ":" + dateToday.getSeconds(); // sample how to get each value from date today
    var readableDate = dateToday.getMonth()+1 + "/" + dateToday.getDate() + "/" + dateToday.getFullYear(); // readable format
    //alert(readableDate);
    var parseDateTodayHoursToInt = parseInt(dateToday.getHours()); // get hours only and parse to integer, we will use this for our condition
    var revertToStandardTime = parseDateTodayHoursToInt - 12; // subtract by 12 because javascript returns military time, this will convert it to normal time for better user experience
    // Parse Date today to Integer
    var parseMonthToInt = parseInt(dateToday.getMonth()+1);
    if(parseMonthToInt == 13) { // pag january na
      parseMonthToInt = 1;
    }
    // var parseMonthToInt = parseInt(dateToday.getMonth()+1);
    var parseDayToInt = parseInt(dateToday.getDate());
    var parseYearToInt = parseInt(dateToday.getFullYear());
    // Slice Prescription Consultation Date to each Month, Day, Year

    var splitMonth = splitDate[0];
    var splitDay = splitDate[1];
    var splitYear = splitDate[2];
    var parseConsultationMonthToInt = parseInt(splitMonth); // parse month to int

    console.log("Year: " + splitYear) // for debugging purposes
    
    // Parse splitted Prescription Consultation Month, Day, Year to Integer
    
    var parseConsultationDayToInt = parseInt(splitDay); // parse day to int
    var parseConsultationYearToInt = parseInt(splitYear); // parse year to int

    console.log("Date to INT =  " + parseConsultationMonthToInt + "/" + parseConsultationDayToInt + "/" + parseConsultationYearToInt); // for debugging purposes

    // check if medical certificate
    var mdcId = params['dt'];
    var mdcArray = mdcId.split("/");
    var mdcString = mdcArray[0] + "/" + mdcArray[1] + "/" + mdcArray[2];
    if(docType == 'mdc') {
      $(".consultation-date").append(mdcString);
      var mdcMonth = parseInt(mdcArray[0]);
      var mdcDay = parseInt(mdcArray[1]);
      var mdcYear = parseInt(mdcArray[2]);
      
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
      } else if(mdcDay < parseDayToInt && mdcMonth == parseMonthToInt && mdcYear == parseYearToInt) { // check if consultation date is less than date today
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
      $(".consultation-date").append(prescDateString); 
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