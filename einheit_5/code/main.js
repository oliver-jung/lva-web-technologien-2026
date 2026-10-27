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