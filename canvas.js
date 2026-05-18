const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//==== APPLICATION STAGE ====
let ball1 = {
  x: 100,
  y: 100,
  radius: 35,
  dx: 4,
  dy: 3,
  color: "cyan"
};

let ball2 = {
  x: 700,
  y: 200,
  radius: 30,
  dx: -3,
  dy: 4,
  color: "orange"
};

let rect = {
  x: 300,
  y: 350,
  width: 180,
  height: 80,
  speed: 3
};

let stars = [];

for (let i = 0; i < 80; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    speed: Math.random() * 1
  });
}

function drawStars() {

  //==== RASTERIZATION STAGE ====
  ctx.fillStyle = "white";

  stars.forEach((star) => {

    //==== GEOMETRY STAGE ====
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

    //==== RASTERIZATION STAGE ====
    ctx.fill();

    //==== APPLICATION STAGE ====
    star.y += star.speed;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function drawBall(ball) {
  
  //==== RASTERIZATION STAGE ====
  ctx.shadowBlur = 20;
  ctx.shadowColor = ball.color;

  //==== GEOMETRY STAGE ====
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

  //==== RASTERIZATION STAGE ====
  ctx.fillStyle = ball.color;
  ctx.fill();

  ctx.closePath();

  ctx.shadowBlur = 0;
}

function animate() {

  //==== RASTERIZATION STAGE ====
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStars();

  //==== APPLICATION STAGE ====
  ball1.x += ball1.dx;
  ball1.y += ball1.dy;

  ball2.x += ball2.dx;
  ball2.y += ball2.dy;

  rect.x += rect.speed;

  [ball1, ball2].forEach(ball => {

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx *= -1;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.dy *= -1;
    }
  });

  if (rect.x + rect.width > canvas.width || rect.x < 0) {
    rect.speed *= -1;
  }
  
  drawBall(ball1);
  drawBall(ball2);

  //==== RASTERIZATION STAGE ====
  let gradient = ctx.createLinearGradient(
    rect.x,
    rect.y,
    rect.x + rect.width,
    rect.y + rect.height
  );

  gradient.addColorStop(0, "#ff4d4d");
  gradient.addColorStop(1, "#8000ff");

  ctx.fillStyle = gradient;
  
  //==== GEOMETRY STAGE ====
  ctx.beginPath();
  ctx.roundRect(rect.x, rect.y, rect.width, rect.height, 20);

  //==== RASTERIZATION STAGE ====
  ctx.fill();

  ctx.font = "26px Arial";
  ctx.fillStyle = "white";

  ctx.fillText(
    "HTML5 Canvas Multimedia Animation",
    220,
    50
  );

  ctx.font = "16px Arial";
  ctx.fillStyle = "#bbbbbb";

  ctx.fillText(
    "Application • Geometry • Rasterization",
    300,
    80
  );

  //==== APPLICATION STAGE ====
  requestAnimationFrame(animate);
}

animate();