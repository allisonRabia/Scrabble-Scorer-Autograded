// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.
let givenWord = "";
let oldScorePoints = 0;
let newScorePoints = 0;
const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

let newPointStructure = transform(oldPointStructure);

function transform(oldPointStructure) {
  let newPointStructure = {};
  for (const oldPointValue in oldPointStructure) {
    let letters = oldPointStructure[oldPointValue];
    for (i = 0; i < letters.length; i++) {
      newPointStructure[letters[i].toLowerCase()] = Number(oldPointValue);
    }
  }
  return newPointStructure;
}
const vowelBonusPointStructure = {
  3: ["A", "E", "I", "O", "U"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
        oldScorePoints += Number(pointValue);
      }
    }
  }
  console.log(`Your score for '${word}' is: ${oldScorePoints}`);
  console.log(letterPoints);
  return letterPoints;
}

function scrabbleScorer(word) {
  let letterPoints = 0;
  word = word.toLowerCase();

  for (let i = 0; i < word.length; i++) {
    for (const lowerCaseLetter in newPointStructure) {
      if (lowerCaseLetter == word[i]) {
        letterPoints += newPointStructure[lowerCaseLetter];
      }
    }
  }
  console.log(`Your score for '${word}' is: ${letterPoints}`);

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
        vowelPoints += 3;
      } else {
        consonantPoints++;
      }
      letterPoints = vowelPoints + consonantPoints;
    }
  }
  console.log(`Your score for '${word}' is: ${letterPoints}`);
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
  scorerFunction: simpleScorer,
};

scoringAlgorithms[1] = {
  playName: "Vowel Bonus",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScorer,
};

scoringAlgorithms[2] = {
  playName: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: scrabbleScorer,
};

function scorerPrompt() {
  let scoringChoice = 0;
  scoringChoice = input.question(
    "Which scoring algorithm would you like to use?\n 0 - Simple: One point per character\n 1 - Vowel Bonus: Vowels are worth 3 points\n 2 - Scrabble: Uses scrablle piont system\n Enter 0, 1, or 2: "
  );

  if (scoringChoice == 0) {
    scoringAlgorithms[0].scorerFunction(givenWord);
  } else if (scoringChoice == 1) {
    scoringAlgorithms[1].scorerFunction(givenWord);
  } else if (scoringChoice == 2) {
    scoringAlgorithms[2].scorerFunction(givenWord);
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
  scorerPrompt: scorerPrompt,
};
