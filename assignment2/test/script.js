const mediaPlayer = document.getElementById("mediaPlayer");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");
const mediaInput = document.getElementById("mediaInput");
const playlistEl = document.getElementById("playlist");

let playlist = [];
let currentIndex = 0;

function loadMedia(index) {
  const file = playlist[index];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    mediaPlayer.src = fileURL;
    mediaPlayer.load();
    highlightPlaylist(index);
  }
}

function playMedia() {
  mediaPlayer.play();
}

function pauseMedia() {
  mediaPlayer.pause();
}

function stopMedia() {
  mediaPlayer.pause();
  mediaPlayer.currentTime = 0;
}

function nextMedia() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadMedia(currentIndex);
  playMedia();
}

function prevMedia() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadMedia(currentIndex);
  playMedia();
}

seekBar.addEventListener("input", () => {
  const value = (seekBar.value / 100) * mediaPlayer.duration;
  mediaPlayer.currentTime = value;
});

mediaPlayer.addEventListener("timeupdate", () => {
  const value = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
  seekBar.value = value;
});

volumeBar.addEventListener("input", () => {
  mediaPlayer.volume = volumeBar.value;
});

mediaInput.addEventListener("change", (e) => {
  playlist = Array.from(e.target.files);
  updatePlaylistUI();
  currentIndex = 0;
  loadMedia(currentIndex);
});

function updatePlaylistUI() {
  playlistEl.innerHTML = "";
  playlist.forEach((file, index) => {
    const li = document.createElement("li");

    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.muted = true;
    video.preload = "metadata";
    video.className = "thumbnail";

    // Capture thumbnail after metadata is loaded
    video.addEventListener("loadeddata", () => {
      video.currentTime = 1;
    });

    const span = document.createElement("span");
    span.textContent = file.name;

    li.appendChild(video);
    li.appendChild(span);

    li.addEventListener("click", () => {
      currentIndex = index;
      loadMedia(currentIndex);
      playMedia();
    });

    playlistEl.appendChild(li);
  });
}

function highlightPlaylist(index) {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((item, idx) => {
    item.classList.toggle("active", idx === index);
  });
}

// Button listeners
playBtn.addEventListener("click", playMedia);
pauseBtn.addEventListener("click", pauseMedia);
nextBtn.addEventListener("click", nextMedia);
prevBtn.addEventListener("click", prevMedia);

// Pomodoro Session
let pomodoroInterval;
let isRunning = false;
let isFocus = true;
let timeLeft = 5 * 60;
const timerDisplay = document.getElementById("timer");
const sessionLabel = document.getElementById("sessionLabel");
const pomodoroBox = document.getElementById("pomodoroBox");

const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - percent * circumference;
  circle.style.strokeDashoffset = offset;
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
  const total = isFocus ? 5 * 60 : 1 * 60;
  setProgress((total - timeLeft) / total);
}

function switchTheme() {
  if (isFocus) {
    pomodoroBox.classList.add("focus");
    pomodoroBox.classList.remove("break");
  } else {
    pomodoroBox.classList.add("break");
    pomodoroBox.classList.remove("focus");
  }
}

function startPomodoro() {
  if (!isRunning) {
    isRunning = true;
    switchTheme();
    pomodoroInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(pomodoroInterval);
        isRunning = false;
        isFocus = !isFocus;
        timeLeft = isFocus ? 5 * 60 : 1 * 60;
        sessionLabel.textContent = isFocus ? "Focus Time" : "Break Time";
        switchTheme();
        updateTimerDisplay();
        alert(
          isFocus ? "Break over. Back to focus!" : "Focus done. Take a break!"
        );
      }
    }, 1000);
  }
}

function pausePomodoro() {
  clearInterval(pomodoroInterval);
  isRunning = false;
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  isRunning = false;
  isFocus = true;
  timeLeft = 5 * 60;
  sessionLabel.textContent = "Focus Time";
  switchTheme();
  updateTimerDisplay();
}

updateTimerDisplay();
switchTheme();
