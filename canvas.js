const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let ballX = 100;
let ballY = 100;
let ballRadius = 40;
let ballSpeedX = 4;
let ballSpeedY = 3;

let rectX = 300;
let rectY = 320;
let rectWidth = 150;
let rectHeight = 80;
let rectSpeed = 2;

function animate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  rectX += rectSpeed;
  
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (rectX + rectWidth > canvas.width || rectX < 0) {
    rectSpeed = -rectSpeed;
  }

  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = "red";
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

  ctx.font = "22px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("HTML5 Canvas Graphics Pipeline Demo", 220, 40);

  requestAnimationFrame(animate);
}

animate();