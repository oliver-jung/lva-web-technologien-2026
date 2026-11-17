function buttonClick() {
	if (document.getElementsByTagName("body")[0].style.backgroundColor == "red") {
		alert("setting background color back to white");
		document.getElementsByTagName("body")[0].style.backgroundColor="white";
	}
	else {
		alert("setting background color to red");
		document.getElementsByTagName("body")[0].style.backgroundColor="red";
	}
}

function buttonClick2() {
	var randomNumber = getRandom(1,6);
	var txt = "Rolling the dice: "+randomNumber;
	document.getElementById("dice-txt").innerHTML = txt;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* API functionality */

async function getManufacturers() {
	const url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		console.log("Got manufacturers:");
		console.log(json);
		var html = "<select id='model-select' onchange='getModels()'>"
		html += "<option value='' disabled selected>Select brand</option>";
		if (json && json.Results && json.Results.length > 0) {
			json.Results.sort(function(a,b){
				var a_comp = a.MakeName;
				var b_comp = b.MakeName;
				return a_comp.localeCompare(b_comp);
			});
			for (var i=0; i<json.Results.length; i++) {
				html += "<option value='"+json.Results[i].MakeId+"'>"+json.Results[i].MakeName+"</option>";
			}
		}
		html += "</select>";
		html += "<div id='model-list'></div>";
		document.getElementById("manufacturer-list").innerHTML = html;
	} catch (error) {
		console.error(error.message);
	}
}

async function getModels() {
	var modelId = document.getElementById("model-select").value;
	const url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/"+modelId+"?format=json";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		console.log("Got models:");
		console.log(json);
		var html = "<select>"
		html += "<option value='' disabled selected>Select model</option>";
		if (json && json.Results && json.Results.length > 0) {
			json.Results.sort(function(a,b){
				var a_comp = a.Model_Name;
				var b_comp = b.Model_Name;
				return a_comp.localeCompare(b_comp);
			});
			for (var i=0; i<json.Results.length; i++) {
				html += "<option value='"+json.Results[i].Model_ID+"'>"+json.Results[i].Model_Name+"</option>";
			}
		}
		html += "</select>";
		document.getElementById("model-list").innerHTML = html;
	} catch (error) {
		console.error(error.message);
	}
}