import { setEmotions } from "./tone.js";

async function fetchPassages() {
  const quotes = [];

  // Generate 8 quotes
  for (let i = 0; i < 8; i++) {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    quotes.push(data.content);
  }

  document.querySelector("#transcript").value = quotes.join("\n");
  document.querySelector("#transcript").dispatchEvent(new Event("input"));
}

document.querySelector("#generate-btn").addEventListener("click", fetchPassages);

// Load JSON and analyze emotions
document.querySelector("#analyze-btn").onclick = loadJsonXHR;

let emotionScores;

async function loadJsonXHR() {
  let userInput = document.querySelector("#transcript").value;

  window.test = userInput;
  // Split the userInput into quotes
  const quotes = userInput.split("\n").filter((quote) => quote.trim() !== "");

  // Create an array to store emotion indices
  const emotionIndices = [];

  console.log("passages:", quotes);
  for (const quote of quotes) {
    const stringQueryUserInput = quote.replaceAll(" ", "%20");
    const queryRequest = `https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=${stringQueryUserInput}`;

    // Wrap the XMLHttpRequest in a Promise
    const emotionIndex = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          emotionScores = [];
          let jsonObject = JSON.parse(this.responseText);
          console.log("json:", jsonObject);

          emotionScores.push(jsonObject.emotion_scores.anger);
          emotionScores.push(jsonObject.emotion_scores.disgust);
          emotionScores.push(jsonObject.emotion_scores.fear);
          emotionScores.push(jsonObject.emotion_scores.joy);
          emotionScores.push(jsonObject.emotion_scores.sadness);
          emotionScores.push(jsonObject.emotion_scores.surprise);

          resolve(getHighestScoreIndex(emotionScores));
        }
      });

      sendRequest(xhr, queryRequest, null);
    });

    emotionIndices.push(emotionIndex);
  }

  const emotions = ["anger", "disgust", "fear", "joy", "sadness", "surprise"];
  document.querySelector("#top-emotion-detected").innerHTML = emotionIndices.map((index) => emotions[index]).join(", ");

  setEmotions(emotionIndices);
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

function sendRequest(xhr, queryRequest, data) {
  xhr.open("GET", queryRequest);
  xhr.setRequestHeader("X-RapidAPI-Key", "fdb74b706emshbf375d86a4ae42dp1a8f40jsn926b045ca0f8");
  xhr.setRequestHeader("X-RapidAPI-Host", "twinword-emotion-analysis-v1.p.rapidapi.com");
  xhr.send(data);
}
