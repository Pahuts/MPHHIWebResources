$('a[role="menuitem"][href="/my-appointments/"]').hide(); //hide my appointments weblink

$(document).ready(function () {
  $('.box-logo').append('<img class="box-image" src="../success_icon.jpg" />');
  $(".box-cent").css("border-top", "solid 5px #5BBA47");
  $(".qr-code-state").append("Awesome!");
  $(".qr-content").append("We have received your appointment request.");
  $(".qr-code-state").css("color", "#5BBA47");
});