// Confetti Animation
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

class Confetto {
    constructor() {
        this.reset();
        this.y = Math.random() * confettiCanvas.height;
    }
    
    reset() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 1.5 + 0.8;
        this.speedX = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        
        const colors = ['#ff6b9d', '#c06c84', '#f67280', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#00d2d3'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > confettiCanvas.height) {
            this.reset();
        }
        
        if (this.x < -20 || this.x > confettiCanvas.width + 20) {
            this.x = Math.random() * confettiCanvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

let confetti = [];
let confettiActive = false;

function startConfetti() {
    confettiActive = true;
    confetti = [];
    for (let i = 0; i < 150; i++) {
        confetti.push(new Confetto());
    }
    animateConfetti();
}

function stopConfetti() {
    confettiActive = false;
    confetti = [];
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

function animateConfetti() {
    if (!confettiActive) return;
    
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confetti.forEach(confetto => {
        confetto.update();
        confetto.draw();
    });
    
    requestAnimationFrame(animateConfetti);
}

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Export functions
window.startConfetti = startConfetti;
window.stopConfetti = stopConfetti;
