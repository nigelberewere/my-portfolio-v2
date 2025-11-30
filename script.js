// Initialize Icons
lucide.createIcons();

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-item').forEach((el) => {
    observer.observe(el);
});

// Flashlight / Spotlight Effect Logic
document.querySelectorAll('.spotlight-group').forEach(group => {
    group.addEventListener('mousemove', (e) => {
        const rect = group.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        group.style.setProperty('--mouse-x', `${x}px`);
        group.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Typewriter Effect
const textLines = [
    "> Full-Stack Developer based in Zimbabwe.",
    "> Building reliable web & mobile applications from concept to launch."
];

const typeWriterElement = document.getElementById('typewriter');
let lineIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (lineIndex < textLines.length) {
        if (charIndex < textLines[lineIndex].length) {
            typeWriterElement.innerHTML += textLines[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 30); // Typing speed
        } else {
            if (lineIndex < textLines.length - 1) {
                typeWriterElement.innerHTML += "<br>";
            }
            lineIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 400); // Pause between lines
        }
    }
}

// Start typing after initial animations
setTimeout(typeWriter, 1000);

// Lottie Animation Control: Play once, then yoyo loop last 3s
const lottiePlayer = document.getElementById('hello-world-lottie');

function setupLottie(lottie) {
    const totalFrames = lottie.totalFrames;
    const frameRate = lottie.frameRate;
    // Calculate frames for 3 seconds
    const loopDurationFrames = frameRate * 3; 
    const startLoopFrame = totalFrames - loopDurationFrames;
    
    let isLooping = false;
    let nextDirection = 'forward'; // After the first reverse, we go forward

    // Listen to the lottie instance directly for precise segment control
    lottie.addEventListener('complete', () => {
        if (!isLooping) {
            isLooping = true;
            // Initial run finished. We are at the end.
            // Start the yoyo by reversing from End to Start of loop.
            lottie.playSegments([totalFrames, startLoopFrame], true);
        } else {
            // A loop segment finished. Toggle direction.
            if (nextDirection === 'forward') {
                lottie.playSegments([startLoopFrame, totalFrames], true);
                nextDirection = 'backward';
            } else {
                lottie.playSegments([totalFrames, startLoopFrame], true);
                nextDirection = 'forward';
            }
        }
    });
}

if (lottiePlayer) {
    // Check if lottie is already loaded
    if (lottiePlayer.getLottie && lottiePlayer.getLottie()) {
        setupLottie(lottiePlayer.getLottie());
    } else {
        lottiePlayer.addEventListener('ready', () => {
            setupLottie(lottiePlayer.getLottie());
        });
    }
}

// Particles.js Configuration - "Digital Dust" Spotlight Effect
if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 160,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#ffffff", "#10b981", "#A26135"] 
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.4, 
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false 
            },
            "move": {
                "enable": true,
                "speed": 0.6,
                "direction": "top",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 200,
                    "size": 6,
                    "duration": 0.4,
                    "opacity": 1,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}
