/*
What is our end goal?
What is the simplest impelmentation?

var bandName = 'Blink182';

function respondToInput() {
	var input = getUserInput();
  if (bandName.contains(input)) {
   //do stuff
 }
}

document.addEventListner('keyDown', respondToInput);
*/

// Creates an array with many different word options for the computer to select from
var bandNames= ["SmoothCriminal", "Thriller", "BeatIt", "BlackOrWhite", "BillieJean"];
var computerGuess = bandNames[Math.floor(Math.random() * bandNames.length)];
var placeholder = [];
var lives = 8;
var letters = [];
var playBeatIt;
var playSmoothCriminal;
var playThriller;
function getElement(id) {
  return document.getElementById(id);
}
//fills the array placeholder with underscores equal to the length of the word
// chosen by at random. The random words chosen at random are stored in computerGuess
for(i in computerGuess) {
  placeholder[i] = "_";
}

var randomBand = getElement("band");
randomBand.textContent = placeholder.join(" ");

var numberLives = getElement('numberLives');
numberLives.textContent = lives;

var lettersAlreadyUsed = getElement("lettersUsed");
lettersAlreadyUsed.textContent = letters.join(" ");

function playSong(variable, id) {
  variable = getElement(id);
  variable.play();
}

function pauseSong(variable, id) {
  variable = document.getElementById(id);
  variable.pause();
}

function winner() {
 for(i in computerGuess) {
  if (placeholder.indexOf(computerGuess.charAt(i)) == -1) {
    return false;
  }
}
 return true;
}


// var inputElement = document.createElement('input');
// inputElement.type = "button";
// inputElement.innerHTML = "<p> Play </p>";
// inputElement.addEventListener('click', function() {
//   playSong(playThriller, "thrillerSong");
// });
//
// document.getElementById("play-button").appendChild(inputElement);


// Main Function connected to the eventListener
function onUserInput() {

// linking pressed keys to variable userGuess
  var userGuess = event.key;

  // creating a variable to prevent repeated input if a pressed key has already been pressed
  var seenCharacter = false;

    // using the letters[] array to store userGuess and using indexOf set to undefined
    // to prevent storage of the same key in the array
    if (letters.indexOf(userGuess) === -1) {
      letters.push(userGuess);
      //converts the letters[] array into a string when displayed to end-user
      lettersAlreadyUsed.textContent = letters.join(" ");
    }

  //try and replace if statements and for loops with functional javascript and go through more of these practice questions

  // This loop will run for the number of characters stored in computerGuess
    for (i in computerGuess) {
      // This comparison is two-fold:
      // 1) It compares the key pressed with the corresponding index depending on the
      //    iteration in the loop
      // 2) At the same time, the computerGuess array is converted to lower-case to allow
      //    for easier comparison between userGuess and computerGuess
  				if(userGuess === computerGuess[i].toLowerCase()) {
            // Changes the underscore with the letter at the particular index in the array
  						placeholder[i] = computerGuess[i];
              // This displays the correctly guessed word to the user coverted to a string
              randomBand.textContent = placeholder.join(" ");
              // Changes the boolean to hold a true value to prevent the second statement from
              // running if the user correctly pressed a key contained in the computerGuess
              seenCharacter = true;
              if (winner()) {
                alert("You beat it");
                // calls playSong () and plays "Beat It" if you win game
                playSong(playBeatIt, "beatItSong");
                getElement("pause-button").addEventListener("click", function() {pauseSong(playBeatIt, "beatItSong")});
              }
            }
  			}

    // if the user did not press a key corresponding to userGuess then this if statement runs
    // since seenCharacter === false which is the value I originally set
     if(!seenCharacter) {
      // decrement lives by 1
       lives--;
      // displays the new value for lives on-screen
       numberLives.textContent = lives;
      // sets a threshold for the game to end when lives === 0
       if (lives === 0) {
        // ends the event connection to key.event and the onUserInput function
         document.removeEventListener("keydown", onUserInput);
        // alerts the user that the game is over
         alert("Game Over!");
        //  calls playSong() function to play Smooth Criminal if you lose game (lives === 0)
         playSong(playSmoothCriminal, "smoothCriminalSong");
         getElement("pause-button").addEventListener("click", function() {pauseSong(playSmoothCriminal, "smoothCriminalSong")});
       }
     }
  }

// This function is run everytime a user pushes a key
document.addEventListener("keydown", onUserInput);

getElement("play-button").addEventListener("click", function() {playSong(playThriller, "thrillerSong")});
// removed auto-play attribute from play() function:
// added functionality: keeps from startling users entering site
getElement("play-button").removeAttribute("autoplay");

getElement("pause-button").addEventListener("click", function() {pauseSong(playThriller, "thrillerSong")});
