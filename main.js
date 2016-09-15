//In order to get the negative sign working correctly it will be easier to clear the output btwn each operator/= click, storing it and then 
//eval'ing the stored values together. Would need to store previous value and then evalk it with current value. Maybe do this by storing in var
//called 'prevVal' and then eval(prevVal+current)


$(document).ready(function() {

// numbers, CA.
	var numClicked = false;
	$(".numBut").click(function() {
		opClicked = false;
		var current = $('#output').text();
		if (numClicked === false){ 
		var numBut = $(this).text();
		$('#output').text(current+numBut); //need to not clear if decimal then number pushed
		}
		console.log(numClicked)
	});
	
	// +, -, /, * Need to store current value in prevVal on op click and then clear current.
	var opClicked = true;
	var opHasClick = false;
	$(".operBut").click(function() {
		var current = $('#output').text();
		canDec = true;
		opHasClick = true;
		if (opClicked == false) {
			
			var calcButtonOp = $(this).text();
			$('#output').text(current+calcButtonOp);
			opClicked = true;
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
		console.log(canDec)	
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
		opHasClick = false;
		opClicked = false;
	};

	//figures out if x is an operator
	function isItOp(x){ 

		var isOp = false;

		if (x=== '/') {
			isOp = true;
		} else if (x === '*') {
			isOp = true;
		} else if (x === '-') {
			isOp = true;
		} else if (x === '+') {
			isOp = true;
		}

		return isOp;
	};

	function opPresent(x){
		var isOpPresent = false;

		if (x.indexOf('-')) {
			isOpPresent = true;
		} else if (x.indexOf('+')) {
			isOpPresent = true;
		} else if (x.indexOf('*')) {
			isOpPresent = true;
		} else if (x.indexOf('/')) {
			isOpPresent = true;
		}
		console.log(isOpPresent);
		return isOpPresent;
	}

	function isNumOrDec(x){ // Treat . or # as num
		return (x === '.' || !isNaN(x))
	};

	//Sign operator
	$(".posNegBut").click(function() {
		var current = $('#output').text();
		var found = false;

		for (var i = current.length - 1; i >= 0 && !found; i--) {

			if (i === 0 && isNumOrDec(current[0])) { //3 if reached beg and current i is # done
				$('#output').text('-' + current);
				found = true;
				//add '-' to beg of string
			} else if (/*i === 0 &&*/ current[i] === '-') { //4 current is '-' and i === 0
				if (i === 0) {
					var done = current.slice(1, current.length);
					$('#output').text(done);
					found = true;
					//remove - from beg of string
			  } else if (isItOp(current[i-1]) /*&& isItOp(current[i])*/) { //2 curr op and prev op remove
					var before = current.slice(0, i)
					var after = current.slice(i+1, current.length)
					$('#output').text(before + after); 
					found = true;
					//slice to remove i
				} else if (current[i] === '-') {
					$('#output').text(current + '-'); 
					found = true;
				}	
			}  else if (isNumOrDec(current[i-1]) && !isNumOrDec(current[i])) { //5 curr op and prev # add
				var before = current.slice(0, i+1)
				var after = current.slice(i+1, current.length)
				$('#output').text(before + '-' + after); 
				found = true;
				//slice to add - after i
			}  else if (isItOp(current[i] && current[i] !== '-')) { //1 curr non '-' op add
				var done = current.slice(0, i);
				$('#output').text(done + '-'); 
				found = true;
				//slice to add after i
			}  

		}
	});	

	function isItNeg(n){
		if (n < 0) {
			return true;
		} else {
			return false;
		}
	};

	function isItNan(i) {
		opClicked = false;
        numClicked = false;
        canDec = false;
        eqClicked = true;
        var foobar = parseFloat(i)
        var current = i;

        if (isNaN(i)) {

        	if (isNaN(foobar)) {
        	current = "Error, try again"; 
        	opClicked = true; 
        	numClicked = true;
        	} else if (!isFinite(foobar)){
        	current = "Error, try again";
        	opClicked = true;
        	numClicked = true;
        	} else if (i === 'NaN' || 'Infinity'){
        	current = "Error, try again";
        	opClicked = true;
        	numClicked = true;
        	}
        }

        return current;
	};

	function addParen(x){
		var addP = x.indexOf('--');
		var current = x;

		if (addP >= 0) {
			
			var before = x.slice(0, addP+1)
			var paren = x.slice(addP+1, addP+3)
			var after = x.slice(addP+3, x.length)

		 	current = before + '(' + paren + ')' + after;
		}
		
		return current;
	}

	function solve() {
		var current = $('#output').text();
		var paren = addParen(current);

		var evalIt = eval(paren);
		if (isNaN(evalIt) || evalIt === Infinity || evalIt === -Infinity) {
			evalIt = "Error, try again";
			opClicked = true; 
        	numClicked = true;
		}

		console.log(eqClicked);
		eqClicked = true;
		canDec = true;
		opHasClick = false;
		opClicked = false;
		

		return $('#output').text(evalIt);
	};

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
		    } else if (event.keyCode === 61 || event.KeyCode === 13) { // 13 = enter, not working???? Stuuupid thing
		        solve();
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
			        
			    }
			};
	    console.log(opClicked);
	});

});
