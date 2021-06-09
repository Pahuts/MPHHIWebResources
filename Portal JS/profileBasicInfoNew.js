$(document).ready(function() {
  // adjust colspan of fields
  $("#mphhi_dateofbirth_description").parent().parent().attr("colspan","2"); // birthdate
  $("#mphhi_dateofbirth_description").parent().css("width","100%");

  $("#mphhi_religion_name").parent().parent().attr("colspan","2"); // religion
  $("#mphhi_religion_name").parent().css("width","100%");

  $("#mphhi_citizenship_name").parent().parent().attr("colspan","2"); // citizenship
  $("#mphhi_citizenship_name").parent().css("width","100%");

  $("#mphhi_region_name").parent().parent().attr("colspan","2"); // citizenship
  $("#mphhi_region_name").parent().css("width","100%");
  // get Age 
  // get birth date
  var bDate = $("#mphhi_dateofbirth_datepicker_description").val();
  var bSplit = bDate.split("/"); // split values
  var birthMonth = parseInt(bSplit[0]);
  var birthDay = parseInt(bSplit[1]);
  var birthYear = parseInt(bSplit[2]);

  // get date today
  var dateToday = new Date();

  // get month
  var month = dateToday.getMonth();
  // get day
  var day = dateToday.getDate();
  // get year
  var year = dateToday.getFullYear();

  // parse date to int
  var monthInt = parseInt(month);
  var dayInt = parseInt(day);
  var yearInt = parseInt(year);
  if(birthYear <= yearInt) {
    $("#mphhi_ageportal").parent().parent().parent().show();
    if(monthInt < birthMonth && dayInt < birthDay) {
      var getAge = yearInt - birthYear - 1;
      $("#mphhi_ageportal").val(getAge);
    } else if (monthInt == birthMonth && dayInt < birthDay){
      var getAge = yearInt - birthYear - 1;
      $("#mphhi_ageportal").val(getAge);
    } else if (monthInt == birthMonth && birthDay >= dayInt){
      var getAge = yearInt - birthYear;
      $("#mphhi_ageportal").val(getAge);
    }else {
      var getAge = yearInt - birthYear;
      $("#mphhi_ageportal").val(getAge);
    }
  } else {
    $("#mphhi_ageportal").parent().parent().parent().hide();
    alert("Invalid birth date.");
  }


  // disable age field
  if(isNaN($("#mphhi_ageportal").val())) {
    $("#mphhi_ageportal").parent().parent().parent().hide();
  } else {
    $("#mphhi_ageportal").parent().parent().parent().show();
  }
  $("#mphhi_ageportal").prop("disabled",true); // disable age field

  // hide address fields function
  $("#mphhi_address1countryregion").change(clearHideAddressField);

  $("a.add-folder.btn.btn-info.action").hide(); // Hide SharePoint "New Folder" button

  $('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder

  function clearHideAddressField() {

    if($("#mphhi_address1countryregion_name").val() == "Philippines") {
      // show fields
      $("#mphhi_region_name").parent().parent().parent().show();
      $("#mphhi_address1stateprovince_name").parent().parent().parent().show();
      $("#mphhi_address1city_name").parent().parent().parent().show();
      $("#mphhi_address1barangay_name").parent().parent().parent().show();
      $("#address1_postalcode").parent().parent().parent().show();

    } else {
      // hide fields
      $("#mphhi_region_name").parent().parent().parent().hide();
      $("#mphhi_address1stateprovince_name").parent().parent().parent().hide();
      $("#mphhi_address1city_name").parent().parent().parent().hide();
      $("#mphhi_address1barangay_name").parent().parent().parent().hide();
      $("#address1_postalcode").parent().parent().parent().hide();
      // clear fields
      $("#mphhi_region").val("");
      $("#mphhi_region_name").val("");
      $("#mphhi_region_entityname").val("");

      $("#mphhi_address1stateprovince").val("");
      $("#mphhi_address1stateprovince_name").val("");
      $("#mphhi_address1stateprovince_entityname").val("");

      $("#mphhi_address1city").val("");
      $("#mphhi_address1city_name").val("");
      $("#mphhi_address1city_entityname").val("");

      $("#mphhi_address1barangay").val("");
      $("#mphhi_address1barangay_name").val("");
      $("#mphhi_address1barangay_entityname").val("");

      $("#address1_postalcode").val("");
    }
  }

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

  //  Autopopulate region field
  // GET ODATA RESULT BEFORE EXECUTING
  $("#mphhi_address1stateprovince").change( 
      function() {
          var selectedState = {};
          selectedState = region.find(
              function(regionObject) {
                // return (dateObject.mphhi_date.match("^" + preferredDate) && dateObject.mphhi_doctor.Id == $("#mphhi_preferreddoctor").val());
                return ($("#mphhi_address1stateprovince").val() == regionObject.mphhi_stateid);
              }
          );
          if (selectedState) {
            // autopopulate Region field
            console.log(selectedState.mphhi_region);
            console.log(selectedState.mphhi_region["Id"]); // get id of region
            console.log(selectedState.mphhi_region["Name"]); // get name of region
            $("#mphhi_region").val(selectedState.mphhi_region["Id"]); // id of region
            $("#mphhi_region_name").val(selectedState.mphhi_region["Name"]); // name of region
            $("#mphhi_region_entityname").val("mphhi_region"); // entityname of region
          }
          else {
            // $("#mphhi_timeslotdate").val("").change();
            // clear region lookup
            $("#mphhi_region").val(""); // id of region
            $("#mphhi_region_name").val(""); // name of region
            $("#mphhi_region_entityname").val(""); // entityname of region
            // clear city lookup
            $("#mphhi_address1city").val(""); // id of region
            $("#mphhi_address1city_name").val(""); // name of region
            $("#mphhi_address1city_entityname").val(""); // entityname of region
            // clear barangay
            $("#mphhi_address1barangay").val(""); // id of region
            $("#mphhi_address1barangay_name").val(""); // name of region
            $("#mphhi_address1barangay_entityname").val(""); // entityname of region
          }
      }
  );
  // End of Autopopulate Function
  // disable region lookup
  $("#mphhi_region_name").parent().find('.input-group-btn').hide(); 
  // =======================================================================================================================================================================
  
  clearHideAddressField();
  
});

