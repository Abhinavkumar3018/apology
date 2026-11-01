// --- Sweet Notes Database for Babba's Jar ---
const sweetNotes = [
  "You make even the most ordinary moments feel like pure magic. ✨",
  "Your smile is my favorite thing in this entire universe. 🌸",
  "I am so proud to have you as my girlfriend, Babba. 💖",
  "Thank you for being so patient with me even when I'm silly and overthinking. 🥺",
  "No matter how tough life gets, holding your hand makes everything okay. 🤝",
  "You are effortlessly gorgeous, inside and out. 💎",
  "I fall a little more in love with you every single day. 🌷",
  "Your laugh is my absolute favorite sound in the world. 🎶",
  "You are my safe haven and my happiest home. 🏡",
  "I promise to always listen, learn, and love you better each day. ❤️",
  "You're not just my girl, you're my best friend and favorite person. 🧸",
  "Thank you for making my heart feel so full. 💌",
  "Whenever I look at you, I still can't believe how lucky I got. 💍",
  "No fight or insecurity will ever be stronger than my love for you. 🌹",
  "Your hugs are the warmest, coziest medicine in the world. 🫂",
  "You look cute in literally everything you wear. Yes, even oversized tees! 🌸",
  "I love how passionate and sweet your heart is. 💕",
  "Sending you 1,000,000 forehead kisses right this second. 💋",
  "Thank you for existing, Babba. You are a true blessing in my life. ✨",
  "Whatever is on your mind, I am always here to listen and hold you. 💖"
];

// --- No-Button Tease Lines ---
const noButtonTexts = [
  "No 😤",
  "Wait, please? 🥺",
  "Are you sure? Look at my puppy eyes!",
  "Can't click me! 😜",
  "Pretty please with ice cream? 🍨",
  "I promise unlimited cuddles! 🫂",
  "Just click Yes, Babba! 👉👈",
  "Think of all the snacks! 🍫",
  "Okay, what about a back massage? 💆‍♀️",
  "You know you love me! 🥰"
];
let noButtonAttempt = 0;

// ==========================================================================
// 1. FLOATING HEARTS BACKGROUND CANVAS
// ==========================================================================
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];
const heartColors = ['#ff8da1', '#ffb6c1', '#f8bbd0', '#ffd1dc', '#f48fb1', '#ff4d6d'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FloatingHeart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20 + Math.random() * 50;
    this.size = Math.random() * 14 + 10;
    this.speed = Math.random() * 0.9 + 0.4;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    this.swing = Math.random() * 2;
    this.swingSpeed = Math.random() * 0.02 + 0.01;
    this.angle = 0;
  }

  update() {
    this.y -= this.speed;
    this.angle += this.swingSpeed;
    this.x += Math.sin(this.angle) * this.swing;

    if (this.y < -30) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    
    ctx.beginPath();
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
    ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, (this.size + topCurveHeight) / 1.4, 0, this.size);
    ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 1.4, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
    ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 35; i++) {
  const h = new FloatingHeart();
  h.y = Math.random() * canvas.height;
  hearts.push(h);
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].update();
    hearts[i].draw();
  }
  requestAnimationFrame(animateHearts);
}
animateHearts();

