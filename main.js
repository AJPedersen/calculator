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
	$(".operBut").click(function() {
		var current = $('#output').text();
		canDec = true;
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

	/*
	var current = $('#output').text();

			if ( current.indexOf("-") == 0 ){ 
			   //current = current.substring(1);
			   $('#output').text(current.substring(1));
	         } else { 
	         	//current = "-" + current;
	         	$('#output').text("-" + current);
	         };
	*/

	$(".posNegBut").click(function() {
	
		var current = $('#output').text();
		var found = false;
		for (var i = current.length - 1; i >= 0 && !found; i--) {
			var prevIDX = i-1
			var isPrevOp = isItOp(current[i - 1]) //feed current index -1 into isItOp to see if it is an operator
			if (isItOp(current[i])) {
				return;
			} else if (isPrevOp) { //one operator
				
				if (prevIDX-1 >=0 && isItOp(current[i-2])) { //two operators 1--1
					var before = current.slice(0, i-1)
					var after = current.slice(i-1, current.length)
					$('#output').text(before + after*-1);
					found = true;
				} else if (current[prevIDX] === '-') { // 1-1
					$('#output').text(current*-1);
					found = true;
				} else { // ? one operator?
					var before = current.slice(0, i)
					var after = current.slice(i, current.length)
					$('#output').text(before + after*-1);
					found = true;
				}
			} else if (prevIDX < 0) {
				$('#output').text(current*-1);
				found = true;
			}
		}
	});


			/*
			if (isPrevOp == false) { //no operator
				$('#output').text(current[(i*(-1))]); //if no op then put neg sign in front of current index
			} else if (	isPrevOp == true ){ //one operator
				$('#output').text(current[(i*(-1))]); //if one operator put neg sign in front of current index
			} else if(current[i - 1] && isPrevOp == true){ //double operator??
				//current = '-'+current.charAt(i) 
				//$('#output').text("-" + current);
				//erase first operator (has to be -) that for loop finds (one closest to the #) //use varname.replace?
				// could slice before i and after i and then go ibefore+'-'+iafter 
				var doubleOp = current(i-1)
				var before = current.slice(0, i)
				var after = current.slice(i, current.length)
				$('#output').text(before + '-' + after);
		} else {
			$('#output').text(current('*-1'));
			//remove neg sign (ie now its positive)
		}
	  } */
	

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
		var current = $('#output').text();
		var evalIt = eval(current);
		isItNan(evalIt);
		console.log(eqClicked);
		eqClicked = true;
		canDec = true;
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
