const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
let speed = 10;
let tileCount = 20;
document.querySelector(".btn").onclick = btn;
function btn() {
  let r = document.querySelector("select").value;
  speed = r;
}
const SnakeParts = [];
let tailLenth = 2;
let headX = 10;
let tileSize = canvas.width / tileCount - 2;
let headY = 10;
let appleX = 5;
let appleY = 5;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
function drawGame() {
  clearScreen();
  drawScore();
  drawSnake();
  let result = isGameOver();
  if (result) {
    return;
  }
  drawApple();
  checkAppleColision();
  changeSnakePosition();
  setTimeout(drawGame, 1000 / speed);
}
function isGameOver() {
  let gameOver = false;
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }
  if (headX < -1) {
    gameOver = true;
  } else if (headX >= tileCount) {
    gameOver = true;
  } else if (headY < -1) {
    gameOver = true;
  } else if (headY >= tileCount) {
    gameOver = true;
  }
  // for (let i = 0; i < SnakeParts.length; i++) {
  //   let part = SnakeParts[i];
  //   if (part.x === headX && part.y === headY) {
  //     gameOver = true;
  //     break;
  //   }
  // }
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";
      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", "magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      ctx.fillStyle = gradient;
    }
    // ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    let d = confirm(`Game Over. Your score ${score} .\n Begin at first?`);
    if (d == true) {
      document.querySelector(".record").innerText += `Your record is ${score}`;
    } else {
      ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
  }
 return gameOver
 
}
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score" + score, canvas.width - 50, 10);
}
function checkAppleColision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLenth++;
    score++;
  }
}
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}
function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < SnakeParts.length; i++) {
    let part = SnakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  SnakeParts.push(new SnakePart(headX, headY));
  while (SnakeParts.length > tailLenth) {
    SnakeParts.shift();
  }
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
  //up
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  //down
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  //left
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  // right
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}
drawGame()
