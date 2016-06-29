// numbers, CA
$(document).ready(function() {
	$(".numBut").click(function() {
		opClicked = false;
		var current = $('#output').text();
		var numBut = $(this).text();
		$('#output').text(current+numBut);
				
	});
	// +, -, /, *
	var opClicked = true;
	$(".operBut").click(function() {
		if (opClicked == false) {
		var current = $('#output').text();
		var calcButtonOp = $(this).text();
		$('#output').text(current+calcButtonOp);
		opClicked = true;
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
	}

	//Equals function evaluates
	var eqClicked = false;
	$("#equals").click(function() {
		eqClicked = true;
		var current = $('#output').text();
		$('#output').text(eval(current));
		console.log(eqClicked);
	});
//get keycodes to know which key was pressed and pass it to output

	$("body").on( "keypress", function(event) {
		var current = $('#output').text();
		var keyPrest = String.fromCharCode(event.charCode);
			if (keyPrest >= 0 && keyPrest <= 9 ){
		        $('#output').text(current+keyPrest);
		        opClicked = false;
		    } else if (event.keyCode == 61) {
		        $('#output').text(eval(current));
		        opClicked = false;
		    } else if (opClicked == false) {
			     if (event.keyCode == 45) {
			        $('#output').text(current+"-");
			        opClicked = true;
			    } else if (event.keyCode == 43) {
			        $('#output').text(current+"+");
			        opClicked = true;
			    } else if (event.keyCode == 47) {
			        $('#output').text(current+"/");
			        opClicked = true;
			    } else if (event.keyCode == 42) {
			        $('#output').text(current+"*");
			        opClicked = true;
			    }  else {}
			};
	    console.log(opClicked);
	});

});
