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
  $("#mphhi_address1stateprovince_name").change( 
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
            $("#mphhi_region").val(""); // id of region
            $("#mphhi_region_name").val(""); // name of region
            $("#mphhi_region_entityname").val(""); // entityname of region
          }
      }
  );
  // End of Autopopulate Function
  // =======================================================================================================================================================================