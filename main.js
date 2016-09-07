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

	//Sign operator
	$(".posNegBut").click(function() {
		var current = $('#output').text();
		var found = false;

		if (i === 0 && !isNan(current[0])) {
			$('#output').text(current + '-');//add '-' to front
			found = true;
		} else if (current[i] === '-') {
			if (i === 0) {]
				var done = current.slice(1, current.length);
				$('#output').text(done);
				found = true;//remove - from front of string
			} else if (!isNan(current[i-1])) {
				//slice to add - after i
			} else if (isOp(current[i-1])) {
				//slice to remove i
			}
		} else if (isItOp(current[i] && current[i] !== '-')) {
			//slice to add after i
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
        var foobar = parseFloat(i)
        if (isNaN(foobar)) {
        	foobar = "Error, try again"; 
        	opClicked = true; 
        	numClicked = true;
        	} else if (!isFinite(foobar)){
        	foobar = "Error, try again";
        	opClicked = true;
        	numClicked = true;
        	}
        $('#output').text(foobar);
        canDec = false;
        eqClicked = true;
	};

	function solve() {

		//for (var i = current.length - 1; i >= 0 && !found; i--) {
			//Needs to go through and slice in () around -- so 1--2+0--9 would become 1-(-2)+0-(-9)
			//bunch of if statements here
		//
	
		var current = $('#output').text();
		var evalIt = eval(current);
		isItNan(evalIt);
		console.log(eqClicked);
		eqClicked = true;
		canDec = true;
		opHasClick = false;
		opClicked = false;
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
