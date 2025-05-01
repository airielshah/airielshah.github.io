const playlists = {
  Chill: [
    {
      title: "Chill Song 1",
      artist: "Artist A",
      file: "songs/chill/song1.mp3",
      cover: "images/chill/song1.png",
    },
    {
      title: "Chill Song 2",
      artist: "Artist B",
      file: "songs/chill/song2.mp3",
      cover: "images/chill/song2.png",
    },
  ],
  Focus: [
    {
      title: "Focus Song 1",
      artist: "Artist C",
      file: "songs/focus/song1.mp3",
      cover: "images/focus/song1.png",
    },
    {
      title: "Focus Song 2",
      artist: "Artist D",
      file: "songs/focus/song2.mp3",
      cover: "images/focus/song2.png",
    },
  ],
};

let currentPlaylist = [];
let currentSongIndex = 0;
let isPlaying = false;

const playlistList = document.getElementById("playlist-list");
const songList = document.getElementById("song-list");
const playlistTitle = document.getElementById("playlist-title");
const audioPlayer = document.getElementById("audio-player");
const coverImage = document.getElementById("cover-image");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function loadPlaylists() {
  for (let playlist in playlists) {
    const li = document.createElement("li");
    li.textContent = playlist;
    li.addEventListener("click", () => {
      loadSongs(playlist);
    });
    playlistList.appendChild(li);
  }
}

function loadSongs(playlistName) {
  currentPlaylist = playlists[playlistName];
  currentSongIndex = 0;
  playlistTitle.textContent = playlistName;
  songList.innerHTML = "";
  currentPlaylist.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("song-item");
    div.innerHTML = `
        <img src="${song.cover}" alt="${song.title}" />
        <p>${song.title}</p>
        <p>${song.artist}</p>
      `;
    div.addEventListener("click", () => {
      currentSongIndex = index;
      loadCurrentSong();
      playSong();
    });
    songList.appendChild(div);
  });
  loadCurrentSong();
}

function loadCurrentSong() {
  const song = currentPlaylist[currentSongIndex];
  audioPlayer.src = song.file;
  coverImage.src = song.cover;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
}

function playSong() {
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = "Pause";
}

function pauseSong() {
  audioPlayer.pause();
  isPlaying = false;
  playPauseBtn.textContent = "Play";
}

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  loadCurrentSong();
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
  loadCurrentSong();
  playSong();
});

// Pomodoro Timer
let timer;
let timeLeft = 25 * 60;
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateTimerDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

loadPlaylists();
updateTimerDisplay();
