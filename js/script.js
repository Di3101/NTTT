// Main JavaScript - Birthday Website Controller

// Password Check Function
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const passwordScreen = document.getElementById('passwordScreen');
    const correctPassword = '310105';
    
    if (passwordInput.value === correctPassword) {
        // Correct password
        passwordError.textContent = '✓ Đúng rồi! Đang mở...';
        passwordError.style.color = '#2ecc71';
        
        setTimeout(() => {
            passwordScreen.classList.add('hidden');
        }, 800);
    } else {
        // Wrong password
        passwordError.textContent = '✗ Sai rồi! Thử lại nhé 💔';
        passwordError.style.color = '#ff4757';
        passwordInput.value = '';
        passwordInput.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
        // Auto focus on password input
        passwordInput.focus();
    }
});

let currentSection = 0;
const sections = document.querySelectorAll('.section');
const loadingScreen = document.getElementById('loadingScreen');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let musicPlaying = false;

// Initialize on page load
window.addEventListener('load', () => {
    initializeWebsite();
});

function initializeWebsite() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        showSection(0);
        
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        
        // Initialize Particles with heart effect
        initializeParticles();
        
        // Set current date
        setCurrentDate();
    }, 2000);
}

function setCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = today.toLocaleDateString('vi-VN', options);
    }
}

function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ff6b9d', '#c06c84', '#f67280', '#feca57']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 150,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ff6b9d', '#ff9a9e', '#ffc3f0', '#fecfef']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.3,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

function startExperience() {
    // Play music
    playMusic();
    
    // Move to next section
    nextSection();
}

function showSection(index) {
    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    currentSection = index;
    
    // Special effects for certain sections
    // Disabled confetti
}

function nextSection() {
    if (currentSection < sections.length - 1) {
        currentSection++;
        showSection(currentSection);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function restartExperience() {
    currentSection = 0;
    showSection(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset gift box
    const giftBox = document.getElementById('giftBox');
    const giftReveal = document.getElementById('giftReveal');
    if (giftBox && giftReveal) {
        giftBox.classList.remove('open');
        giftReveal.classList.remove('show');
    }
}

// Music Controls
function playMusic() {
    if (bgMusic && !musicPlaying) {
        bgMusic.play().catch(err => {
            console.log('Music autoplay blocked:', err);
        });
        musicPlaying = true;
        musicToggle.classList.remove('muted');
    }
}

function pauseMusic() {
    if (bgMusic && musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
        musicToggle.classList.add('muted');
    }
}

musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Gift Box Animation
function openGift() {
    console.log('openGift called');
    const giftBox = document.getElementById('giftBox');
    const giftReveal = document.getElementById('giftReveal');
    
    console.log('giftBox:', giftBox);
    console.log('giftReveal:', giftReveal);
    
    if (giftBox && giftReveal) {
        giftBox.classList.add('open');
        console.log('Opening gift...');
        
        // Show reveal after animation
        setTimeout(() => {
            giftReveal.classList.add('show');
            console.log('Initializing 3D Galaxy...');
            
            // Use Three.js 3D Galaxy instead of 2D canvas
            if (typeof initGalaxy3D === 'function') {
                initGalaxy3D();
            } else {
                console.error('initGalaxy3D not found, using fallback');
                initGalaxy();
                animateOrbitingPhotos();
            }
        }, 600);
    } else {
        console.error('Gift elements not found!');
    }
}

// Make sure openGift is globally accessible
window.openGift = openGift;

// Galaxy Animation
function initGalaxy() {
    const canvas = document.getElementById('galaxyCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create stars for galaxy
    const stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            opacity: Math.random(),
            speed: Math.random() * 0.5 + 0.2
        });
    }
    
    // Create galaxy particles
    const galaxyParticles = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < 300; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 400 + 200;
        const thickness = Math.random() * 100;
        
        galaxyParticles.push({
            angle: angle,
            distance: distance,
            thickness: thickness,
            size: Math.random() * 3,
            speed: Math.random() * 0.01,
            color: ['#ff6b9d', '#c06c84', '#feca57', '#48dbfb', '#ff9ff3'][Math.floor(Math.random() * 5)]
        });
    }
    
    function drawGalaxy() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            star.opacity += star.speed * 0.01;
            if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
        });
        
        // Draw galaxy particles
        galaxyParticles.forEach(particle => {
            particle.angle += particle.speed;
            
            const x = centerX + Math.cos(particle.angle) * particle.distance + Math.sin(particle.angle * 3) * particle.thickness;
            const y = centerY + Math.sin(particle.angle) * particle.distance * 0.5 + Math.cos(particle.angle * 3) * particle.thickness * 0.5;
            
            ctx.beginPath();
            ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = 0.6;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
        
        requestAnimationFrame(drawGalaxy);
    }
    
    drawGalaxy();
}

