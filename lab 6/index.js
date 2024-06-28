const ball = document.getElementById('ball');
const hole = document.getElementById('hole');
const scoreDisplay = document.getElementById('score');
const gameArea = document.getElementById('gameArea');
let score = 0;
let startTime = Date.now();
let gameDuration = 60000;

function getRandomPosition(element) {
    const x = Math.floor(Math.random() * (gameArea.clientWidth - element.clientWidth));
    const y = Math.floor(Math.random() * (gameArea.clientHeight - element.clientHeight));
    return { x, y };
}

function moveElementToRandomPosition(element) {
    const position = getRandomPosition(element);
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
}

    function isCollision(ball, hole) {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();
    return !(ballRect.right < holeRect.left || 
        ballRect.left > holeRect.right || 
        ballRect.bottom < holeRect.top || 
        ballRect.top > holeRect.bottom);
}

function updateScore() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    moveElementToRandomPosition(ball);
    moveElementToRandomPosition(hole);
    startTime = Date.now();
}

function checkGameEnd() {
    if (Date.now() - startTime >= gameDuration) {
        alert(`Time's up! Your score is ${score}`);
        resetGame();
    }
}

window.addEventListener('deviceorientation', function(event) {
    const x = event.gamma;
    const y = event.beta;
    const maxTilt = 30;
    const ballSpeed = 15;

    let newX = parseFloat(ball.style.left || 0) + (x / maxTilt) * ballSpeed;
    let newY = parseFloat(ball.style.top || 0) + (y / maxTilt) * ballSpeed;

    if (newX < 0) newX = 0;
    if (newX > gameArea.clientWidth - ball.clientWidth) newX = gameArea.clientWidth - ball.clientWidth;
    if (newY < 0) newY = 0;
    if (newY > gameArea.clientHeight - ball.clientHeight) newY = gameArea.clientHeight - ball.clientHeight;

    ball.style.left = `${newX}px`;
    ball.style.top = `${newY}px`;

    if (isCollision(ball, hole)) {
        updateScore();
        moveElementToRandomPosition(hole);
    }

    checkGameEnd();
});

moveElementToRandomPosition(ball);
moveElementToRandomPosition(hole);