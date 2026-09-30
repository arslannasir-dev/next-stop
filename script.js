const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
bgMusic.volume = 0.3;
let musicRequested = false;

let paddingVertical = 14;
let paddingHorizontal = 28;
let fontSize = 1;

document.body.addEventListener('click', (event) => {
  // The music button handles its own click, including the first one.
  if (!musicBtn.contains(event.target)) playMusic();
}, { once: true });

function updateMusicButton() {
  musicBtn.textContent = bgMusic.paused ? '🎵 Play music' : '🎵 Pause music';
  musicBtn.setAttribute('aria-pressed', String(!bgMusic.paused));
}

function showMusicError() {
  musicRequested = false;
  musicBtn.textContent = '🎵 Retry music';
  musicBtn.setAttribute('aria-pressed', 'false');
  musicBtn.title = 'Music could not play. Tap to try again.';
}

async function playMusic() {
  musicRequested = true;
  musicBtn.title = '';
  try {
    if (bgMusic.error) bgMusic.load();
    await bgMusic.play();
  } catch (error) {
    if (musicRequested && error.name !== 'AbortError') showMusicError();
  }
}

bgMusic.addEventListener('play', updateMusicButton);
bgMusic.addEventListener('pause', updateMusicButton);
bgMusic.addEventListener('error', showMusicError);

function toggleMusic() {
  if (musicRequested || !bgMusic.paused) {
    musicRequested = false;
    bgMusic.pause();
    updateMusicButton();
  } else {
    playMusic();
  }
}

noBtn.addEventListener('click', () => {
  paddingVertical += 8;
  paddingHorizontal += 15;
  fontSize += 0.2;
  
  yesBtn.style.padding = `${paddingVertical}px ${paddingHorizontal}px`;
  yesBtn.style.fontSize = `${fontSize}rem`;
});

yesBtn.addEventListener('click', () => {
  goToStep('step2');
});

const chosenActivity = "Breakfast together, shooting range, shopping, then a dinner date";

// Clear chronological validation as times change so the form can be submitted again.
document.getElementById('datePlanner').addEventListener('input', () => {
  document.querySelectorAll('#datePlanner input[type="time"]').forEach(input => input.setCustomValidity(''));
});

function goToStep(stepId) {
  document.querySelectorAll('.step-section').forEach(el => {
    el.classList.remove('active');
  });
  document.getElementById(stepId).classList.add('active');
  const heading = document.getElementById(stepId).querySelector('h1');
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
