//fetch the video so that we can work with it
const myVideo = document.querySelector("#my-video");
console.log(myVideo);

// play pause logic
// 1. fetch the right button to play and pause the video
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

const playPauseButton = document.querySelector("#play-pause-img");
console.log(playPauseImg);

//2. listen to the click event on that button
playPauseButton.addEventListener("click", togglePlay);

//3. write the function that will do play and pause
function togglePlay() {
  if (myVideo.pause || myVideo.ended) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
    myVideo.play();
  } else {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
    myVideo.pause();
  }
}
