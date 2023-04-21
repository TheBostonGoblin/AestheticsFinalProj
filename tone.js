// const synth = new Tone.Synth().toDestination();

// Load all samples so we can select which instrument to play the music
const samples = SampleLibrary.load({
  instruments: [
    "piano",
    "bass-electric",
    "bassoon",
    "cello",
    "clarinet",
    "contrabass",
    "flute",
    "french-horn",
    "guitar-acoustic",
    "guitar-electric",
    "guitar-nylon",
    "harmonium",
    "harp",
    "organ",
    "saxophone",
    "trombone",
    "trumpet",
    "tuba",
    "violin",
    "xylophone",
  ],
  baseUrl: "tonejs-instruments/samples/",
});

// For test purpose, we only use guitar.
const guitar = samples["guitar-electric"];
guitar.toMaster();

const bpm = 130;
const beatLength = 60 / bpm;

document.querySelector("#play-btn").addEventListener("click", start);

let emotionIndices = [0, 2, 3, 4, 3, 1, 2, 4, 1, 4, 2, 2, 1, 0, 0, 3, 4];

function start() {
  Tone.start();
  let startTime = Tone.now();

  console.log("Generating music:", emotionIndices);
  for (const emotionIndex of emotionIndices) {
    const delay = generateMusic(emotionIndex, startTime);
    console.log(delay, startTime);
    startTime += delay;
  }
}

function setEmotions(emotionIndicesInput) {
  emotionIndices = emotionIndicesInput;
}

const patterns = {
  anger: [
    ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
    ["C4", "E4", "G4", "A4", "E4", "C4", "B4", "D4"],
    ["C4", "G4", "E4", "A4", "C4", "B4", "D4", "G4"],
    ["C4", "A4", "E4", "C4", "G4", "B4", "D4", "F4"],
    ["C4", "D4", "E4", "G4", "A4", "B4", "C5", "D5"],
  ],
  disgust: [
    ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
    ["C3", "F3", "E3", "A3", "C3", "B3", "D3", "G3"],
    ["C3", "E3", "G3", "A3", "E3", "C3", "B3", "D3"],
    ["C3", "A3", "E3", "C3", "G3", "B3", "D3", "F3"],
    ["C3", "D3", "E3", "G3", "A3", "B3", "C4", "D4"],
  ],
  fear: [
    ["C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"],
    ["C5", "F5", "E5", "A5", "C5", "B5", "D5", "G5"],
    ["C5", "E5", "G5", "A5", "E5", "C5", "B5", "D5"],
    ["C5", "A5", "E5", "C5", "G5", "B5", "D5", "F5"],
    ["C5", "D5", "E5", "G5", "A5", "B5", "C6", "D6"],
  ],
  joy: [
    ["C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3"],
    ["C2", "F2", "E2", "A2", "C2", "B2", "D2", "G2"],
    ["C2", "E2", "G2", "A2", "E2", "C2", "B2", "D2"],
    ["C2", "A2", "E2", "C2", "G2", "B2", "D2", "F2"],
    ["C2", "D2", "E2", "G2", "A2", "B2", "C3", "D3"],
  ],
  sadness: [
    ["C6", "D6", "E6", "F6", "G6", "A6", "B6", "C7"],
    ["C6", "F6", "E6", "A6", "C6", "B6", "D6", "G6"],
    ["C6", "E6", "G6", "A6", "E6", "C6", "B6", "D6"],
    ["C6", "A6", "E6", "C6", "G6", "B6", "D6", "F6"],
    ["C6", "D6", "E6", "G6", "A6", "B6", "C7", "D7"],
  ],
  surprise: [
    ["C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2"],
    ["C1", "F1", "E1", "A1", "C1", "B1", "D1", "G1"],
    ["C1", "E1", "G1", "A1", "E1", "C1", "B1", "D1"],
    ["C1", "A1", "E1", "C1", "G1", "B1", "D1", "F1"],
    ["C1", "D1", "E1", "G1", "A1", "B1", "C2", "D2"],
  ],
};

function generateMusic(emotionIndex, startTime) {
  const emotions = ["anger", "disgust", "fear", "joy", "sadness", "surprise"];
  const emotion = emotions[emotionIndex];

  const pattern = patterns[emotion][Math.floor(Math.random() * patterns[emotion].length)];

  for (let i = 0; i < pattern.length; i++) {
    // synth.triggerAttackRelease(pattern[i], "8n", startTime + (i * beatLength) / 2);
    guitar.triggerAttackRelease(pattern[i], "8n", startTime + (i * beatLength) / 2);
  }

  // Return the total duration of the pattern
  return (pattern.length * beatLength) / 2;
}

export { setEmotions };
