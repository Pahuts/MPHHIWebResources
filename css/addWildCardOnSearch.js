// auto add wildcard in search box
$(".query").keyup(function() {
  var a = $(".query").val();
  if(a.contains("*")) {
    $("button[aria-label='Search Results']").click();
  } else {
    $(".query").val("*"+a);
  }
});
// end of wildcard function