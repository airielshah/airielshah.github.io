const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here
const playlistEl = document.getElementById("playlist");
const mediaInput = document.getElementById("mediaInput");
let playlist = [];
let currentIndex = 0;

mediaInput.addEventListener("change", (e) => {
  playlist = Array.from(e.target.files);
  updatePlaylistUI();
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

function loadMedia(index) {
  const file = playlist[index];
  const mediaPlayer = document.getElementById("mediaPlayer");
  mediaPlayer.src = URL.createObjectURL(file);
}

function playMedia() {
  const mediaPlayer = document.getElementById("mediaPlayer");
  mediaPlayer.play();
}
