/*
What is our end goal?
What is the simplest, most impelmemation?

var bandName = 'Blink182';

function respondToInput() {
	var input = getUserInput();
  if (bandName.contains(input)) {
   //do stuff
 }
}

document.addEventListner('keyDown', respondToInput)
*/



// Creates an array with many different word options for the computer to select from
var bandNames= ['Blink182', 'Daughtry', 'ASkylitDrive', 'LukeBryan'];
var computerGuess = bandNames[Math.floor(Math.random() * bandNames.length)];
var placeholder = [];
var lives = 3;

//Array(computerGuess.length).join(‘_’);
for (var i = 0; i < computerGuess.length; i++) {
  placeholder[i] = '_';
}

var randomBand = document.getElementById('band');
randomBand.textContent = placeholder.join(" ");

var numberLives = document.getElementById('lives');
numberLives.textContent = lives;

function onUserInput(event) {
  var userGuess = event.key;
  var seenCharacter = false;

  for (var i = 0; i < computerGuess.length; i++) {
				if(userGuess === computerGuess[i].toLowerCase()) {
						placeholder[i] = computerGuess[i];
            randomBand.textContent = placeholder.join(" ");
            seenCharacter = true;
				}
   }

   if(!seenCharacter) {
     lives--;
     numberLives.textContent = lives;
     if (lives === 0) {
       document.removeEventListener("keydown", onUserInput);
       alert("Game Over!");
     }
   }
}

  // This function is run everytime a user pushes a key
document.addEventListener('keydown', onUserInput);
