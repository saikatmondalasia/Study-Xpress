// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const isExpanded = mobileMenu.classList.contains('active');
    mobileToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Typing Effect
const typedTextSpan = document.getElementById("typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [ 
    "Banking Classes", 
    "Banking Coaching", 
    "IAS Coaching", 
    "SSC CGL Coaching", 
    "Railway Coaching"
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
    
    // Initialize Particles
    initParticles();
});

// Form Submission
const enrollmentForm = document.getElementById('enrollmentForm');
const formMessage = document.getElementById('formMessage');

enrollmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple validation feedback
    formMessage.textContent = "Thank you! Your application has been received. Our team will contact you shortly.";
    formMessage.style.color = "#16a34a"; // Green
    enrollmentForm.reset();
    
    setTimeout(() => {
        formMessage.textContent = "";
    }, 5000);
});

// Particles System (Confetti/Stars Effect)
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    let width, height, particles;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            
            // Random color from palette: amber, cream, light indigo
            const colors = ['#f59e0b', '#fefce8', '#a5b4fc', '#4338ca'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Allow some particles to be rotated squares (diamonds/stars)
            this.shape = Math.random() > 0.5 ? 'circle' : 'star';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Screen wrap
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            
            if (this.shape === 'circle') {
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Draw a small 4-point star/diamond
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(Math.PI / 4);
                ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
                ctx.restore();
            }
        }
    }
    
    // Create particles based on screen width
    function init() {
        particles = [];
        let numParticles = width < 768 ? 40 : 100;
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}
