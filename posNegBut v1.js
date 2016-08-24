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
			var itsANum = current[i] >= 0;
			var end = current.length;
			var opPresent = current.search('*' || '/' || '-' || '+');

		// ------------------- \/\/ number found, operator found logic
			if (current[i] != isItOp && !hasFoundNum) { //current i is a number
				numFound = true; // number found
				
			} else if (current[i] != isItOp && numFound) { //current i is # and numFound
				hasFoundNum = true;
				
			} else if (isItOp && !hasFoundNum) { //current i is operator
				itsOp = true;
				
			};
		// ------------------- \/\/ posNegBut logic
			  if (numFound && hasFoundNum) {
				var before = current.slice(0, i)
				var after = current.slice(i, end)
				$('#output').text(before + after*-1);
				found = true;
					if (numFound && hasFoundNum) {
						var before = current.slice(0, i-1)
						var after = current.slice(i, end)
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
			}	else if (opPresent >= 0 /*prevPrevIDX >0 && isItOp(current[i-2]) && !itsOp*/) { //two operators 1--1
				var before = current.slice(0, i)
				var after = current.slice(i-1, end)
				$('#output').text(before + after*-1);
				found = true;
					if (numFound && isPrevPrevOp) {
						var before = current.slice(0, i-1)
						var after = current.slice(i-1, end)
						$('#output').text(before + after*-1);
						found = true;
					}  
			}	else if (isItOp(current[i]) && isPrevNum) { //9+
				$('#output').text(current + '-');
				found = true;
				if (current.endsWith('-') && isPrevNum) {
					var sliceItBaby = current.slice(0, i)
					$('#output').text(sliceItBaby);
				}	found = true; 
			}	else if (itsANum && opHasClick) { //9+9
				var before = current.slice(0, i)
				var after = current.slice(i, end)
				$('#output').text(before + after*-1);
				found = true;
					if (numFound && isPrevPrevOp) {
						var before = current.slice(0, i-1)
						var after = current.slice(i-1, end)
						$('#output').text(before + after*-1);
						found = true;
					}  
			}	else if (numFound && itsANum) { //only #'s
				$('#output').text(current*-1);
				found = true;
			}	else if (numFound && isPrevOp) {
				var before = current.slice(0, i)
				var after = current.slice(i-1, end)
				$('#output').text(before + after*-1);
				found = true;
					if (numFound && isPrevPrevOp) {
						var before = current.slice(0, i-1)
						var after = current.slice(i-1, end)
						$('#output').text(before + after*-1);
						found = true;
					} 
			}		
		}

	});	