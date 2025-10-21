let username = "";
let leaderboard = [];

function submitUsername() {
  const input = document.getElementById("usernameInput").value.trim();
  if (input === "") {
    alert("Please enter a username.");
    return;
  }
  username = input;
  document.getElementById("usernamePrompt").style.display = "none";
  startGame();
}

let highScore = 0;

let delay = 100; // initial speed (milliseconds between frames)
let game;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 600;
let score = 0;

// Snake and food
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box,
};

let direction;

// Listen for arrow keys
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key === 38 && direction !== "DOWN") direction = "UP";
  else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
  if(isPaused) return;
  if (
  headX < 0 || headX >= canvas.width ||
  headY < 0 || headY >= canvas.height ||
  snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
) {
  clearInterval(game);
  updateLeaderboard(username, score);
  countdownAndSpeak(startGame);
  return;
}


  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Snake movement
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Check collision with food
  if (headX === food.x && headY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  } else {
    snake.pop();
  }

  // Game over conditions
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvasSize ||
    headY >= canvasSize ||
    collision(headX, headY, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
  }

  // Add new head
  const newHead = { x: headX, y: headY };
  snake.unshift(newHead);

  // Display score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}
score++;
document.getElementById("scoreBoard").innerText = "Score: " + score;

// Update high score if needed
if (score > highScore) {
  highScore = score;
  document.getElementById("highScoreBoard").innerText = "High Score: " + highScore;
}

function collision(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (x === array[i].x && y === array[i].y) return true;
  }
  return false;
}

const game = setInterval(draw, 100);

function restartGame() {
  // Fade out
  canvas.style.opacity = 0;

  setTimeout(() => {
    function startGame(if (headX === food.x && headY === food.y) {
  score++;
  document.getElementById("scoreBoard").innerText = "Score: " + score;
  food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
  };

  // Increase speed every 10 apples
  if (score % 10 === 0) {
    delay = Math.max(20, delay - 5); // minimum delay to avoid going too fast
    clearInterval(game);
    game = setInterval(draw, delay);
  }
}
 
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = "RIGHT";
  score = 0;
  delay = 100;
  document.getElementById("scoreBoard").innerText = "Score: 0";
  food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
  };
  clearInterval(game);
  game = setInterval(draw, delay);
}


let isPaused = false;

function togglePause() {
  isPaused = !isPaused;
  document.querySelector("button[onclick='togglePause()']").innerText = isPaused ? "Resume" : "Pause";
}
score = 0;
document.getElementById("scoreBoard").innerText = "Score: 0";
document.getElementById("highScoreBoard").innerText = "High Score: " + highScore;

  function updateLeaderboard(name, score) {
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5); // top 5

  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  leaderboard.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.score}`;
    list.appendChild(li);
  });
}

