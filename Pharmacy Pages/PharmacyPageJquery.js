$('a[role="menuitem"][href="/access-denied/"]').hide();
// add active class to nav link
$('a[role="menuitem"][aria-label="Pharmacy"]').addClass("active-nav");
// add divs to radio buttons (Order Receipient)
$( "#mphhi_createorderfor_0" ).wrap( "<div class='myself'></div>" );
$( "#mphhi_createorderfor_1" ).wrap( "<div class='dependent'></div>" );
$( "#mphhi_createorderfor_2" ).wrap( "<div class='other'></div>" );


// add divs to radio buttons (Order Type)
$( "#mphhi_ordertype_0" ).wrap( "<div class='delivery'></div>" );
$( "#mphhi_ordertype_1" ).wrap( "<div class='pickup'></div>" );

// add divs to radio buttons (Payment Method)
$( "#mphhi_paymentmethod_0" ).wrap( "<div class='creditdebit'></div>" );
$( "#mphhi_paymentmethod_1" ).wrap( "<div class='paymaya'></div>" );
$( "#mphhi_paymentmethod_2" ).wrap( "<div class='otc'></div>" );

// add divs to radio buttons (Payment Option)
$( "#mphhi_paymentoption_0" ).wrap( "<div class='online'></div>" );
$( "#mphhi_paymentoption_1" ).wrap( "<div class='overthecounter'></div>" );


// add description per radio button (Order Receipient)
$("label[for='mphhi_createorderfor_0']").append("<br><div class='radio-description'>I am ordering this for myself.</div>");
$("label[for='mphhi_createorderfor_1']").append("<br><div class='radio-description'>I am ordering this for my dependent.</div>");
$("label[for='mphhi_createorderfor_2']").append("<br><div class='radio-description'>I am ordering this on behalf of other people.</div>");

// add description per radio button (Order Type)
$("label[for='mphhi_ordertype_0']").append("<br><div class='radio-description'>Your order will be delivered to your selected delivery address.</div>");
$("label[for='mphhi_ordertype_1']").append("<br><div class='radio-description'>Your order will be ready for pick-up at your selected Pharmacy Store.</div>");

// add description per radio button (Payment Method)
$("label[for='mphhi_paymentmethod_0']").append("<br><div class='radio-description'>Payment will go through Dragonpay</div>");
$("label[for='mphhi_paymentmethod_1']").append("<br><div class='radio-description'>Payment will go through Paymaya.</div>");
$("label[for='mphhi_paymentmethod_2']").append("<br><div class='radio-description'>Payment will go through your preferred Centers.</div>");

// add description per radio button (Payment Option)

// add class to Order Type field set
$("fieldset[aria-label='Order Type']").addClass("order-type-fieldset");

// radio button = true when div is clicked
$(".myself").on("click", function () {
    $("#mphhi_createorderfor_0").prop("checked", true);
    $(".myself").addClass("blue-cell");
    $(".dependent").removeClass("blue-cell");
    $(".other").removeClass("blue-cell");
});
$(".dependent").on("click", function () {
    $("#mphhi_createorderfor_1").prop("checked", true);
    $(".dependent").addClass("blue-cell");
    $(".myself").removeClass("blue-cell");
    $(".other").removeClass("blue-cell");
});
$(".other").on("click", function () {
    $("#mphhi_createorderfor_2").prop("checked", true);
    $(".other").addClass("blue-cell");
    $(".myself").removeClass("blue-cell");
    $(".dependent").removeClass("blue-cell");
});



// Order type field set jquery
$(".section-title").prepend("<hr>");

// Order Type 
$(".delivery").on("click", function () {
    $("#mphhi_ordertype_0").prop("checked", true);
    $(".delivery").addClass("blue-cell");
    $(".pickup").removeClass("blue-cell");
});

