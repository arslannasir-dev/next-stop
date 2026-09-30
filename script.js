const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const bgMusic = document.getElementById('bgMusic');

let paddingVertical = 14;
let paddingHorizontal = 28;
let fontSize = 1;

document.body.addEventListener('click', () => {
  if (bgMusic.paused) bgMusic.play();
}, { once: true });

function toggleMusic() {
  if (bgMusic.paused) bgMusic.play();
  else bgMusic.pause();
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

let chosenActivity = "Dinner Only";

function handleActivityChoice(hasTime) {
  if (hasTime === 'Yes') {
    goToStep('step3');
  } else {
    document.getElementById('activityCard').style.display = 'none';
    submitFinalChoice("Dinner Only");
  }
}

function submitFinalChoice(activity) {
  chosenActivity = activity;
  document.getElementById('selectedActivityText').innerText = activity;
  goToStep('step4');
}

function goToStep(stepId) {
  document.querySelectorAll('.step-section').forEach(el => {
    el.classList.remove('active');
  });
  document.getElementById(stepId).classList.add('active');
}
