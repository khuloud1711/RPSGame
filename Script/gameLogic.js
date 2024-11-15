

//creating the score object
const Score = {
    wins: 0,
    losses: 0,
    ties: 0
};
//listenitg to the storage event to check for saved score
window.addEventListener('storage', updateScore());

// generating the computer move in a random manner 
function generateComputerMove(userMove) {
    // using the random or method() function to generate value
    //bettween 0 and 1
    const randomNumber = Math.random();

    // creating the computer move variables 
    let computerMove = '';

    //checking the random value base on the previous assumption
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "Rock";
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "Paper";
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = "Scissors";

    }

    //displaiyng bothe moves
    //
    console.log(`User:${userMove} --- Computer:${computerMove}`);

    //calling the compair method
    compairChoices(userMove, computerMove);
}

//creating the comparision method
function compairChoices(usserChoic, copputerChoice) {
    //creating a varaible to store the comparsion result 
    let theResult = '';
    //copmpare the move 
    if (usserChoic === copputerChoice) {
        theResult = "Tie.";
    }
    else if (usserChoic === "Rock" && copputerChoice === "Paper") {
        theResult = "You Lose."

    }
    else if (usserChoic === "Rock" && copputerChoice === "Scissors") {
        theResult = "You Win.";
    }
    else if (usserChoic === "Paper" && copputerChoice === "Rock") {
        theResult = "You Win.";
    }
    else if (usserChoic === "Paper" && copputerChoice === "Scissors") {
        theResult = "You Lose.";
    }
    else if (usserChoic === "Scissors" && copputerChoice === "Rock") {
        theResult = "You Lose.";
    }
    else if (usserChoic === "Scissors" && copputerChoice === "Paper") {
        theResult = "You Win.";
    }

    //updating the score object
    if (theResult === "You Win.") {
        Score.wins += 1;

    }
    else if (theResult === "You lose.") {
        Score.losses += 1;
    }
    else if (theResult === "Tie.") {
        Score.ties += 1;
    }

    //using local storage to maintain the currunt store
    //since the local storage work with data, we need to serialize the score object
    localStorage.setItem(`score`, JSON.stringify(Score));

    //calling display function
    displayResult(theResult, usserChoic, copputerChoice);


    console.log(`You picked ${usserChoic}. Computer picked ${copputerChoice}. Result: ${theResult}\nwins: ${Score.wins} - Losses: ${Score.losses} - Tie: ${Score.ties}`);
}

//creating a counter reset function
function resetCounters() {
    Score.wins = 0;
    Score.losses = 0;
    Score.ties = 0;

    //deleting the storage score
    localStorage.removeItem("score");

    // informing the user with the current score 
    displayResult();
    console.log(`Score has been reset. This is fresh start.\nWins: ${Score.wins} - Losses: ${Score.losses} - Tie: ${Score.ties}`);


}

//creating a score update function 
function updateScore(e) {
    //geting the data fromm the localStorage and converting them back to javaScript 
    let newScore = JSON.parse(localStorage.getItem('score'));
    //cheaking if the newScore is empty
    if (newScore === null) {
        alert("There is no saved data..");
    }
    else {
        alert("Saved score avaliable..");
        Score.wins = newScore.wins;
        Score.losses = newScore.wins;
        Score.ties = newScore.wins;
    }
}

//creating a function to display full option
function displayResult(result = "New Game", userStep = "No Moves", computerSteps = "No Moves") {
    //displaying the comparision result
    //linking to the paragrapg elemnts
    let theResultDisplay = document.querySelector(".jsResult");
    let theMovesDisplay = document.querySelector(".jsMoves");
    let theScoreDisplay = document.querySelector(".jsScore");


    //populating the text inside the paragraph emement
    theResultDisplay.innerHTML = result;
    theMovesDisplay.innerHTML = `You 
    <img src="./image/${userStep}Final.png" class="moveIcone">
    <img src="./image/${computerSteps}Final.png" class="moveIcone">
    Computer.`;
    theScoreDisplay.innerHTML = `Wins: ${Score.wins} - Losses: ${Score.losses} - Tie: ${Score.ties}`;
}
