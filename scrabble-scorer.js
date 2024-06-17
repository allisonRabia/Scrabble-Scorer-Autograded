// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
let givenWord = "";
let oldScorePoints = 0;
let newScorePoints = 0;
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

let newPointStructure = transform(oldPointStructure);

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (const oldPointValue in oldPointStructure) {
      //console.log(oldPointStructure[oldPointValue]);
      //console.log(oldPointValue);
      
      let letters = oldPointStructure[oldPointValue];
      for (i = 0; i < letters.length; i++) {
      //console.log(letters[i]);
      oldPointStructure[letters[i]] = oldPointValue;

      newPointStructure[letters[i].toLowerCase()]/**/ = Number(oldPointValue);
  //newPointStructure += oldPointStructure; //how do i get these values into newpoointstructure?
      console.log(newPointStructure);
   }
      
   }return newPointStructure;

}
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
         oldScorePoints += Number(pointValue);
		 }
 
	  }
	} console.log(`Your score for '${word}' is: ${oldScorePoints}`);
   console.log(letterPoints);
	return letterPoints;
 }

function scrabbleScorer(word) {
   let newPointStructure = transform(oldPointStructure);
   word = word.toLowerCase();

      for (let i = 0; i < word.length; i++) {

          for (const lowerCaseLetter in newPointStructure) {
               console.log(lowerCaseLetter);
               console.log(newPointStructure[lowerCaseLetter]);
                if (lowerCaseLetter == (word[i])) {
               newScorePoints += newPointStructure[lowerCaseLetter];
                }
             }console.log(`Your score for '${word}' is: ${newScorePoints}`);
       
   }return newScorePoints;
}

// function scrabbleScorer(word) {
//       word = word.toLowerCase();
//       let newPointStructure = transform(oldPointStructure);
//       //let newScorePoints = ;
//       console.log("hello");
//       for (let i = 0; i < word.length; i++) {
//          console.log("hello");
//         // let letters = newPointStructure[i];
       
//          for (let j = 0; j < 33; j++) {
//             console.log(`Word i: ${word[i]}`);
//             //let letters = newPointStructure[i];
//             console.log("hello");
//             console.log(`Word i: ${word[i]}, ${newPointStructure[j]}` );
//              if (word[i] == newPointStructure[j]) {
               
//             console.log(newPointStructure[j]);
//             console.log(newPointStructure[j][0]);
//             let newPointValue = newPointStructure[i][0];

//          newScorePoints += newPointVlaue;
//          console.log(newScorePoints);
//          }

//       } 
      
//          console.log(`Your score is: ${newScorePoints}`);
//          return newScorePoints;
//       }
//    }
 function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   let vowelPoints = 0; 
   let consonantPoints = 0;

   for (let i = 0; i < word.length; i++) {
      for (const wordValue in vowelBonusPointStructure) {
         if (vowelBonusPointStructure[wordValue].includes(word[i])) {
            vowelPoints += 3;
      
         } else {
            consonantPoints++;
         }
         letterPoints = (vowelPoints + consonantPoints);
   
      }
   
   }console.log(`Your score for '${word}' is: ${letterPoints}`);
   
 return letterPoints;
}
 
 function simpleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      
      letterPoints++;
   }
   console.log(`Your score for '${word}' is: ${letterPoints}`);
   return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   givenWord = input.question("Enter a word: ");
   return givenWord;
}


const scoringAlgorithms = [0, 1, 2]; 
scoringAlgorithms[0] = {
   playName: "Simple",
   description: "Each letter is worth 1 point.",
   scoringFunction: simpleScorer
};

scoringAlgorithms[1] = {
   playName: "Vowel Bonus",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoringFunction: vowelBonusScorer
};

scoringAlgorithms[2] = {
   playName: "Scrabble",
   description: "The traditional scoring algorithm.",
   scoringFunction: scrabbleScorer
};




//let simpleScorer;


//let vowelBonusScorer;

//let scrabbleScorer;



function scorerPrompt() {
   let scoringChoice = 0;
   scoringChoice = input.question("Which scoring algorithm would you like to use?\n 0 - Simple: One point per character\n 1 - Vowel Bonus: Vowels are worth 3 points\n 2 - Scrabble: Uses scrablle piont system\n Enter 0, 1, or 2: ");


   if (scoringChoice == 0){
      scoringAlgorithms[0].scoringFunction(givenWord);
   } else if (scoringChoice == 1){
      scoringAlgorithms[1].scoringFunction(givenWord);
   } else if (scoringChoice == 2){
      scoringAlgorithms[2].scoringFunction(givenWord);
   // } else {
   //    console.log("Invalid entry, try again: ");
   //    scorerPrompt();
   }
   return scoringChoice;
}


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
