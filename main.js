// numbers, CA
$(document).ready(function() {
	$(".numBut").click(function() {
		if (eqClicked == true) {
			clear();
			eqClicked = false;	
			//do not allow operators to be added to results, if op clicked clear output and do not put op in output	
		};
		var current = $('#output').text();
		var numBut = $(this).text();
		$('#output').text(current+numBut);
				
	});
	// +, -, /
	var opClicked = false;
	$(".operBut").click(function() {
		opClicked = true;
		if (opClicked == true) {
			//do not allow additional operators to be added
		}
		var current = $('#output').text();
		var calcButtonOp = $(this).text();
		$('#output').text(current+calcButtonOp);	
		console.log(opClicked)	
	});
	// CA clears
	$("#clear").click(function() {
		clear();					
	});

	function clear(){
		$('#output').text(null);
	}

	//Equals function evaluates
	var eqClicked = false;
	$("#equals").click(function() {
		eqClicked = true;
		var current = $('#output').text();
		$('#output').text(eval(current))
		console.log(eqClicked);
	});
});