// Animate Orbiting Photos
function animateOrbitingPhotos() {
    const container = document.getElementById('orbitContainer');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create many photos (20-30 photos)
    const photoCount = 25;
    const photos = [];
    const photoSources = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg'];
    
    for (let i = 0; i < photoCount; i++) {
        const img = document.createElement('img');
        img.src = `images/${photoSources[i % photoSources.length]}`;
        img.className = 'orbit-photo';
        img.dataset.angle = (i / photoCount) * 360;
        img.dataset.layer = Math.floor(i / 5); // 5 layers
        container.appendChild(img);
        photos.push(img);
    }
    
    // Animate orbit ball
    const orbitBall = document.getElementById('orbitBall');
    
    function updatePositions() {
        const time = Date.now() * 0.0003;
        
        // Update orbit ball position
        if (orbitBall) {
            const ballAngle = time * 2;
            const ballX = centerX + Math.cos(ballAngle) * 300;
            const ballY = centerY + Math.sin(ballAngle) * 150;
            orbitBall.style.left = ballX + 'px';
            orbitBall.style.top = ballY + 'px';
            orbitBall.style.transform = 'translate(-50%, -50%)';
        }
        
        // Update photos in horizontal bands
        photos.forEach((photo, index) => {
            const startAngle = parseFloat(photo.dataset.angle) * (Math.PI / 180);
            const layer = parseInt(photo.dataset.layer);
            const angle = startAngle + time;
            
            // Create horizontal bands at different distances
            const radiusX = 250 + layer * 80 + Math.sin(time + index) * 30;
            const radiusY = 120 + layer * 40 + Math.cos(time + index) * 15;
            
            const x = centerX + Math.cos(angle) * radiusX;
            const y = centerY + Math.sin(angle) * radiusY;
            
            photo.style.left = x + 'px';
            photo.style.top = y + 'px';
            photo.style.transform = 'translate(-50%, -50%)'; // No rotation, keep upright
        });
        
        requestAnimationFrame(updatePositions);
    }
    
    updatePositions();
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
        nextSection();
    } else if (e.key === 'ArrowLeft') {
        if (currentSection > 0) {
            currentSection--;
            showSection(currentSection);
        }
    }
});

// Photo Gallery - Click to enlarge
document.querySelectorAll('.gallery-photo').forEach(photo => {
    photo.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = this.src;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

// Prevent right-click on images (optional - to protect photos)
document.querySelectorAll('.gallery-photo').forEach(photo => {
    photo.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});

// Add floating hearts animation on click
document.addEventListener('click', (e) => {
    createFloatingHeart(e.clientX, e.clientY);
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        animation: floatUp 2s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Add CSS for floating heart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console surprise message
console.log('%c💖 Chúc mừng sinh nhật em yêu! 💖', 'font-size: 30px; color: #ff6b9d; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cWebsite này được làm với tất cả tình yêu dành cho em! ❤️', 'font-size: 16px; color: #c06c84;');
// ==================== SCRATCH CARD FUNCTIONALITY ====================
let scratchCanvas, scratchCtx;
let isScratching = false;
let scratchPercentage = 0;
let photoSlideInterval;
let currentPhotoIndex = 0;

function initScratchCard() {
    scratchCanvas = document.getElementById('scratchCanvas');
    if (!scratchCanvas) return;
    
    scratchCtx = scratchCanvas.getContext('2d');
    const container = scratchCanvas.parentElement;
    
    // Set canvas size
    scratchCanvas.width = container.offsetWidth;
    scratchCanvas.height = container.offsetHeight;
    
    // Create gradient background for scratch layer
    const gradient = scratchCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    gradient.addColorStop(0, '#ff9a9e');
    gradient.addColorStop(0.5, '#fecfef');
    gradient.addColorStop(1, '#ffc3f0');
    
    scratchCtx.fillStyle = gradient;
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    
    // Add text overlay
    scratchCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    scratchCtx.font = 'bold 24px Arial';
    scratchCtx.textAlign = 'center';
    scratchCtx.fillText('💕 Kỷ Niệm 💕', scratchCanvas.width / 2, scratchCanvas.height / 2 - 20);
    scratchCtx.fillText('Của Chúng Mình', scratchCanvas.width / 2, scratchCanvas.height / 2 + 20);
    
    // Set up scratch events
    scratchCanvas.addEventListener('mousedown', startScratch);
    scratchCanvas.addEventListener('mousemove', scratch);
    scratchCanvas.addEventListener('mouseup', stopScratch);
    scratchCanvas.addEventListener('mouseleave', stopScratch);
    
    // Touch events
    scratchCanvas.addEventListener('touchstart', startScratch);
    scratchCanvas.addEventListener('touchmove', scratch);
    scratchCanvas.addEventListener('touchend', stopScratch);
}

function startScratch(e) {
    e.preventDefault();
    isScratching = true;
    const scratchHint = document.getElementById('scratchHint');
    if (scratchHint) scratchHint.classList.add('hidden');
    scratch(e);
}

function scratch(e) {
    if (!isScratching) return;
    e.preventDefault();
    
    const rect = scratchCanvas.getBoundingClientRect();
    let x, y;
    
    if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    
    // Scale coordinates
    x = (x / rect.width) * scratchCanvas.width;
    y = (y / rect.height) * scratchCanvas.height;
    
    // Scratch effect
    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.beginPath();
    scratchCtx.arc(x, y, 30, 0, Math.PI * 2);
    scratchCtx.fill();
    
    // Check scratch percentage
    checkScratchPercentage();
}

function stopScratch() {
    isScratching = false;
}

function checkScratchPercentage() {
    const imageData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparentPixels++;
    }
    
    scratchPercentage = (transparentPixels / (pixels.length / 4)) * 100;
    
    // If scratched more than 50%, reveal completely and start slideshow
    if (scratchPercentage > 50 && scratchCanvas.style.display !== 'none') {
        scratchCanvas.style.display = 'none';
        startPhotoSlideshow();
    }
}

function startPhotoSlideshow() {
    const photos = document.querySelectorAll('.scratch-photo');
    if (photos.length === 0) return;
    
    currentPhotoIndex = 0;
    
    photoSlideInterval = setInterval(() => {
        photos[currentPhotoIndex].classList.remove('active');
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        photos[currentPhotoIndex].classList.add('active');
    }, 3000); // Change photo every 3 seconds
}

// Initialize scratch card when section becomes active
function showSection(index) {
    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.add('active');
            
            // Initialize scratch card for memory section
            if (section.classList.contains('memory-section')) {
                setTimeout(() => initScratchCard(), 300);
            }
        } else {
            section.classList.remove('active');
        }
    });
    
    currentSection = index;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}