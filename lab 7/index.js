const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const numBallsInput = document.getElementById('numBalls');
const distanceInput = document.getElementById('distance');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

let balls = [];
let animationId;
let mouse = { x: 0, y: 0 };
let force = 0.05;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ball {
    constructor(x, y, vx, vy, radius) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.vy = -this.vy;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force;
            this.vy += Math.sin(angle) * force;
        }
    }
}

function createBalls() {
    balls = [];
    const numBalls = parseInt(numBallsInput.value);
    for (let i = 0; i < numBalls; i++) {
        const radius = 10;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;
        balls.push(new Ball(x, y, vx, vy, radius));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();

        for (let j = i + 1; j < balls.length; j++) {
            const dx = balls[i].x + balls[i].vx - balls[j].x - balls[j].vx;
            const dy = balls[i].y + balls[i].vy - balls[j].y - balls[j].vy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < parseInt(distanceInput.value)) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    animationId = requestAnimationFrame(animate);
}
