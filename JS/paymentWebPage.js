$('a[role="menuitem"][href="/access-denied/"]').hide(); //hide my appointments weblink
$(document).ready(function() {
    // hide lookup buttons
    $("#mphhi_patient_name").parent().find('.input-group-btn').hide();  
    $("#mphhi_patient_name").css({"cursor": "not-allowed", "pointer-events": "none"});
    $("#mphhi_appointment_name").parent().find('.input-group-btn').hide();  
    $("#mphhi_appointment_name").css({"cursor": "not-allowed", "pointer-events": "none"});
    // disable fields
    $("#mphhi_visitid").prop('disabled', true);
    // adjust column width
    $("#mphhi_appointment").parent().parent().attr("colspan","2");
    $("#mphhi_appointment").parent().css("width","100%");
    $("#mphhi_patient").parent().parent().attr("colspan","2");
    $("#mphhi_patient").parent().css("width","100%");
     //hide dev fields
    $("#mphhi_patientfirstname").parent().parent().hide(); 
    $("#mphhi_patientmiddlename").parent().parent().hide();
    $("#mphhi_patientlastname").parent().parent().hide();
    $("#mphhi_patientemail").parent().parent().hide();
    $("#mphhi_patientmobilephone").parent().parent().hide();
    $("#mphhi_amountdev").parent().parent().hide();
    
    //disable fields to make them as 'read only'
    //payment channel lookup
    $("#mphhi_paymentchannel").prop('disabled', true);
    $("#mphhi_paymentchannel_name").parent().find('.input-group-btn').hide();
    $("#mphhi_paymentchannel_name").parent().css({"width":"100%"});
    $("#mphhi_paymentchannel_name").css({"cursor": "not-allowed", "pointer-events": "none"});
        //date and time
    $("#mphhi_paymentdateandtime_datepicker_description").parent().find('.form-control').prop('disabled', true);
    $("#mphhi_paymentdateandtime").parent().find('.input-group-addon').hide();
    $("#mphhi_paymentdateandtime_datepicker_description").parent().css({"width":"100%"});
        //amount
    $("#mphhi_amount").prop('disabled', true);
        //transaction id
    $("#mphhi_paymentid").prop('disabled', true);
        //payment reference
    $("#mphhi_paymentreference").prop('disabled', true);
        //description of payment
    $("#mphhi_descriptionofpayment").prop('disabled', true);
        //appointment status
    $("#msemr_appointmentstatus").css({"border-color": "#5BBA47!important", "border": "1px solid #ccc", "padding": "6px 12px", "color": "#555",
    "-webkit-box-shadow": "inset 0 1px 1px rgb(0 0 0 / 8%)",
    "box-shadow": "inset 0 1px 1px rgb(0 0 0 / 8%)",
    "-webkit-transition": "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
    "-o-transition": "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
    "transition": "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
    "background-color": "#eee"});
        //payment status
        $("#statuscode").removeClass("status");
        $("#statuscode").addClass("input-group");
        $("#statuscode").css({"width":"100%","border-color": "#5BBA47!important", "border": "1px solid #ccc", "padding": "6px 12px", "color": "#555",
    "-webkit-box-shadow": "inset 0 1px 1px rgb(0 0 0 / 8%)",
    "box-shadow": "inset 0 1px 1px rgb(0 0 0 / 8%)",
    "-webkit-transition": "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
    "-o-transition": "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
    "transition": "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
    "background-color": "#eee"});
    //add custom button for payment
    //$('#UpdateButton').after('<input type="button" value="Proceed to Payment" id="apiButton" title="Proceed to Payment" class="btn btn-primary button submit-btn pull-right" style="margin-top: 20px; margin-bottom: 50px;">');

    // hide OOB Button
    $("#UpdateButton").hide();

    //move API Button after form
    $("#apiButton").appendTo(".actions");

    //$("input[type='button'][value='Submit']").hide();
    // start of query code
    // Get the query string from the URL
    // var queryString = window.location.search;
    // queryString = queryString.substring(1);

    // Parse the query string and assign parameters to "params" object
    // var queries = queryString.split("&");
    // var params = {};
    // var query;
    // for (var i = 0; i < queries.length; ++i) {
    //     query = queries[i].split("=");
    //     params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
    // }

    // autopopulate appointment emr lookup field using queried values
    // document.getElementById("mphhi_appointment").value = params["id"];
    // document.getElementById("mphhi_appointment_name").value = params["apt"];
    // document.getElementById("mphhi_appointment_entityname").value = "msemr_appointmentemr";
    // autopopulate patient lookup field using queried values
    // document.getElementById("mphhi_patient").value = params["ptid"];
    // document.getElementById("mphhi_patient_name").value = params["ptn"];
    // document.getElementById("mphhi_patient_entityname").value = "contact";
    // autopopulate visit id
    document.getElementById("mphhi_visitid").value = params["v_id"];

    //$("input[title='Proceed to Payment']").click(function(){
    
    // Insert privacy notice
    // $('<p> <a href="https://mphhi-dev-us.powerappsportals.com/" target="_blank" color="blue">Online Payment Terms and Conditions</a>​.</p>').appendTo('#mphhi_Agreementonpaymenttermsandconditions');

     //hide updatebutton
     //$("#UpdateButton").hide();  

     // agreement script
    function checkAgreement(){
        var agreement1 = $("#mphhi_Agreementonpaymenttermsandconditions").prop("checked");
        
        if (agreement1 == true) {
            $('#apiButton').prop('disabled',false);
        } else {
            $('#apiButton').prop('disabled',true);
        }
    }
    
    checkAgreement();

    $("#mphhi_Agreementonpaymenttermsandconditions").change(checkAgreement);
}); 