$(".pickup").on("click", function () {
    $("#mphhi_ordertype_1").prop("checked", true);
    $(".pickup").addClass("blue-cell");
    $(".delivery").removeClass("blue-cell");
});
//  Payment Method
$(".creditdebit").on("click", function () {
    $("#mphhi_paymentmethod_0").prop("checked", true);
    $(".creditdebit").addClass("blue-cell");
    $(".paymaya").removeClass("blue-cell");
    $(".otc").removeClass("blue-cell");
});
$(".paymaya").on("click", function () {
    $("#mphhi_paymentmethod_1").prop("checked", true);
    $(".paymaya").addClass("blue-cell");
    $(".creditdebit").removeClass("blue-cell");
    $(".otc").removeClass("blue-cell");
});
$(".otc").on("click", function () {
    $("#mphhi_paymentmethod_2").prop("checked", true);
    $(".otc").addClass("blue-cell");
    $(".creditdebit").removeClass("blue-cell");
    $(".paymaya").removeClass("blue-cell");
});

// Payment Option
$(".online").on("click", function () {
    $("#mphhi_paymentoption_0").prop("checked", true);
    $(".online").addClass("blue-cell");
    $(".overthecounter").removeClass("blue-cell");
});

$(".overthecounter").on("click", function () {
    $("#mphhi_paymentoption_1").prop("checked", true);
    $(".overthecounter").addClass("blue-cell");
    $(".online").removeClass("blue-cell");
});
// step 1 description
$('fieldset[aria-label="Order Recipient"]').find('legend[class="section-title"]').append('<div class="description below" style="color: #666;">Please select whom you create this order for</div>');
$('fieldset[aria-label="Order Type"]').find('legend[class="section-title"]').append('<div class="description below" style="color: #666;">Please select how you want to get your order</div>');


// add description to step 2 Previous Appointment Section
$("fieldset[aria-label='Previous Appointment'] .section-title").append("<br><p class='attach-files-subgrid'>Please select your previous appointment in referrence for this Pharmacy Order.<br>Medications prescribe to you in the selected previous appointment will also be shared to the Pharmacy Store.</p>");

// add class to step 3 subgrids
$("fieldset[aria-label='Attach the Files you want to share with the Pharmacy Store'] .section-title").append("<br><p class='attach-files-subgrid'>Please attach if you have any Discount IDs and a copy of your Prescription.<br>The file you want to attach should not exceed 2 mb. Only .docx, .xlsx, .pdf, .jpg, and .png file types are allowed.</p>");

$("fieldset[aria-label='Medication List'] .section-title").append("<br><p class='medication-subgrid'>List all the medicines that you want to order. Prices and availabilities will be available once your order has been processed.</p>");

//  autopopulate region
  //===========================================================================================================================================================================
    // OData query for region - Autopopulate Region
    var region = [];
    var statesServicesURL = "~/_odata/States";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: statesServicesURL,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        async: false,
        success: function(data, textStatus, xhr) {
          region = region.concat(data.value);
          statesServicesURL = data["odata.nextLink"];
        }
    });
  // adjust region border radius
  $('#mphhi_region_name').css('border-radius', '5px');
  // adjust region colspan
   $("#mphhi_region").parent().parent().attr("colspan","1");
   $("#mphhi_region").parent().css("width","100%");    
  // disable region field
   $("#mphhi_region_name").parent().find('.input-group-btn').hide(); 
   
  // disable contact info
  $("#mphhi_firstname").prop("disabled", true);
  $("#mphhi_lastname").prop("disabled", true);
  $("#mphhi_phonenumber").prop("disabled", true);
  
  $(document).ready(function () {
    // Limit file types for sharepoint upload
    $("input[name='file']").attr("id","filer");// add id to the file button
    function fileValidation() {
    var fileInput = document.getElementById('filer');
    var filePath = fileInput.value;
    // Allowing file type   // /(\.doc|\.docx|\.xlsx|\.pdf|\.jpg|\.png|\.rtf|\.wps|\.wks|\       .wpd)$/i;
    var allowedExtensions = /(\.doc|\.docx|\.xlsx|\.pdf|\.jpg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
      }
    }
  
  $("#filer").change(fileValidation);
  // end of file type limitation script
  
  $('#filer').bind('change', function() {
    //this.files[0].size gets the size of your file.
    //alert(this.files[0].size); // returns the file size in bytes
    let fileSizeInBytes = this.files[0].size;
    let fileSizeInMB = fileSizeInBytes / 1048576; // generates the file size into MB
    let fileInput = document.getElementById('filer');
    //alert(fileSizeInMB);
    if(fileSizeInMB > 2) { // check if file size is greater than 5 mb
        alert('File exceeds 2 mb.');
        fileInput.value = '';
        return false;
    }
  });
  
});