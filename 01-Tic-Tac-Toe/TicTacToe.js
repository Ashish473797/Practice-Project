const readlineSync = require("readline-sync");

// Global Variables
let gameStatus = true;
let move = true;
let draw = false;
let anyWinner = false;


// Logic Array for Win Check
let status = [
    [2, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]


// Position Array for Board
let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];


function reset(){

// reset Variables
gameStatus = true;
move = true;
draw = false;
anyWinner = false;


// reset Logic Array for Win Check
status = [
    [2, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]


// reset Position Array for Board
positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
}

// Board Implimentation
function drawBoard() {
  console.clear();
  process.stdout.write('\n');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j == 2) process.stdout.write(` ${positions[i][j]}`);
      else process.stdout.write(` ${positions[i][j]} |`);
    }
    process.stdout.write("\n");
    if (i != 2) process.stdout.write("---+---+---\n");
  }
  process.stdout.write('\n');

}

function smartMove(){
    let row = 0, col = 0;

    // Try to Win in Horizontal
    for(row; row < 3; row++){
        if((status[row][0] == status[row][1] || status[row][1] == status[row][2] || status[row][0] == status[row][2]) && (status[row][0] != 0 || status[row][1] != 0 || status[row][2] != 0) && (status[row][0] != 1 || status[row][1] != 1 || status[row][2] != 1)){
            if(status[row][0] != 0 && status[row][0] != 1){
                return positions[row][0];
            }
            else if(status[row][1] != 0 && status[row][1] != 1){
                return positions[row][1];
            }
            else if(status[row][2] != 0 && status[row][2] != 1){
                return positions[row][2];
            }
        }
    }

    // Try to Win in Vertical
    for(col; col < 3; col++){
        if((status[0][col] == status[1][col] || status[1][col] == status[2][col] || status[0][col] == status[2][col]) && (status[0][col] != 0 || status[1][col] != 0 || status[2][col] != 0) && (status[0][col] != 1 || status[1][col] != 1 || status[2][col] != 1)){
            if(status[0][col] != 0 && status[0][col] != 1){
                return positions[0][col];
            }
            else if(status[1][col] != 0 && status[1][col] != 1){
                return positions[1][col];
            }
            else if(status[2][col] != 0 && status[2][col] != 1){
                return positions[2][col];
            }
        }
    }

    // Try to Win in Diagonal
    if((status[0][0] == status[1][1] || status[1][1] == status[2][2] || status[0][0] == status[2][2] || status[0][2] == status[1][1] || status[1][1] == status[2][0] || status[0][2] == status[2][0]) && (status[0][0] != 0 || status[1][1] != 0 || status[2][2] != 0 || status[0][2] != 0 || status[2][0] != 0) && (status[0][0] != 1 || status[1][1] != 1 || status[2][2] != 1 || status[0][2] != 1 || status[2][0] != 1)){
        if(status[0][0] != 0 && status[0][0] != 1){
            return 1;
        }
        else if(status[1][1] != 0 && status[1][1] != 1){
            return 5;
        }
        else if(status[2][2] != 0 && status[2][2] != 1){
            return 9;
        }
        else if(status[0][2] != 0 && status[0][2] != 1){
            return 3;
        }
        else if(status[2][0] != 0 && status[2][0] != 1){
            return 7;
        }
    }

    // Strategy first corner
    if(status[0][0] != 0 && status[0][0] != 1){
        return 1;
    }
    else if(status[0][2] != 0 && status[0][2] != 1){
        return 3;
    }
    else if(status[2][0] != 0 && status[2][0] != 1){
        return 7;
    }
    else if(status[2][2] != 0 && status[2][2] != 1){
        return 9;
    }

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(status[i][j] != 0 && status[i][j] !=1){
                return positions[i][j];
            }
        }
    }

    return 9;
}

// Computer Selection and their moves
function computerMove(){
    move = !move;
    let index = '';
    if(move == true){
        index = smartMove();
    }
    else{
        index = readlineSync.question('Player O Your Turn: ');
    }
    insertatPositon(index);
}