// ==========================================================================
// 2. ROMANTIC WEB AUDIO SYNTHESIZER
// ==========================================================================
class RomanticAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.loopTimer = null;
    this.volume = 0.22;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(frequency, duration = 1.6, delay = 0) {
    if (!this.ctx || !this.isPlaying) return;
    
    const startTime = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(this.volume, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playChimeEffect() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = this.ctx.currentTime + idx * 0.09;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, st);
      gain.gain.setValueAtTime(0.001, st);
      gain.gain.linearRampToValueAtTime(0.2, st + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, st + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.7);
    });
  }

  playHeartPop() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const st = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, st);
    osc.frequency.exponentialRampToValueAtTime(880.00, st + 0.15);
    gain.gain.setValueAtTime(0.18, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.2);
  }

  startMelody() {
    this.init();
    this.isPlaying = true;
    
    const melody = [
      { f: 261.63, d: 0.0 }, { f: 329.63, d: 0.5 }, { f: 392.00, d: 1.0 }, { f: 493.88, d: 1.5 },
      { f: 523.25, d: 2.0 }, { f: 392.00, d: 2.5 }, { f: 329.63, d: 3.0 }, { f: 261.63, d: 3.5 },
      { f: 220.00, d: 4.0 }, { f: 261.63, d: 4.5 }, { f: 329.63, d: 5.0 }, { f: 392.00, d: 5.5 },
      { f: 440.00, d: 6.0 }, { f: 329.63, d: 6.5 }, { f: 261.63, d: 7.0 }, { f: 220.00, d: 7.5 },
      { f: 174.61, d: 8.0 }, { f: 261.63, d: 8.5 }, { f: 329.63, d: 9.0 }, { f: 349.23, d: 9.5 },
      { f: 440.00, d: 10.0 }, { f: 349.23, d: 10.5 }, { f: 261.63, d: 11.0 }, { f: 174.61, d: 11.5 },
      { f: 196.00, d: 12.0 }, { f: 293.66, d: 12.5 }, { f: 392.00, d: 13.0 }, { f: 493.88, d: 13.5 },
      { f: 392.00, d: 14.0 }, { f: 293.66, d: 14.5 }, { f: 246.94, d: 15.0 }, { f: 196.00, d: 15.5 },
    ];

    const loopLength = 16.0;

    const playLoop = () => {
      if (!this.isPlaying) return;
      melody.forEach(note => {
        this.playNote(note.f, 1.4, note.d);
      });
      this.loopTimer = setTimeout(playLoop, loopLength * 1000);
    };

    playLoop();
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stopMelody();
      return false;
    } else {
      this.startMelody();
      return true;
    }
  }
}

const audioPlayer = new RomanticAudio();

// ==========================================================================
// 3. LOGIN & PASSWORD GATEWAY LOGIC
// ==========================================================================
const loginOverlay = document.getElementById('loginOverlay');
const mainContent = document.getElementById('mainContent');
const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const loginFeedback = document.getElementById('loginFeedback');
const unlockBtn = document.getElementById('unlockBtn');
const hintBtn = document.getElementById('hintBtn');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');
const lockBtn = document.getElementById('lockBtn');

togglePasswordBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePasswordBtn.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    togglePasswordBtn.textContent = '👁️';
  }
});

hintBtn.addEventListener('click', () => {
  loginFeedback.className = 'login-feedback';
  loginFeedback.textContent = 'Hint: What is your sweetest nickname? (5 letters) 🧸';
});

function checkPassword() {
  const entered = passwordInput.value.trim();
  
  if (!entered) {
    loginFeedback.className = 'login-feedback error';
    loginFeedback.textContent = 'Please enter the secret passcode! 🥺';
    passwordInput.focus();
    return;
  }

  if (entered.toLowerCase() === 'babba') {
    loginFeedback.className = 'login-feedback success';
    loginFeedback.textContent = 'Welcome, my beloved Babba! Unlocking... 💕';
    
    audioPlayer.playChimeEffect();
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 40);

    setTimeout(() => {
      loginOverlay.classList.add('hidden');
      mainContent.classList.remove('hidden');
      sessionStorage.setItem('babba_unlocked', 'true');
      
      audioPlayer.startMelody();
      updateMusicUI(true);
    }, 700);
  } else {
    loginFeedback.className = 'login-feedback error';
    loginFeedback.textContent = 'Incorrect passcode! Only Babba knows the secret 🥺❤️';
    passwordInput.value = '';
    passwordInput.focus();
  }
}

unlockBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkPassword();
  }
});

lockBtn.addEventListener('click', () => {
  sessionStorage.removeItem('babba_unlocked');
  audioPlayer.stopMelody();
  updateMusicUI(false);
  loginOverlay.classList.remove('hidden');
  mainContent.classList.add('hidden');
  passwordInput.value = '';
  loginFeedback.textContent = '';
});

function updateMusicUI(isPlaying) {
  if (isPlaying) {
    musicIcon.textContent = '🎵';
    musicText.textContent = 'Music: On';
    musicToggleBtn.style.borderColor = '#ff4d6d';
  } else {
    musicIcon.textContent = '🔇';
    musicText.textContent = 'Music: Off';
    musicToggleBtn.style.borderColor = '#ffd0db';
  }
}

musicToggleBtn.addEventListener('click', () => {
  const isPlaying = audioPlayer.toggle();
  updateMusicUI(isPlaying);
});

