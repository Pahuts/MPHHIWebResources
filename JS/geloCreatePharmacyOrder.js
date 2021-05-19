function createOrderFromPrescription(primaryControl) {
    var formContext = primaryControl;

    // Define data for Pharmacy Order
    var orderData = {};
    orderData["mphhi_name"] = formContext.getAttribute("mphhi_eprescriptionname").getValue();
    orderData["mphhi_Patient@odata.bind"] = "/contacts(" + formContext.getAttribute("mphhi_patient").getValue()[0].id.slice(1,-1) + ")";
    orderData["mphhi_Appointment@odata.bind"] = "/msemr_appointmentemrs(" + formContext.getAttribute("mphhi_appointment").getValue()[0].id.slice(1,-1) + ")";
    orderData["mphhi_Prescription@odata.bind"] = "/mphhi_eprescriptions(" + formContext.data.entity.getId().slice(1,-1) + ")";

    // Run Web API query to get address fields from patient record
    var patientInfo = {};
    Xrm.WebApi.online.retrieveRecord("contact", formContext.getAttribute("mphhi_patient").getValue()[0].id.slice(1,-1),
    "?$select=address1_line1,address1_line2,_mphhi_address1barangay_value,_mphhi_address1city_value,_mphhi_address1stateprovince_value").then(
        function success(result) {
            patientInfo = result;
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
    
    // Add address info to orderData object
    orderData["mphhi_DeliveryStateProvince@odata.bind"] = "/mphhi_states(" + result._mphhi_address1stateprovince_value + ")";
    orderData["mphhi_DeliveryCity@odata.bind"] = "/mphhi_cities(" + result._mphhi_address1city_value + ")";
    orderData["mphhi_DeliveryBarangay@odata.bind"] = "/mphhi_barangays(" + result._mphhi_address1barangay_value + ")";
    // parameters["mphhi_DeliveryZIPCode@odata.bind"] = "/mphhi_barangays(" + result._mphhi_zipcode + ")";
    orderData["mphhi_deliverystreet1"] = result.address1_line1;
    orderData["mphhi_deliverystreet2"] = result.address1_line2;

    // Create Pharmacy Order
    Xrm.WebApi.createRecord("mphhi_pharmacyorder", orderData).then(
        function success(result) {
            var pharmacyOrderID = result.id;     // Store ID of created record

            // Retrieve and Medication records
            Xrm.WebApi.online.retrieveRecord("mphhi_eprescription", formContext.data.entity.getId(),
            "?$select=mphhi_eprescriptionid&$expand=mphhi_mphhi_eprescription_msemr_medication_Prescription($select=mphhi_brandname,mphhi_dosage,mphhi_genericname,mphhi_quantity,mphhi_unit)")
                .then(                 
                function success(results) {

                    // Map attributes and create Medication Order for each retrieved Medication record
                    for (const medication of results.mphhi_mphhi_eprescription_msemr_medication_Prescription) {
                        var currentMedicationData = {};
                        currentMedicationData["mphhi_PharmacyOrder@odata.bind"] = "/mphhi_pharmacyorders(" + pharmacyOrderID +")";

                        // Map name based on whether medicine is branded or not
                        if (medication.mphhi_brandname) {
                            currentMedicationData["mphhi_name"] = medication.mphhi_brandname;
                        }
                        else {
                            currentMedicationData["mphhi_name"] = medication.mphhi_genericname;
                        }

                        currentMedicationData["mphhi_dosage"] = medication.mphhi_dosage + medication.mphhi_unit;
                        currentMedicationData["mphhi_quantity"] = medication.mphhi_quantity;

                        Xrm.WebApi.createRecord("mphhi_medicationorder", currentMedicationData);
                    }
                },
                function(error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
            
            Xrm.Navigation.openForm({
                entityName: "mphhi_pharmacyorder",
                entityId: pharmacyOrderID,
                openInNewWindow: true
            });
        },
        function (error) {
            console.log(error.message);
        }
    );
}