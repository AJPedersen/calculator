// numbers, CA, =
$(".calcButton").click(function() {
		var current = $('#output').text();
			var calcButton = $(this).text();
				$('#output').text(current+calcButton);	
	});
// +, -, /
$(".calcButtonOp").click(function() {
		var current = $('#output').text();
			var calcButtonOp = $(this).text();
				$('#output').text(current+calcButtonOp);	
	});
// CA clears
$("#clear").click(function() {
		var current = $('#output').text();
				$('#output').text(null);	
	});
//Equals function evaluates
$("#equals").click(function() {
		var current = $('#output').text();
			$('#output').text(eval(current));	
	});

//If no numbers added do not allow operands to be added, IF number added, 
// allow operands, IF operand added, do not allow another operand to be added
/*
function allowOp(){
	if (no numbers have been added to output box){
		do not allow operands to be added
	} else if (numbers have been added to output box) {
		allow operand to be added
	} else if (if one operand has been added){
		do not allow any more operands to be added
	} else {
		console.log(the error)
	}

};
*/