if (sessionStorage.getItem('babba_unlocked') === 'true') {
  loginOverlay.classList.add('hidden');
  mainContent.classList.remove('hidden');
  document.addEventListener('click', function startAudioOnFirstInteraction() {
    if (!audioPlayer.isPlaying) {
      audioPlayer.startMelody();
      updateMusicUI(true);
    }
    document.removeEventListener('click', startAudioOnFirstInteraction);
  }, { once: true });
}

// ==========================================================================
// 4. ANIMATED WAX SEAL ENVELOPE
// ==========================================================================
const envelope = document.getElementById('envelope');
const openLetterBtn = document.getElementById('openLetterBtn');
const waxSeal = document.getElementById('waxSeal');

function toggleLetter() {
  audioPlayer.playChimeEffect();
  if (envelope.classList.contains('opened')) {
    envelope.classList.remove('opened');
    envelope.classList.add('closed');
    openLetterBtn.textContent = '✨ Click to Open Envelope ✨';
  } else {
    envelope.classList.remove('closed');
    envelope.classList.add('opened');
    openLetterBtn.textContent = '💌 Envelope Unsealed with Love';
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 25);
  }
}

waxSeal.addEventListener('click', toggleLetter);
openLetterBtn.addEventListener('click', toggleLetter);
envelope.classList.add('closed');

// ==========================================================================
// 5. POLAROID LIGHTBOX & HEART SHOWER
// ==========================================================================
const lightboxModal = document.getElementById('lightboxModal');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const showerHeartsBtn = document.getElementById('showerHeartsBtn');
const polaroids = document.querySelectorAll('.polaroid-card');

polaroids.forEach(card => {
  card.addEventListener('click', () => {
    const imgSrc = card.getAttribute('data-img');
    const caption = card.getAttribute('data-caption');
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption;
    lightboxModal.classList.add('active');
    audioPlayer.playHeartPop();
  });
});

function closeLightbox() {
  lightboxModal.classList.remove('active');
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

showerHeartsBtn.addEventListener('click', (e) => {
  const rect = showerHeartsBtn.getBoundingClientRect();
  burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);
  audioPlayer.playChimeEffect();
  showerHeartsBtn.textContent = '💖 100 Hearts Sent to Babba! 💖';
  setTimeout(() => {
    showerHeartsBtn.textContent = 'Shower More Hearts on Babba 💕';
  }, 1800);
});

// ==========================================================================
// 6. SWEET NOTES JAR
// ==========================================================================
const jarDisplay = document.getElementById('jarDisplay');
const jarNoteText = document.getElementById('jarNoteText');
const pickNoteBtn = document.getElementById('pickNoteBtn');

let lastNoteIndex = -1;

pickNoteBtn.addEventListener('click', () => {
  audioPlayer.playHeartPop();
  
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * sweetNotes.length);
  } while (randomIndex === lastNoteIndex && sweetNotes.length > 1);
  
  lastNoteIndex = randomIndex;
  const note = sweetNotes[randomIndex];

  jarDisplay.style.opacity = '0';
  jarDisplay.style.transform = 'scale(0.95)';

  setTimeout(() => {
    jarNoteText.textContent = `"${note}"`;
    jarDisplay.style.opacity = '1';
    jarDisplay.style.transform = 'scale(1)';
    const rect = pickNoteBtn.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top, 15);
  }, 220);
});

// ==========================================================================
// 7. APOLOGY VOUCHERS / COUPONS
// ==========================================================================
function loadClaimedCoupons() {
  try {
    const claimed = JSON.parse(localStorage.getItem('babba_coupons') || '[]');
    claimed.forEach(id => {
      const card = document.querySelector(`.coupon-card[data-coupon-id="${id}"]`);
      if (card) {
        card.classList.add('claimed');
        const btn = card.querySelector('.redeem-btn');
        if (btn) btn.textContent = 'CLAIMED FOR BABBA ✅';
      }
    });
  } catch (e) {
    console.error(e);
  }
}

