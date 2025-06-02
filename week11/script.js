const cupTop = document.getElementById("cupTop");
const cupBottom = document.getElementById("cupBottomContainer");
const stream = document.getElementById("stream");
const fill = document.getElementById("fill");
const result = document.getElementById("result");

let isDragging = false;
let pourInterval = null;
let fillLevel = 0;

// Use mousemove for precise dragging
cupTop.addEventListener("mousedown", () => {
  isDragging = true;
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  // Calculate center alignment
  const x = e.clientX - cupTop.offsetWidth / 2;
  const y = e.clientY - cupTop.offsetHeight / 2;

  cupTop.style.left = `${x}px`;
  cupTop.style.top = `${y}px`;

  if (isOverBottomCup(x + cupTop.offsetWidth / 2, y + cupTop.offsetHeight)) {
    cupTop.style.transform = "rotate(60deg)";
    startPouring();
  } else {
    cupTop.style.transform = "rotate(0deg)";
    stopPouring();
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "default";
  cupTop.style.transform = "rotate(0deg)";
  stopPouring();
});

function isOverBottomCup(centerX, bottomY) {
  const cupRect = cupBottom.getBoundingClientRect();
  return (
    centerX > cupRect.left &&
    centerX < cupRect.right &&
    bottomY > cupRect.top &&
    bottomY < cupRect.bottom
  );
}

function startPouring() {
  if (pourInterval) return;

  stream.style.height = "80px";
  pourInterval = setInterval(() => {
    if (fillLevel < 100) {
      fillLevel += 1;
      fill.style.height = `${fillLevel}%`;
    } else {
      stopPouring();
    }
  }, 100);
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
