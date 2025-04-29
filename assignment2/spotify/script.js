const playlist = [
  {
    title: "First Song",
    artist: "Artist 1",
    src: "media/song1.mp3",
    cover: "media/cover1.png",
  },
  {
    title: "Second Song",
    artist: "Artist 2",
    src: "media/song2.mp3",
    cover: "media/cover2.png",
  },
];

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

function loadSong(index) {
  const song = playlist[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  audio.load();
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

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

audio.ontimeupdate = () => {
  progress.value = audio.currentTime / audio.duration || 0;
};

progress.oninput = () => {
  audio.currentTime = progress.value * audio.duration;
};

volume.oninput = () => {
  audio.volume = volume.value;
};

function renderPlaylist() {
  playlistContainer.innerHTML = "";
  playlist.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = "playlist-item";
    item.innerHTML = `<img src="${song.cover}" alt=""><span>${song.title}</span>`;
    item.onclick = () => {
      currentIndex = index;
      loadSong(currentIndex);
      playSong();
    };
    playlistContainer.appendChild(item);
  });
}

// Initial load
renderPlaylist();
loadSong(currentIndex);
