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
let gamePaused = false;
let gameInterval;

let score = 0; // Variable to track current score
let highestScore = 0; // Variable to track the highest score
let snakeColor = "lime"; // Initial snake color

window.onload = function () {
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    // Load the highest score from local storage
    highestScore = parseInt(localStorage.getItem("highestScore")) || 0;
    document.getElementById("highestScore").innerText = highestScore;

    document.getElementById("restartBtn").addEventListener("click", restartGame);
    document.getElementById("stopBtn").addEventListener("click", toggleGamePause);

    restartGame();
};

function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    score = 0;
    gameOver = false;
    gamePaused = false;

    document.getElementById("currentScore").innerText = score;

    if (gameInterval) {
        clearInterval(gameInterval);
    }

    gameInterval = setInterval(update, 1000 / 10);
    placeFood();
    document.getElementById("stopBtn").innerText = "Stop Game";
}

function toggleGamePause() {
    if (gamePaused) {
        gamePaused = false;
        gameInterval = setInterval(update, 1000 / 10);
        document.getElementById("stopBtn").innerText = "Stop Game";
    } else {
        gamePaused = true;
        clearInterval(gameInterval);
        document.getElementById("stopBtn").innerText = "Continue Game";
    }
}

function update() {
    if (gameOver || gamePaused) return;

    context.fillStyle = "#333";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        score++;
        document.getElementById("currentScore").innerText = score;

        if (score > highestScore) {
            highestScore = score;
            localStorage.setItem("highestScore", highestScore);
            document.getElementById("highestScore").innerText = highestScore;
        }

        if (score % 5 === 0) {
            snakeColor = getRandomColor();
        }

        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = snakeColor;
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX >= total_col * blockSize || snakeY < 0 || snakeY >= total_row * blockSize) {
        endGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            endGame();
        }
    }
}

function changeDirection(e) {
    // Prevent moving in the reverse direction
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

function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    alert("Game Over! Final Score: " + score);
}

function getRandomColor() {
    const colors = ["lime", "yellow", "orange", "cyan", "magenta", "blue", "green"];
    return colors[Math.floor(Math.random() * colors.length)];
}

document.addEventListener("keydown", changeDirection);
