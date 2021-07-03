$('a[role="menuitem"][href="/access-denied/"]').hide();
// add active class to nav link
$('a[role="menuitem"][aria-label="Find a Doctor"]').addClass("active-nav");
//hide in header dropdown
    $('a[href="/profile/profile-my-appointments/"][role="menuitem"]').hide();
    $('a[href="/profile/profile-my-medical-histories/"][role="menuitem"]').hide();
    $('a[href="/guarantors/"][role="menuitem"]').hide();
    $('a[href="/dependents-appointments/"][role="menuitem"]').hide();



// //hide if Corporate User
// if ($('#mphhi_corporateuser_1').is(":checked") == true) //check if email confirmed is yes
// {
//     $('a[class="weblink list-group-item"][href="/profile/profile-my-appointments/"][title="Appointments"][aria-label="Appointments"]').hide(); //hide appointments
//     $('a[class="weblink list-group-item"][href="/profile/profile-my-medical-histories/"][title="Medical History"][aria-label="Medical History"]').hide(); //hide medical history
//     $('a[class="weblink list-group-item"][href="/guarantors/"][title="Guarantors"][aria-label="Guarantors"]').hide(); //hide guarantors
//     $('a[class="weblink list-group-item"][aria-label="Manage My Dependents"]').hide(); //hide dependents weblink
//     $('a[href="/dependents/"][role="menuitem"][aria-label="Manage My Dependents"]').hide(); // hide dependents in header dropdown
//     $('a[href="/my-appointments/dependents-appointments/"][role="menuitem"]').hide(); // hide dependents appointments in header dropdown
//     $('a[title="Appointments"][class="dropdown-toggle"][role="menuitem"]').hide(); // hide appointments in header 
//     $('a[href="/pharmacy-orders/"][role="menuitem"]').hide(); // hide appointments in header 

//     //hide in header dropdown
//     $('a[href="/profile/profile-my-appointments/"][role="menuitem"]').hide();
//     $('a[href="/profile/profile-my-medical-histories/"][role="menuitem"]').hide();
//     $('a[href="/guarantors/"][role="menuitem"]').hide();
//     $('a[href="/dependents-appointments/"][role="menuitem"]').hide();
// }
// else{
//     $('a[href="/corporate-appointments/"][role="menuitem"]').hide(); // hide corporate appointments in header 
// }
// $('#EntityFormControl').hide();

$(document).ready(function() {
  // append clear button
  var cB= $('<input class="btn btn-primary button clearfilter" type="button" id="clearButton" value="Clear Filter"/>');
  $("#entitylist-filters").append(cB);
  
  // clear filter function
  $("#clearButton").click(function () {
    $("#dropdown_1").val("");
    $("#dropdown_0").val("");
    $(".query").val("");
    $('button[data-target="#EntityList9b553251-3aa2-eb11-b1ac-000d3a55ac4e"]').click();
  });
  // end of clear filter function
    //$("tr[data-entity='mphhi_associatedhospital']").append("<td class='book-doctor-container'><button class='btn btn-primary button' onclick=>Book Appointment</button></td>");
    //$("td.book-doctor-container").append("<button class='btn btn-primary button' onclick=>Book Appointment</button>");

// auto add wildcard in search box\
// remove enter key functionality
// $('.query').on('keydown', function (e) {
//     if (e.keyCode == 13) {
//         return false;
//     }
// });
// //setup before functions
// var typingTimer;                //timer identifier
// var doneTypingInterval = 1000;  //time in ms, 2 second for example
// var $input = $('.query');

// //on keyup, start the countdown
// $input.on('keyup', function () {
//   clearTimeout(typingTimer);
//   typingTimer = setTimeout(doneTyping, doneTypingInterval);
// });

// //on keydown, clear the countdown 
// $input.on('keydown', function () {
//   clearTimeout(typingTimer);
// });

// //user is "finished typing," do something
// function doneTyping () {
//   var a = $(".query").val();
//   if(a){
//     if(a.contains("*")) {
//       $("button[aria-label='Search Results']").click();
//     } else {
//       $(".query").val("*"+a);
//       $("button[aria-label='Search Results']").click();
//     }
//   } 
//   else {
//     $("button[aria-label='Search Results']").click();
// }
// }
$(".query").keyup(function() {
  var a = $(".query").val();
  if(a.contains("*")) {
    $("button[aria-label='Search Results']").click();
  } else {
    $(".query").val("*"+a);
    $("button[aria-label='Search Results']").click();
  }
});
// end of wildcard function



// hide tooltip of entity list
$(".details-link").removeAttr("data-toggle");
$(".details-link").removeAttr("data-original-title");



//CUSTOM SCRIPT FOR CSS
$('td:nth-child(1)').addClass('DoctorName'); //add class to doctor name
$('td:nth-child(2)').addClass('Department'); //add class to department name
//$('td[data-th="Doctor"]').closest("tr").append("<td style='width: 50% !important; float: right;'><button class='btn btn-primary button' onclick=>Book an Appointment</button></td>"); //add book appointment button
//$('td[data-th="Doctor"]').closest("tr").insertAfter("<td style='width: 50% !important; float: right;'><button class='btn btn-primary button' onclick=>Book an Appointment</button></td>"); //add button
//$("<td style='width: 50% !important; float: right; margin-top: -40px !important;padding-bottom: 0px !important; margin-bottom: 0px !important;'><button class='btn btn-primary button' onclick=>Book an Appointment</button></td>").insertAfter('td[data-th="Doctor"]'); //add button


});

