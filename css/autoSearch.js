// auto add wildcard in search box
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms,  second for example
var $input = $('.query');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
  var a = $(".query").val();
  if(a){
    if(a.contains("*")) {
      $("button[aria-label='Search Results']").click();
    } else {
      $(".query").val("*"+a);
      $("button[aria-label='Search Results']").click();
    }
  } else {
    $("button[aria-label='Search Results']").click();
  }
}
// $(".query").keyup(function() {
//   var a = $(".query").val();
//   if(a.contains("*")) {
//     $("button[aria-label='Search Results']").click();
//   } else {
//     $(".query").val("*"+a);
//   }
// });
// end of wildcard function