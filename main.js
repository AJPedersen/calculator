//this function needs to take whatever id is passed to it
$(function addNum(){
	$(".calcButton").click(function() {
		document.getElementById('output').innerHTML+=$(this).html();	
	});
});

$(function addOp(){
	$(".calcButtonOp").click(function() {
		document.getElementById('output').innerHTML+=this.value;
	});
});

$(function clear(){
	$("#clear").click(function() {
		document.getElementById('output').innerHTML=null;
	});
});

function evaluate(){
	eval($("#output").innerHTML)
	//grab innerhtml of #output and eval it when user hits equals
};


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

