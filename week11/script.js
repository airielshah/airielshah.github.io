const cupTop = document.getElementById("cupTop");
const cupBottom = document.getElementById("cupBottomContainer");
const stream = document.getElementById("stream");
const fill = document.getElementById("fill");
const result = document.getElementById("result");

let isDragging = false;
let offsetX, offsetY;
let pourInterval;
let fillLevel = 0;

cupTop.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  cupTop.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    let x = e.clientX - cupTop.offsetWidth / 2;
    let y = e.clientY - cupTop.offsetHeight / 2;
    cupTop.style.left = x + "px";
    cupTop.style.top = y + "px";

    if (isOverCupBottom(x, y)) {
      cupTop.style.transform = "rotate(60deg)";
      startPouring();
    } else {
      cupTop.style.transform = "rotate(0deg)";
      stopPouring();
    }
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  cupTop.style.cursor = "grab";
  stopPouring();
});

function isOverCupBottom(x, y) {
  const rect = cupBottom.getBoundingClientRect();
  return (
    x + 50 > rect.left && x < rect.right && y + 50 > rect.top && y < rect.bottom
  );
}

function startPouring() {
  if (!pourInterval) {
    stream.style.height = "80px";
    pourInterval = setInterval(() => {
      if (fillLevel < 100) {
        fillLevel++;
        fill.style.height = fillLevel + "%";
      } else {
        stopPouring();
      }
    }, 100);
  }
}

function stopPouring() {
  if (pourInterval) {
    clearInterval(pourInterval);
    pourInterval = null;
    stream.style.height = "0px";

    if (fillLevel > 100) {
      result.textContent = "💦 You spilled the teh!";
    } else if (fillLevel >= 90) {
      result.textContent = "🥇 Perfect pour! You're a Teh Tarik Master!";
    } else if (fillLevel > 0) {
      result.textContent = "🫗 Not enough teh lah!";
    }
  }
}

function resetGame() {
  fillLevel = 0;
  fill.style.height = "0%";
  result.textContent = "Drag the top cup to pour teh!";
  cupTop.style.left = "100px";
  cupTop.style.top = "50px";
  cupTop.style.transform = "rotate(0deg)";
  stopPouring();
}
