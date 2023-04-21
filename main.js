import { setEmotionIndex } from "./tone.js";

// Load JSON and analyze emotions
document.querySelector("#my-button").onclick = loadJsonXHR;

let emotionScores;
let emotionsDetected;
let jsonResponse;
let jsonObject;

function loadJsonXHR() {
  emotionScores = [];
  emotionsDetected = [];
  jsonResponse = null;

  let userInput = document.querySelector("#transcript").value;
  let stringQueryUserInput = userInput.replaceAll(" ", "%20");
  let queryRequest = `https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=${stringQueryUserInput}`;

  const data = null;
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      jsonResponse = this.responseText;
      jsonObject = JSON.parse(jsonResponse);
      console.log(jsonObject);
      emotionScores = getEmotionScores(jsonObject);
      emotionsDetected = jsonObject.emotions_detected;

      let highestScoreIndex = getHighestScoreIndex(emotionScores);
      displayTopEmotion(highestScoreIndex);
    }
  });

  sendRequest(xhr, queryRequest, data);
}

function getEmotionScores(jsonObject) {
  let emotionScores = [
    jsonObject.emotion_scores.anger,
    jsonObject.emotion_scores.disgust,
    jsonObject.emotion_scores.fear,
    jsonObject.emotion_scores.joy,
    jsonObject.emotion_scores.sadness,
    jsonObject.emotion_scores.surprise,
  ];
  return emotionScores;
}

function getHighestScoreIndex(emotionScores) {
  let highestScoreIndex = 0;
  let currentTopEmotion = 0;
  for (let i = 0; i < emotionScores.length; i++) {
    if (emotionScores[i] > currentTopEmotion) {
      highestScoreIndex = i;
      currentTopEmotion = emotionScores[i];
    }
  }
  return highestScoreIndex;
}

function displayTopEmotion(highestScoreIndex) {
  const emotions = ["Anger", "Disgust", "Fear", "Joy", "Sadness", "Surprise"];
  document.querySelector("#topEmotion").innerHTML = emotions[highestScoreIndex];
  setEmotionIndex(highestScoreIndex); // Call setEmotionIndex function from tone.js with the emotion index
}

function sendRequest(xhr, queryRequest, data) {
  xhr.open("GET", queryRequest);
  xhr.setRequestHeader("X-RapidAPI-Key", "fdb74b706emshbf375d86a4ae42dp1a8f40jsn926b045ca0f8");
  xhr.setRequestHeader("X-RapidAPI-Host", "twinword-emotion-analysis-v1.p.rapidapi.com");
  xhr.send(data);
}
