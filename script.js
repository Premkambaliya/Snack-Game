// let blockSize = 25;
// let total_row = 17; //total row number
// let total_col = 17; //total column number
// let board;
// let context;

// let snakeX = blockSize * 5;
// let snakeY = blockSize * 5;

// // Set the total number of rows and columns
// let speedX = 0;  //speed of snake in x coordinate.
// let speedY = 0;  //speed of snake in Y coordinate.

// let snakeBody = [];

// let foodX;
// let foodY;

// let gameOver = false;

// window.onload = function () {
//     // Set board height and width
//     board = document.getElementById("board");
//     board.height = total_row * blockSize;
//     board.width = total_col * blockSize;
//     context = board.getContext("2d");

//     placeFood();
//     document.addEventListener("keyup", changeDirection);  //for movements
//     // Set snake speed
//     setInterval(update, 1000 / 10);
// }

// function update() {
//     if (gameOver) {
//         return;
//     }

//     // Background of a Game
//     context.fillStyle = "green";
//     context.fillRect(0, 0, board.width, board.height);

//     // Set food color and position
//     context.fillStyle = "yellow";
//     context.fillRect(foodX, foodY, blockSize, blockSize);

//     if (snakeX == foodX && snakeY == foodY) {
//         snakeBody.push([foodX, foodY]);
//         placeFood();
//     }

//     // body of snake will grow
//     for (let i = snakeBody.length - 1; i > 0; i--) {
//         // it will store previous part of snake to the current part
//         snakeBody[i] = snakeBody[i - 1];
//     }
//     if (snakeBody.length) {
//         snakeBody[0] = [snakeX, snakeY];
//     }

//     context.fillStyle = "white";
//     snakeX += speedX * blockSize; //updating Snake position in X coordinate.
//     snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
//     context.fillRect(snakeX, snakeY, blockSize, blockSize);
//     for (let i = 0; i < snakeBody.length; i++) {
//         context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
//     }

//     if (snakeX < 0 
//         || snakeX > total_col * blockSize 
//         || snakeY < 0 
//         || snakeY > total_row * blockSize) { 
        
//         // Out of bound condition
//         gameOver = true;
//         alert("Game Over");
//     }

//     for (let i = 0; i < snakeBody.length; i++) {
//         if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
//             // Snake eats own body
//             gameOver = true;
//             alert("Game Over");
//         }
//     }
// }

// // Movement of the Snake - We are using addEventListener
// function changeDirection(e) {
//     if (e.code == "ArrowUp" && speedY != 1) { 
//         // If up arrow key pressed with this condition...
//         // snake will not move in the opposite direction
//         speedX = 0;
//         speedY = -1;
//     }
//     else if (e.code == "ArrowDown" && speedY != -1) {
//         //If down arrow key pressed
//         speedX = 0;
//         speedY = 1;
//     }
//     else if (e.code == "ArrowLeft" && speedX != 1) {
//         //If left arrow key pressed
//         speedX = -1;
//         speedY = 0;
//     }
//     else if (e.code == "ArrowRight" && speedX != -1) { 
//         //If Right arrow key pressed
//         speedX = 1;
//         speedY = 0;
//     }
// }

// // Randomly place food
// function placeFood() {

//     // in x coordinates.
//     foodX = Math.floor(Math.random() * total_col) * blockSize; 
    
//     //in y coordinates.
//     foodY = Math.floor(Math.random() * total_row) * blockSize; 
// }


let blockSize = 25;
let total_row = 17;
let total_col = 17;
let board;
let context;

let snakeX, snakeY;
let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX, foodY;

let gameOver = false;
let gameInterval;

let gamePaused = false;
let score = 0; // Variable to keep track of score

// Snake shape properties
let snakeColor = "lime"; // Initial color of the snake

window.onload = function () {
    // Initialize board and context
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    // Initialize buttons
    document.getElementById("restartBtn").addEventListener("click", restartGame);
    document.getElementById("stopBtn").addEventListener("click", toggleGamePause);

    // Start the game
    restartGame();
}

function restartGame() {
    // Reset game variables
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    score = 0;  // Reset the score
    gameOver = false;
    gamePaused = false;
    
    // Clear any existing interval (in case restart is clicked during a game)
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    
    // Start the game interval
    gameInterval = setInterval(update, 1000 / 10);
    placeFood();

    // Reset button text
    document.getElementById("stopBtn").innerText = "Stop Game";
}

function toggleGamePause() {
    if (gamePaused) {
        // If the game is paused, resume it
        gamePaused = false;
        gameInterval = setInterval(update, 1000 / 10);
        document.getElementById("stopBtn").innerText = "Stop Game";
    } else {
        // If the game is not paused, stop it
        gamePaused = true;
        clearInterval(gameInterval);
        document.getElementById("stopBtn").innerText = "Continue Game";
    }
}

function update() {
    if (gameOver || gamePaused) {
        return;
    }

    // Game background color
    context.fillStyle = "#333";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and shape
    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();

    // Check if snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]); // Add food to snake's body
        score++;  // Increase score

        // Change snake's shape every 5 points (example: change color)
        if (score % 5 === 0) {
            snakeColor = getRandomColor(); // Change snake color every 5 points
        }

        placeFood();  // Reposition the food
    }

    // Update snake body positions
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = snakeColor;  // Use updated snake color
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    // Draw the snake's body
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Game Over conditions
    if (snakeX < 0 || snakeX >= total_col * blockSize || snakeY < 0 || snakeY >= total_row * blockSize) {
        gameOver = true;
        alert("Game Over! Final Score: " + score);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over! Final Score: " + score);
        }
    }

    // Display the score on the screen
    displayScore();
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && speedY !== 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code === "ArrowDown" && speedY !== -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code === "ArrowLeft" && speedX !== 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code === "ArrowRight" && speedX !== -1) {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

// Function to generate random color for the snake
function getRandomColor() {
    const colors = ["lime", "yellow", "orange", "cyan", "magenta", "blue", "green"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to display score on the screen
function displayScore() {
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 30);
}

document.addEventListener("keyup", changeDirection);
