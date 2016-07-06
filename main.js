// numbers, CA
var numClicked = false;
$(document).ready(function() {
	$(".numBut").click(function() {
		opClicked = false;
		if (numClicked === false){
		var current = $('#output').text();
		var numBut = $(this).text();
		$('#output').text(current+numBut);
		}
	});
	// +, -, /, *
	var opClicked = true;
	$(".operBut").click(function() {
		canDec = true;
		if (opClicked == false) {
			var current = $('#output').text();
			var calcButtonOp = $(this).text();
			$('#output').text(current+calcButtonOp);
		}	
		console.log(opClicked)	
	});

	var canDec = true;
	$(".perBut").click(function() {	
		if (canDec === true) {
			var current = $('#output').text();
			var perBut = $(this).text();
			$('#output').text(current+perBut);
			canDec = false;
		}	
		console.log(opClicked)	
	});

	// CA clears
	$("#clear").click(function() {
		clear();					
	});

	function clear(){
		$('#output').text(null);
		opClicked = true;
		canDec = true;
		numClicked = false;
	};

	function isItNan(i) {
        var foobar = parseFloat(i)
        if (isNaN(foobar)) {
        	foobar = "Error, try again";  
        	} else if (!isFinite(foobar)){
        	foobar = "Error, try again";
        	}
        $('#output').text(foobar);
        canDec = false;
        eqClicked = true;
        opClicked = true;
        numClicked = true;
	};

	function solve() {
		var current = $('#output').text();
		var evalIt = eval(current);
		isItNan(evalIt);
		console.log(eqClicked);
		canDec = false;
		eqClicked = true;
		opClicked = true;
		numClicked = true;
	}

	//Equals function evaluates
	var eqClicked = false;
	$("#equals").click(solve);
// do not allow spaces
	$("body").on("keydown", function(e) {
		return e.which !== 32;
	});

//get keycodes to know which key was pressed and pass it to output

	$("body").on( "keypress", function(event) {
		var current = $('#output').text();
		var keyPrest = String.fromCharCode(event.charCode);
			if (keyPrest >= 0 && keyPrest <= 9 && numClicked == false){
		        $('#output').text(current+keyPrest);
		        opClicked = false;
		    } else if (event.keyCode === 61) {
		        solve();
		        opClicked = false;
		    } else if (opClicked === false) {

			     if (event.keyCode === 45) {
			        $('#output').text(current+"-");
			        opClicked = true;
			        canDec = true;
			    } else if (event.keyCode === 96) {
			        clear();
			    } else if (event.keyCode === 43) {
			        $('#output').text(current+"+");
			        opClicked = true;
			        canDec = true;
			    } else if (event.keyCode === 47) {
			        $('#output').text(current+"/");
			        opClicked = true;
			        canDec = true;
			    } else if (event.keyCode === 42) {
			        $('#output').text(current+"*");
			        opClicked = true;
			        canDec = true;
			    } else if (event.keyCode === 46 && canDec) {
			        $('#output').text(current+".");
			        opClicked = true;
			        canDec = false;
			    }
			};
	    console.log(opClicked);
	});

});