window.redeemCoupon = function(couponId, title) {
  audioPlayer.playChimeEffect();
  
  try {
    const claimed = JSON.parse(localStorage.getItem('babba_coupons') || '[]');
    if (!claimed.includes(couponId)) {
      claimed.push(couponId);
      localStorage.setItem('babba_coupons', JSON.stringify(claimed));
    }
  } catch (e) {
    console.error(e);
  }

  const card = document.querySelector(`.coupon-card[data-coupon-id="${couponId}"]`);
  if (card) {
    card.classList.add('claimed');
    const btn = card.querySelector('.redeem-btn');
    if (btn) btn.textContent = 'CLAIMED FOR BABBA ✅';
    const rect = card.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
  }

  const message = `Hey sweetheart! I just redeemed my voucher: "${title}"! Can't wait! 💕`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(message);
    alert(`🎉 Voucher Claimed!\n\n"${title}" is officially yours!\n\nA sweet message has also been copied to your clipboard so you can send it to me right now! 🥰`);
  } else {
    alert(`🎉 Voucher Claimed!\n\n"${title}" is officially yours! Take a screenshot and send it to me anytime! 🥰`);
  }
};

loadClaimedCoupons();

// ==========================================================================
// 8. INTERACTIVE FORGIVE ME GAME
// ==========================================================================
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const forgiveArea = document.getElementById('forgiveArea');
const celebrationModal = document.getElementById('celebrationModal');
const closeCelebrationBtn = document.getElementById('closeCelebrationBtn');
const avatarEmoji = document.getElementById('avatarEmoji');

function evadeNoButton(e) {
  e.preventDefault();
  audioPlayer.playHeartPop();

  noButtonAttempt++;
  const nextText = noButtonTexts[noButtonAttempt % noButtonTexts.length];
  noBtn.textContent = nextText;

  if (noButtonAttempt > 3) {
    avatarEmoji.textContent = '🥺😭🙏';
  } else {
    avatarEmoji.textContent = '🥺👉👈';
  }

  const currentScale = 1 + Math.min(noButtonAttempt * 0.08, 0.6);
  yesBtn.style.transform = `scale(${currentScale})`;

  const areaRect = forgiveArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxOffsetX = Math.min(180, areaRect.width / 2 - btnRect.width / 2);
  const maxOffsetY = 70;

  const randomX = (Math.random() - 0.5) * 2 * maxOffsetX;
  const randomY = (Math.random() - 0.5) * 2 * maxOffsetY;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

noBtn.addEventListener('mouseenter', evadeNoButton);
noBtn.addEventListener('touchstart', evadeNoButton, { passive: false });
noBtn.addEventListener('click', evadeNoButton);

yesBtn.addEventListener('click', () => {
  audioPlayer.playChimeEffect();
  celebrationModal.classList.add('active');
  
  const interval = setInterval(() => {
    burstHearts(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.8, 25);
  }, 250);

  setTimeout(() => clearInterval(interval), 3000);
});

closeCelebrationBtn.addEventListener('click', () => {
  celebrationModal.classList.remove('active');
  avatarEmoji.textContent = '🥰❤️💍';
});

// ==========================================================================
// 9. VIRTUAL HUG COUNTER
// ==========================================================================
const sendHugBtn = document.getElementById('sendHugBtn');
const hugCountPill = document.getElementById('hugCount');

let currentHugs = parseInt(localStorage.getItem('babba_hugs') || '0', 10);
hugCountPill.textContent = `${currentHugs} Hugs Sent`;

sendHugBtn.addEventListener('click', () => {
  currentHugs++;
  localStorage.setItem('babba_hugs', currentHugs.toString());
  hugCountPill.textContent = `${currentHugs} Hugs Sent`;
  
  audioPlayer.playHeartPop();
  const rect = sendHugBtn.getBoundingClientRect();
  burstHearts(rect.left + rect.width / 2, rect.top, 20);

  sendHugBtn.style.transform = 'scale(1.1)';
  setTimeout(() => {
    sendHugBtn.style.transform = 'scale(1)';
  }, 180);
});

// ==========================================================================
// 10. PARTICLE BURST ENGINE
// ==========================================================================
function burstHearts(originX, originY, count = 30) {
  const emojis = ['💖', '💕', '🌸', '✨', '❤️', '🥰', '🌷'];
  
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = 'fixed';
    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.fontSize = `${Math.random() * 1.4 + 1.2}rem`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = 'translate(-50%, -50%) scale(0.2)';
    el.style.opacity = '1';

    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 220 + 60;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 40;
    const rotate = Math.random() * 360 - 180;

    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${rotate}deg) scale(${Math.random() * 0.8 + 0.8})`;
      el.style.opacity = '0';
    });

    setTimeout(() => {
      el.remove();
    }, 1300);
  }
}