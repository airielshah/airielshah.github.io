const items = document.querySelectorAll(".item-box");
const dropZone = document.querySelector(".plate-area");

const positions = {
  Rice: { x: 50, y: 50 },
  Cucumber: { x: 20, y: 20 },
  Sambal: { x: 70, y: 25 },
  Egg: { x: 25, y: 75 },
  Anchovies: { x: 70, y: 75 },
};

const sizes = {
  Rice: 280,
  Cucumber: 140,
  Sambal: 170,
  Egg: 170,
  Anchovies: 180,
};

items.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    const name = item.getAttribute("data-name");
    e.dataTransfer.setData("text/plain", name);
  });
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const itemName = e.dataTransfer.getData("text/plain");

  if (positions[itemName]) {
    if (dropZone.querySelector(`[data-name="${itemName}"]`)) return;

    const newItem = document.createElement("div");
    newItem.className = "item";
    newItem.setAttribute("data-name", itemName);
    newItem.style.left = positions[itemName].x + "%";
    newItem.style.top = positions[itemName].y + "%";

    const img = document.createElement("img");
    img.src = `images/${itemName.toLowerCase()}.png`;
    img.alt = itemName;
    img.style.width = `${sizes[itemName]}px`;
    img.style.height = `${sizes[itemName]}px`;

    newItem.appendChild(img);
    dropZone.appendChild(newItem);
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  dropZone.querySelectorAll(".item").forEach((item) => item.remove());
});

document.getElementById("finishBtn").addEventListener("click", () => {
  const needed = Object.keys(positions);
  const dropped = Array.from(dropZone.querySelectorAll(".item")).map((item) =>
    item.getAttribute("data-name")
  );
  const missing = needed.filter((item) => !dropped.includes(item));

  if (missing.length === 0) {
    alert("Well done! You made Nasi Lemak!");
  } else {
    alert("Missing items: " + missing.join(", "));
  }
});

// Toggle Mute/Unmute
const bgMusic = document.getElementById("bgMusic");
const muteButton = document.getElementById("muteButton");

muteButton.addEventListener("click", () => {
  bgMusic.muted = !bgMusic.muted;
  muteButton.textContent = bgMusic.muted ? "🔇" : "🔊";
});

// Next level button for redirect to next order game page.
document.getElementById("nextLevelBtn").addEventListener("click", function () {
  window.location.href = "next-level.html"; // Change this to your actual next level page
});
