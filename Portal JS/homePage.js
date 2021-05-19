$('a[role="menuitem"][href="/access-denied/"]').hide();
// add active class to nav link
$('a[role="menuitem"][aria-label="Home"]').addClass("active-nav");
$(document).ready(function () {
  if($('h4.login-heading-section').length){
    $('a[role="menuitem"][aria-label="Home"]').removeClass("active-nav");
    $('a[role="menuitem"][aria-label="Sign In"]').addClass("active-nav");
  }
});




