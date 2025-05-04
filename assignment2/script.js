// Music source and information library, all asset are sorted here for easy fetch
const playlist = [
  {
    title: "In My Blood",
    artist: "Shawn Mendes",
    src: "media/song1.mp3",
    cover: "media/cover1.png",
  },
  {
    title: "Youth (feat. Khalid)",
    artist: "Shawn Mendes, DJ Khalid",
    src: "media/song2.mp3",
    cover: "media/cover2.png",
  },
  {
    title: "TikTok Chillout Mix",
    artist: "DJ Ashre Finix",
    src: "https://archive.org/download/Tiktok-Mixtapes/TikTok%20Chillout%20Mix.mp3",
    cover:
      "https://resources.tidal.com/images/ec535484/69fe/4f18/a61b/1dfa20a3bb8e/640x640.jpg",
  },
];

// Index element and function
let currentIndex = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playlistContainer = document.getElementById("playlist");

// Player function
function loadSong(index) {
  const song = playlist[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  audio.load();
  audio.play(); //  Autoplay
  playBtn.textContent = "⏸️"; // Update button icon
  renderPlaylist(); // Update active highlight
}

audio.onended = () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex); // autoplay will happen here
};

// Play Button icon indicator
function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}

// Pause button icon indicator
function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

// Play-pause, Next and Prev button function
playBtn.onclick = () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  playSong();
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  playSong();
};

// Audio function and progress bar
audio.ontimeupdate = () => {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
};

progress.oninput = () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
};

// Volume adjustment bar
volume.oninput = () => {
  audio.volume = volume.value;
};

// Playlist function
function renderPlaylist() {
  playlistContainer.innerHTML = "";
  playlist.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = "playlist-item";
    if (index === currentIndex) {
      item.classList.add("active");
    }
    item.innerHTML = `<img src="${song.cover}" alt=""><span>${song.title}</span>`;
    item.onclick = () => {
      currentIndex = index;
      loadSong(currentIndex);
    };
    playlistContainer.appendChild(item);
  });
}

// Initial load
renderPlaylist();
loadSong(currentIndex);

// Pomodoro timer function
// Credit to OpenAI (ChatGPT,2025) for the reference and guide in making this action
// I set the duration time into 30 seconds each for review purposed.
const WORK_DURATION = 0.5 * 60; // 25 minutes
const BREAK_DURATION = 0.5 * 60; // 5 minutes
let isWorkSession = true;
let timeLeft = WORK_DURATION;
let pomodoroInterval = null;

const timerText = document.getElementById("timerText");
const progressCircle = document.getElementById("progressCircle");
const pomodoroLabel = document.getElementById("pomodoro-label");

const circumference = 2 * Math.PI * 65;
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = 0;

function updateTimerUI() {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timerText.textContent = `${minutes}:${seconds}`;

  const offset =
    circumference *
    (1 - timeLeft / (isWorkSession ? WORK_DURATION : BREAK_DURATION));
  progressCircle.style.strokeDashoffset = offset;
}

// Pomodoro theme switch
// Credit to OpenAI (ChatGPT,2025) for the reference and guide in making this action
function switchSession() {
  isWorkSession = !isWorkSession;
  timeLeft = isWorkSession ? WORK_DURATION : BREAK_DURATION;
  pomodoroLabel.textContent = isWorkSession ? "Work Session" : "Break Time";
  updateTimerUI();
  updateTheme();
}

resetPomodoro = () => {
  pausePomodoro();
  timeLeft = isWorkSession ? WORK_DURATION : BREAK_DURATION;
  updateTimerUI();
  updateTheme();
};

updateTimerUI();
updateTheme();

function updateTheme() {
  document.body.classList.remove("focus-theme", "break-theme");
  document.body.classList.add(isWorkSession ? "focus-theme" : "break-theme");
}

function startPomodoro() {
  if (pomodoroInterval) return;

  pomodoroInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerUI();
    } else {
      clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      alert(isWorkSession ? "Time for a break!" : "Back to work!");
      switchSession();
      startPomodoro();
    }
  }, 1000);
}

function pausePomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
}

function resetPomodoro() {
  pausePomodoro();
  timeLeft = isWorkSession ? WORK_DURATION : BREAK_DURATION;
  updateTimerUI();
  updateTheme();
}

// Pomodoro Button event listeners
document.getElementById("startPomodoro").onclick = startPomodoro;
document.getElementById("pausePomodoro").onclick = pausePomodoro;
document.getElementById("resetPomodoro").onclick = resetPomodoro;

updateTimerUI(); // Initialize
