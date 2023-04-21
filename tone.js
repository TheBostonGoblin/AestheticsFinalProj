let currentEmotionIndex = 0;

const synth = new Tone.Synth().toDestination();
const bpm = 120;
const beatLength = 60 / bpm;

document.querySelector("#play-btn").addEventListener("click", start);

function start() {
  Tone.start();
  generateMusic(currentEmotionIndex);
}

function setEmotionIndex(emotionIndex) {
  currentEmotionIndex = emotionIndex;
}

const patterns = {
  anger: [
    ["C4", "D4", "E4", "F4", "G4", "A4", "B4"],
    ["C4", "E4", "G4", "A4", "E4", "C4", "B4"],
    ["C4", "G4", "E4", "A4", "C4", "B4", "D4"],
    ["C4", "A4", "E4", "C4", "G4", "B4", "D4"],
    ["C4", "D4", "E4", "G4", "A4", "B4", "C5"],
  ],
  disgust: [
    ["C3", "D3", "E3", "F3", "G3", "A3", "B3"],
    ["C3", "F3", "E3", "A3", "C3", "B3", "D3"],
    ["C3", "E3", "G3", "A3", "E3", "C3", "B3"],
    ["C3", "A3", "E3", "C3", "G3", "B3", "D3"],
    ["C3", "D3", "E3", "G3", "A3", "B3", "C4"],
  ],
  fear: [
    ["C5", "D5", "E5", "F5", "G5", "A5", "B5"],
    ["C5", "F5", "E5", "A5", "C5", "B5", "D5"],
    ["C5", "E5", "G5", "A5", "E5", "C5", "B5"],
    ["C5", "A5", "E5", "C5", "G5", "B5", "D5"],
    ["C5", "D5", "E5", "G5", "A5", "B5", "C6"],
  ],
  joy: [
    ["C2", "D2", "E2", "F2", "G2", "A2", "B2"],
    ["C2", "F2", "E2", "A2", "C2", "B2", "D2"],
    ["C2", "E2", "G2", "A2", "E2", "C2", "B2"],
    ["C2", "A2", "E2", "C2", "G2", "B2", "D2"],
    ["C2", "D2", "E2", "G2", "A2", "B2", "C3"],
  ],
  sadness: [
    ["C6", "D6", "E6", "F6", "G6", "A6", "B6"],
    ["C6", "F6", "E6", "A6", "C6", "B6", "D6"],
    ["C6", "E6", "G6", "A6", "E6", "C6", "B6"],
    ["C6", "A6", "E6", "C6", "G6", "B6", "D6"],
    ["C6", "D6", "E6", "G6", "A6", "B6", "C7"],
  ],
  surprise: [
    ["C1", "D1", "E1", "F1", "G1", "A1", "B1"],
    ["C1", "F1", "E1", "A1", "C1", "B1", "D1"],
    ["C1", "E1", "G1", "A1", "E1", "C1", "B1"],
    ["C1", "A1", "E1", "C1", "G1", "B1", "D1"],
    ["C1", "D1", "E1", "G1", "A1", "B1", "C2"],
  ],
};

function generateMusic(emotionIndex) {
  const emotions = ["anger", "disgust", "fear", "joy", "sadness", "surprise"];
  const emotion = emotions[emotionIndex];

  const pattern = patterns[emotion][Math.floor(Math.random() * patterns[emotion].length)];

  const now = Tone.now();

  for (let i = 0; i < pattern.length; i++) {
    synth.triggerAttackRelease(pattern[i], "8n", now + (i * beatLength) / 4);
  }
}

export { setEmotionIndex };
