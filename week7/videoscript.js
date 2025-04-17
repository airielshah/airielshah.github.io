const myVideo = document.querySelector("#my-video");
console.log(myVideo);

//--------------------------------------------------------
// My logic for playing sound
// first I need to fetch the right button for play

const playButton = document.querySelector("#play-button");
console.log(playButton);

// then I will listen to the click events in that button

playButton.addEventListener("click", playVideo);

// whenever click happens, i will play the audio

function playVideo() {
  myVideo.play();
}

//--------------------------------------------------------

//--------------------------------------------------------
// My logic for pausing sound
// first I need to fetch the right button for play

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// then I will listen to the click events in that button

pauseButton.addEventListener("click", pauseVideo);

// whenever click happens, i will pause the audio

function pauseVideo() {
  myVideo.pause();
}

//--------------------------------------------------------
