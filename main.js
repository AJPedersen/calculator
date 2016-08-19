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

	//Sign operator
	$(".posNegBut").click(function() {
	
		var current = $('#output').text();
		var found = false;
		var twoOp = false;
		var hasFoundNum = false;
		var numFound = false;
		var itsOp = false;
		for (var i = current.length - 1; i >= 0 && !found; i--) {
			var prevIDX = i-1;
			var prevPrevIDX = i-2;
			var isPrevOp = isItOp(current[i - 1]); //feed current index -1 into isItOp to see if it is an operator
			var isPrevPrevOp = isItOp(current[i - 2]);
			var isPrevNum = current.charAt(current[i - 1]) >= 0;
			var neg1Char = current.charAt(current[i - 1]);
			var isFirstNum = current.charAt(0) >= 0;
			var hasFoundNum = false;

		// ------------------- \/\/ number found, operator found logic
			if (current[i] >= 0 && !hasFoundNum) { //current i is a number
				numFound = true; // number found
				
			} else if (isItOp && !hasFoundNum) { //current i is operator
				itsOp = true;
				
			} else if (current[i] >= 0 && hasFoundNum) { // current i is a number and number has been found
				hasFoundNum = true;
				
			};
		// ------------------- \/\/ posNegBut logic
			 if (numFound && !opHasClick) { //only #'s
				$('#output').text(current*-1);
				found = true;
			}	else if (numFound && isPrevOp) {
				var before = current.slice(0, i)
				var after = current.slice(i)
				$('#output').text(before + after*-1);
				found = true;
					if (numFound && isPrevPrevOp) {
						var before = current.slice(0, i-1)
						var after = current.slice(i-1, current.length)
						$('#output').text(before + after*-1);
						found = true;
					} 
			}	else if (numFound && opHasClick) {
				var before = current.slice(0, i)
				var after = current.slice(i)
				$('#output').text(before + after*-1);
				found = true;
					if (numFound && isPrevPrevOp) {
						var before = current.slice(0, i-1)
						var after = current.slice(i-1, current.length)
						$('#output').text(before + after*-1);
						found = true;
					}
			}	else if (isItOp && hasFoundNum) { // current i is an operator and number has been found
					$('#output').text(current + '-');
					found = true;
					if (current.endsWith('-') && isPrevNum) {
						var sliceItBaby = current.slice(0, i)
						$('#output').text(sliceItBaby);
						found = true;
					}
			} else if (isItOp(current[i]) && !itsOp) { // ? one operator?
				var before = current.slice(i, current.length)
				var after = current.slice(0, i)
				$('#output').text(after*-1 + before);
				found = true;
				if (prevIDX-1 > 0) {
					var before = current.slice(i, current.length)
					var after = current.slice(i+1, current.length)
					$('#output').text(before + after*-1);
					found = true;
				}
			}   else if (current.endsWith('-') && opClicked) {
				$('#output').text(current + '-');
				found = true;
				if (current.endsWith('-') && isPrevOp) {
					var sliceItBaby = current.slice(0, i)
					$('#output').text(sliceItBaby);
					found = true;
				}
			}	else if (current.endsWith('-') && isPrevOp) {
				var sliceItBaby = current.slice(0, i)
				$('#output').text(sliceItBaby);
				found = true;
			}	else if (itsOp && isPrevNum) {
				$('#output').text(current + '-');
				found = true;
				if (current.endsWith('-') && isPrevNum) {
					var sliceItBaby = current.slice(0, i)
					$('#output').text(sliceItBaby);
					found = true;
				}
			}	else if (prevPrevIDX >0 && isItOp(current[i-2]) && !itsOp) { //two operators 1--1
				$('#output').text(current + '-');
				found = true;
				if (current.endsWith('-') && isPrevNum) {
					var sliceItBaby = current.slice(0, i)
					$('#output').text(sliceItBaby);
					found = true; 
			}	else if (isItOp) {
				$('#output').text(current + '-');
				found = true;
				if (current.endsWith('-') && isPrevOp) {
					var sliceItBaby = current.slice(0, i)
					$('#output').text(sliceItBaby);
					found = true;
				}
			}
				/*var before = current.slice(0, i-1)
				var after = current.slice(i-1, current.length)
				$('#output').text(before + after*-1);
				found = true;
				twoOp = true;
				if (prevIDX-1 >=0 && isItOp(current[i-2]) && isItOp(current[i-3])) {
					var before = current.slice(0, i-2)
					var after = current.slice(i-2, current.length)
					$('#output').text(before + after*-1);
					found = true;
					return;
				} */
			}	  
		}
	});
			/*else if (current[prevIDX] === '-' ) { // 1-1
				var before = current.slice(0, i)
				var after = current.slice(i, current.length)
				$('#output').text(before + after*-1);
				found = true;
				if (prevIDX-1 < 0) {
					var before = current.slice(0, i-1)
					var after = current.slice(i-1, current.length)
					$('#output').text(before + after*-1);
					found = true;
				}

				else if (isPrevOp){
				var before = current.slice(0, i)
				var after = current.slice(i, current.length)
				$('#output').text(before + after*-1);
				found = true;
			}
			}*/		

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

		for (var i = current.length - 1; i >= 0 && !found; i--) {
			//Needs to go through and slice in () around -- so 1--2+0--9 would become 1-(-2)+0-(-9)
			//bunch of if statements here
		}
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
