const noBtn = document.getElementById('no-btn');
const noBtnStep2 = document.getElementById('no-btn-step2');
const yesBtn = document.getElementById('yes-btn');
const emojiDisplay = document.getElementById('emoji-display').querySelector('.emoji');
const celebrationOverlay = document.getElementById('celebration-overlay');
const celebrationMsg = document.getElementById('celebration-msg');
const celebrationSubMsg = document.getElementById('celebration-sub-msg');
const particlesContainer = document.getElementById('particles-container');
const pleadingMsg = document.getElementById('pleading-msg');
const storyPage = document.getElementById('story-page');
const finalThankYou = document.getElementById('final-thank-you');

let noClickAttempts = 0;

// Moving "No" button logic (Main)
noBtn.addEventListener('mouseover', () => {
    handleNoAttempt(noBtn);
});

noBtn.addEventListener('click', () => {
    handleNoAttempt(noBtn);
});

// Moving "No" button logic (Step 2)
if (noBtnStep2) {
    noBtnStep2.addEventListener('mouseover', () => {
        handleNoAttempt(noBtnStep2);
    });

    noBtnStep2.addEventListener('click', () => {
        handleNoAttempt(noBtnStep2);
    });
}

function handleNoAttempt(targetBtn) {
    noClickAttempts++;
    moveButtonRandomly(targetBtn);

    if (noClickAttempts >= 3 && targetBtn === noBtn) {
        pleadingMsg.classList.add('active');
        yesBtn.classList.add('pulse');
    }

    updateEmoji('😅');
}

function moveButtonRandomly(btn) {
    const padding = 20;
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.zIndex = '1000';
}

function updateEmoji(emoji) {
    emojiDisplay.innerText = emoji;
    emojiDisplay.style.animation = 'none';
    emojiDisplay.offsetHeight;
    emojiDisplay.style.animation = 'floating 3s ease-in-out infinite';
}

// "Yes" Button logic
yesBtn.addEventListener('click', () => {
    celebrationOverlay.classList.add('active');
    celebrationMsg.innerText = "Yay! My heart is yours! 💖";
    celebrationSubMsg.innerText = "I promise to love you always.";

    triggerConfetti();
    startHeartRain();
    startChocolateRain();
    startComplimentShower();

    // Wait a bit before starting the story page
    setTimeout(() => {
        startStoryPage();
    }, 3000);
});

function startComplimentShower() {
    const container = document.getElementById('compliment-container');
    const compliments = [
        { text: "you're so Beautiful!!!", pos: { left: '10%', top: '15%' } },
        { text: "you are so Gorgeous !!!!", pos: { right: '10%', top: '45%' } },
        { text: "just looking like a WOWWWWW !!!!", pos: { left: '10%', bottom: '20%' } }
    ];

    compliments.forEach((item, index) => {
        setTimeout(() => {
            const text = document.createElement('div');
            text.className = 'floating-compliment';
            text.innerText = item.text;

            // Apply fixed positions
            if (item.pos.left) text.style.left = item.pos.left;
            if (item.pos.right) text.style.right = item.pos.right;
            if (item.pos.top) text.style.top = item.pos.top;
            if (item.pos.bottom) text.style.bottom = item.pos.bottom;

            text.style.fontSize = '2.5rem';
            text.style.animationDuration = '6s';

            container.appendChild(text);

            // Keep them visible for a while then remove
            setTimeout(() => text.remove(), 7000);
        }, index * 800);
    });
}

function startStoryPage() {
    celebrationSubMsg.classList.add('hidden');
    storyPage.classList.remove('hidden');
    updateLoveMeter(25); // Step 1 = 25%
}

function updateLoveMeter(percentage) {
    const meterFill = document.getElementById('progressive-meter-fill');
    const meterPercent = document.getElementById('progressive-meter-percent');

    if (meterFill && meterPercent) {
        meterFill.style.width = percentage + '%';
        meterPercent.innerText = percentage + '%';
    }
}

function nextStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('hidden');
        step.classList.remove('active');
    });

    // Show the target step
    const targetStep = document.getElementById(`step-${stepNumber}`);
    if (targetStep) {
        targetStep.classList.remove('hidden');
        // Small delay to trigger animation if needed
        setTimeout(() => targetStep.classList.add('active'), 10);
    }

    // Update love meter based on step
    const meterValues = { 2: 50, 3: 75, 4: 100 };
    if (meterValues[stepNumber]) {
        updateLoveMeter(meterValues[stepNumber]);
    }
}

function finishSequence() {
    storyPage.classList.add('hidden');
    celebrationMsg.classList.add('hidden');
    finalThankYou.classList.remove('hidden');

    // Animate Love Meter
    setTimeout(() => {
        const loveFill = document.getElementById('love-fill');
        if (loveFill) loveFill.style.width = '100%';
    }, 500);

    // Final mega celebration
    for (let i = 0; i < 5; i++) {
        setTimeout(triggerConfetti, i * 500);
    }
}

function triggerConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Background Floating Hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';

    particlesContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 500);

function startHeartRain() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.zIndex = '1000';
        document.body.appendChild(heart);
    }, 100);
}

function startChocolateRain() {
    const chocolates = ['🍫', '🍩', '🍪', '🍬', '🍭'];
    setInterval(() => {
        const choc = document.createElement('div');
        choc.classList.add('chocolate');
        choc.innerHTML = chocolates[Math.floor(Math.random() * chocolates.length)];
        choc.style.left = Math.random() * 100 + 'vw';
        choc.style.fontSize = Math.random() * 20 + 20 + 'px';
        choc.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.body.appendChild(choc);

        setTimeout(() => choc.remove(), 4000);
    }, 200);
}

// FLAMES Game Logic
function calculateFlames() {
    const name1 = document.getElementById('name1').value.trim().toLowerCase().replace(/\s/g, '');
    const name2 = document.getElementById('name2').value.trim().toLowerCase().replace(/\s/g, '');

    if (!name1 || !name2) {
        alert("Please enter both names! ✨");
        return;
    }

    let n1 = name1.split('');
    let n2 = name2.split('');

    for (let i = 0; i < n1.length; i++) {
        for (let j = 0; j < n2.length; j++) {
            if (n1[i] === n2[j]) {
                n1[i] = "";
                n2[j] = "";
                break;
            }
        }
    }

    const count = n1.join('').length + n2.join('').length;
    let flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let index = 0;

    while (flames.length > 1) {
        index = (index + count - 1) % flames.length;
        if (index < 0) index = flames.length - 1;
        flames.splice(index, 1);
    }

    const resultChar = flames[0];
    const mappings = {
        'F': 'Forever to you 💍✨',
        'L': 'Love ❤️🔥',
        'A': 'I will marry u as Arrange Marriage 🤝💒',
        'M': 'Marriage 👰‍♀️🤵‍♂️',
        'E': 'Evergreen love 🌿💕',
        'S': 'i will marry u and make M not s ✨💍'
    };

    const resultContainer = document.getElementById('flames-result');
    const resultText = document.getElementById('flames-text');

    resultText.innerText = mappings[resultChar];
    resultContainer.classList.remove('hidden');

    // Trigger extra confetti on a "good" result
    if (resultChar === 'F' || resultChar === 'L' || resultChar === 'M') {
        triggerConfetti();
    }
}
