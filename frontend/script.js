//  ACTIVE NAV LINK LOGIC
const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
  link.addEventListener("click", function () {
    links.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});


//  TYPING EFFECT (fixed + safe)
const text = "Hire Smarter with AI-Powered Recruitment";
let index = 0;

function typeEffect() {
  const el = document.getElementById("typing");
  if (!el) return;

  el.innerHTML = ""; // reset text

  function type() {
    if (index < text.length) {
      el.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, 40);
    }
  }

  type();
}

window.onload = typeEffect;


//  PARTICLES EFFECT
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "#00eaff";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00eaff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// CREATE PARTICLES
function init() {
  particlesArray = []; // reset
  for (let i = 0; i < 120; i++) {
    particlesArray.push(new Particle());
  }
}

// ANIMATION LOOP (optimized)
let lastTime = 0;

function animate(time) {
  if (time - lastTime > 16) { // ~60fps
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });

    lastTime = time;
  }

  requestAnimationFrame(animate);
}

// INIT
init();
animate();

//  HANDLE RESIZE (fixed)
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init(); // recreate particles
});