$(document).ready(function () {
  // INITIALIZE FORM
  $("td.lookup div.input-group").width("100%");   // Expand all lookup fields
  
  $("#mphhi_appointment").change(
      function() {
          if ($("#mphhi_appointment").val()) {
              $("#mphhi_prescription").closest("td").show();
          }
          else {
              $("#mphhi_prescription").closest("td").hide();
          }
      }
  ).change();

  $("#mphhi_ordertype").change(
      function() {
          if ($("#mphhi_appointment").val() == "205220000") {
              $("[data-name='delivery_address']").closest("fieldset").show();
          }
          else {
              $("[data-name='delivery_address']").closest("fieldset").hide();
          }
      }
  ).change();

  //Orderfor validation
  // $("#mphhi_createorderfor").change(
  //     function() {
  //         //Myself = 205220000
  //         //Dependent = 205220001
  //         //Other = 205220002
  //         //if create order is equal to Myself = 205220000
  //         if ($("#mphhi_createorderfor").val() == "205220000") 
  //         {
  //             //autopopulate name fields
  //             $('#mphhi_firstname').val();
  //             //addresses
  //             // dependent address quickview
  //             $("[data-name='deliveryAddress_quickview_section']").closest("fieldset").show(); //patient address quickview
  //             $("[data-name='delivery_address']").closest("fieldset").hide(); //address fields
  //         }
  //         //if create order is equal to Dependent = 205220001
  //         else if ($("#mphhi_createorderfor").val() == "205220001") 
  //         {
  //             //addresses
  //             // dependent address quickview
  //             $("[data-name='deliveryAddress_quickview_section']").closest("fieldset").hide(); //patient address quickview
  //             $("[data-name='delivery_address']").closest("fieldset").hide(); //address fields
  //         }
  //         //if create order is equal to Other = 205220002
  //         else if ($("#mphhi_createorderfor").val() == "205220002") 
  //         {
  //             //addresses
  //             // dependent address quickview
  //             $("[data-name='deliveryAddress_quickview_section']").closest("fieldset").hide(); //patient address quickview
  //             $("[data-name='delivery_address']").closest("fieldset").hide(); //address fields
  //         }
  //         else 
  //         {
  //             //addresses
  //             // dependent address quickview
  //             $("[data-name='deliveryAddress_quickview_section']").closest("fieldset").hide(); //address quickview
  //             $("[data-name='delivery_address']").closest("fieldset").hide(); //address fields
  //         }
  //     }
  // ).change();
  //Address Validation

});