// Player Selection and their moves
function playersMove(){
    move = !move;
    let index = '';
    if(move == true){
        index = readlineSync.question('Player X your Move: ');
    }
    else{
        index = readlineSync.question('Player O your Move: ');
    }
    insertatPositon(index);
}


// Fill positions with X or O
function insertatPositon(index){
     let xORo = move?'X':'O';
     let oneORTwo = move?1:0;
     if(index > 0 && index < 4){
        if(positions[0][index-1] == 'X' || positions[0][index-1] == 'O'){
            console.log('Invalid Position Try Again');
            readlineSync.question('');
            move = !move;
        }
        else{
            positions[0][index-1] = xORo;
            status[0][index-1] = oneORTwo;
        }
     }
     else if(index > 3 && index < 7){
        if(positions[1][index-4] == 'X' || positions[1][index-4] == 'O'){
            console.log('Invalid Position Try Again');
            readlineSync.question('');
            move = !move;
        }
        else{
            positions[1][index-4] = xORo;
            status[1][index-4] = oneORTwo;
        }
     }
     else if(index > 6 && index < 10){
        if(positions[2][index-7] == 'X' || positions[2][index-7] == 'O'){
            console.log('Invalid Position Try Again');
            readlineSync.question('');
            move = !move;
        }
        else{
            positions[2][index-7] = xORo;
            status[2][index-7] = oneORTwo;
        }
     }
}


// Draw Check Function
function isDraw(){
    let sum = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            sum += status[i][j];
        }
    }
    if(sum == 4){
        draw = true;
        return true;
    }
}


// Winner Check Function
function winnerCheck(){
    
    // Checking Horizontal match
    let row = 0 , col = 0;
    for(row = 0 ; row < 3 ; row++)
    {
        if(status[row][0] == status[row][1] && status[row][1] == status[row][2])
        {
            console.log(`Player ${move?'X':'O'} is Winner!`);
            anyWinner = true;
            readlineSync.question('Press Enter to Continue');
        }
    }

    // checking vertical match
    for(col = 0 ; col < 3 ; col++)
    {
        if(status[0][col] == status[1][col] && status[1][col] == status[2][col])
        {
            console.log(`Player ${move?'X':'O'} is Winner!`);
            anyWinner = true;
            readlineSync.question('Press Enter to Continue');
        }
    }

	// Checking diagonal match
    if(status[0][0] == status[1][1] && status[1][1] == status[2][2]){
        console.log(`Player ${move?'X':'O'} is Winner!`);
        anyWinner = true;
        readlineSync.question('Press Enter to Continue');
    }
	else if(status[0][2] == status[1][1] && status[1][1] == status[2][0]){
        console.log(`Player ${move?'X':'O'} is Winner!`);
        anyWinner = true;
        readlineSync.question('Press Enter to Continue');
    }
    else if(isDraw()){
        console.log('Match Draw!')
        readlineSync.question('Press Enter to Continue');
    }
}


// Match Finished or Not
function matchFinished(){
    if(draw == true || anyWinner == true)
    return true;
}


// Main Function to Start Game
function startGame() {
  let choice;
  let isStarted = true;

  while (isStarted) {
    reset();
    console.clear();
    console.log("Enter 1 to Play with other Player");
    console.log("Enter 2 to play with smart Computer");
    console.log("Enter 3 to Exit");
    choice = readlineSync.question("Enter your Choice: ");
    switch (choice) {
      case '1':
        while(gameStatus){
            drawBoard();
            winnerCheck();
            if(matchFinished()){
                break;
            }
            playersMove();
        }
        break;
      case '2':
        while(gameStatus){
            drawBoard();
            winnerCheck();
            if(matchFinished()){
                break;
            }
            computerMove();
        }
        break;
      case '3':
        isStarted = false;
        break;
      default:
        console.log("Invalid input");
    }
  }
}

startGame();