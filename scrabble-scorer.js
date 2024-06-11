// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowelBonusPointStructure = {
   3: ['A', 'E', 'I', 'O', 'U']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   let vowelPoints = 0; 
   let consonantPoints = 0;

   for (let i = 0; i < word.length; i++) {
      for (const wordValue in vowelBonusPointStructure) {
         if (vowelBonusPointStructure[wordValue].includes(word[i])) {
            vowelPoints++;
      
         } else {
            consonantPoints++;
         }
         letterPoints = (vowelPoints + consonantPoints);
   
      }
   
   }console.log(`Your score is: ${letterPoints}`);
   
 return letterPoints;
}
 
 function simpleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      
      letterPoints++;
   }
   console.log(`Your score is: ${letterPoints}`);
   return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
function initialPrompt() {
   let givenWord = "";
   console.log("Let's play some scrabble! Enter a word:");
   givenWord = input.question("Enter a word: ");
   return (vowelBonusScorer(givenWord));
   //console.log(simpleScorer(givenWord));
   //return (simpleScorer(givenWord));
   //console.log(oldScrabbleScorer(givenWord));
   //return (oldScrabbleScorer(givenWord));
}


const scoringAlgorithms = []; //[simplePlayDisplay, vowelBonusDisplay, scrabbleDisplay];
let simplePlayDisplay = {
   playName: "Simple",
   description: "Each letter is worth 1 point.",
   scoringFunction: "A function with a parameter for user input that returns a score."
};

let vowelBonusDisplay = {
   playName: "Vowel Bonus",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoringFunction: "A function that returns a score based on the number of vowels and consonants."
};

let scrabbleDisplay = {
   playName: "Scrabble",
   description: "The traditional scoring algorithm.",
   scoringFunction: "Uses the oldScrabbleScorer() function to determine the score for a given word."
};


// function askIfWantToBuy() {
//    console.log("Welcome to Amazon: The Original");
//    const wantToBuy = input.question("Do you want to buy books? (y/n)");
//    return wantToBuy;
//  }



let newPointStructure;

//let simpleScorer;


//let vowelBonusScorer;

let scrabbleScorer;



function scorerPrompt() {
   let scoringChoice = 0;
   scoringChoice = input.question("Which scoring algorithm would you like to use?\n 0 - Simple: One point per character\n 1 - Vowel Bonus: Vowels are worth 3 points\n 2 - Scrabble: Uses scrablle piont system\n Enter 0, 1, or 2: ");
   return scoringChoice;
}

function transform() {};

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
