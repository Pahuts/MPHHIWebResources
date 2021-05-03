$( document ).ready(function() {
    var variables = [];
    var currentURL = "/_odata/Variables";
    while(currentURL) {
        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            url: currentURL,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            success: function(data, textStatus, XHR) {
                variables = variables.concat(data.value);
                currentURL = data["odata.nextLink"];
            }
        });
    }

            var getVariables = variables.find(     // Returns an object
                function(variables) {
                    // Search in "programs" array for element matching GUID on program lookup
                    return variables.mphhi_variableid == "7cfff73c-8787-eb11-a812-000d3a8fed3b";
                }
            );
            var a = getVariables.mphhi_subscriptionkey;
            var b = getVariables.mphhi_endpoint;

            alert(a + " " + b);
            var endpoint = b;
            var subscriptionkey = a;

    $("input[title='Proceed to Payment']").click(function(){
        // paymaya(body);
    });

});