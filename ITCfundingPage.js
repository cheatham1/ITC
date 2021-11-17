(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    console.log("myConnector!");
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {

	console.log("getSchema!");
	var cols = [{
	    id:"ResoucePartnerId",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"ResoucePartnerNameEn",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"ResoucePartnerNameFr",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"ResoucePartnerNameSp",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"FundingTypeEn",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"FundingTypeFr",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"FundingTypeSp",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"FunderTypeEn",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"FunderTypeFr",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"FunderTypeSp",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"ProjectID",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"ProjectTitle",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"CountryCode",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"CountryNameEn",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"CountryNameFr",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"CountryNameSp",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"RegionCode",
	    dataType: tableau.dataTypeEnum.string
	}, {	    
	    id:"RegionNameEn",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"RegionNameFr",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"RegionNameSp",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"Year",
	    dataType: tableau.dataTypeEnum.int
	}, {
	    id:"BudgetType",
	    dataType: tableau.dataTypeEnum.string
	}, {
	    id:"Percentage",
	    dataType: tableau.dataTypeEnum.float
	}, {
	    id:"Funding",
	    dataType: tableau.dataTypeEnum.float
	}];
	
        var tableSchema = {
            id: "CountryNameEn",
            alias: "Country",
            columns: cols
        };
	
        schemaCallback([tableSchema]);

    };
    
    // Download the data
    myConnector.getData = function(table, doneCallback) {

	console.log("getData!");

	var JWTtoken = <ENTER BEARER TOKEN HERE>
	    
	var settings = {
            async: true,

	    url: "https://api-dev.intracen.org/b2b/v1/rest/funding",
	    contentType: "application/json",
	    dataType:"json",
            method: "GET",
            headers: {
		"Authorization": "Bearer "+JWTtoken,
		"accept": "application/json",

            },
	    xhrFields: {withCredentials: true},
	}

	$.ajax(settings).done(function (response) {
	    console.log(response);
		
	    var tableData = [];
	    
	    // Iterate over the JSON object
	    for (var i = 0, len = response.length; i < len; i++) {
		
		console.log(response[i].CountryCode);
		    
		tableData.push({
		    "ResoucePartnerId": response[i].ResoucePartnerId,
		    "ResoucePartnerNameEn": response[i].ResoucePartnerNameEn,
		    "ResoucePartnerNameFr": response[i].ResoucePartnerNameFr,
		    "ResoucePartnerNameSp": response[i].ResoucePartnerNameSp,
		    "FundingTypeEn": response[i].FundingTypeEn,
		    "FundingTypeFr": response[i].FundingTypeFr,
		    "FundingTypeSp": response[i].FundingTypeSp,
		    "FunderTypeEn": response[i].FunderTypeEn,
		    "FunderTypeFr": response[i].FunderTypeFr,
		    "FunderTypeSp": response[i].FunderTypeSp,
		    "ProjectID": response[i].ProjectID,
		    "ProjectTitle": response[i].ProjectTitle,
		    "CountryCode": response[i].CountryCode,
		    "CountryNameEn": response[i].CountryNameEn,
		    "CountryNameFr": response[i].CountryNameFr,
		    "CountryNameSp": response[i].CountryNameSp,
		    "RegionCode": response[i].RegionCode,
		    "RegionNameEn": response[i].RegionNameEn,
		    "RegionNameFr": response[i].RegionNameFr,
		    "RegionNameSp": response[i].RegionNameSp,
		    "Year": response[i].Year,
		    "BudgetType": response[i].BudgetType,
		    "Percentage": response[i].Percentage,
		    "Funding": response[i].Funding, 
		    
		});
	    }
	    
	    table.appendRows(tableData);
	    
	    console.log("appendedRows");
	    doneCallback();

	});
	
    };
    
    tableau.registerConnector(myConnector);
    console.log("registerConnector!");
    
    // Create event listeners for when the user submits the form
    $(document).ready(function() {
	$("#submitButton").click(function() {

	    tableau.connectionName = "ITC funding"; // This will be the data source name in Tableau
	    tableau.submit(); // This sends the connector object to Tableau
	    
	});
    });
})();
