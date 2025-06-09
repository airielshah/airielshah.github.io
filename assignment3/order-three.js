// To select all draggable item boxes
const items = document.querySelectorAll(".item-box");

// To select the drop area (the plate)
const dropZone = document.querySelector(".plate-area");

// Used to define where each item should be positioned (percentage-based).
// All items were positioned differently to assemble the looks of Nasi Lemak.
const positions = {
  Rice: { x: 50, y: 50 },
  Cucumber: { x: 45, y: 10 },
  Sambal: { x: 70, y: 25 },
  Egg: { x: 5, y: 50 },
  Anchovies: { x: 83, y: 78 },
  Eggs: { x: 50, y: 50 },
  Chicken: { x: 15, y: 25 },
  Squid: { x: 55, y: 90 },
  Beef: { x: 95, y: 50 },
  Prawn: { x: 20, y: 80 },
};

// Used to define the size of each items when drop in the plate area.
const sizes = {
  Rice: 280,
  Cucumber: 130,
  Sambal: 170,
  Egg: 150,
  Anchovies: 170,
  Eggs: 170,
  Chicken: 180,
  Squid: 150,
  Beef: 150,
  Prawn: 170,
};

// When user starts dragging an item to the plate area
items.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    const name = item.getAttribute("data-name");
    // It will pass the item's name to the drop event
    e.dataTransfer.setData("text/plain", name);
  });
});

// This used to allow drop by preventing default behavior
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
});

// Handle the drop action
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();

  const itemName = e.dataTransfer.getData("text/plain");
  if (positions[itemName]) {
    if (dropZone.querySelector(`[data-name="${itemName}"]`)) return;

    // Create a new dropped item
    const newItem = document.createElement("div");
    newItem.className = "item";
    newItem.setAttribute("data-name", itemName);
    newItem.style.left = positions[itemName].x + "%";
    newItem.style.top = positions[itemName].y + "%";

    // Create and add image inside the item
    const img = document.createElement("img");
    img.src = `images/${itemName.toLowerCase()}.png`;
    img.alt = itemName;
    img.style.width = `${sizes[itemName]}px`;
    img.style.height = `${sizes[itemName]}px`;

    newItem.appendChild(img);
    dropZone.appendChild(newItem);
  }
});

// The reset button funtions.
// Used to clear the items from the drop area.
document.getElementById("resetBtn").addEventListener("click", () => {
  dropZone.querySelectorAll(".item").forEach((item) => item.remove());
});

// The finish button check.
// Checks if all required items are dropped, if the items were not being drop or incomplete. There will be a message appear.
document.getElementById("finishBtn").addEventListener("click", () => {
  const needed = Object.keys(positions);
  const dropped = Array.from(dropZone.querySelectorAll(".item")).map((item) =>
    item.getAttribute("data-name")
  );

  const missing = needed.filter((item) => !dropped.includes(item));

  // Show result message based on the drop items actions.
  if (missing.length === 0) {
    alert("Well done! You made Nasi Lemak!");
  } else {
    alert("Missing items: " + missing.join(", "));
  }
});

// The mute button actions based on the assignment 2.
const bgMusic = document.getElementById("bgMusic");
const muteButton = document.getElementById("muteButton");

muteButton.addEventListener("click", () => {
  bgMusic.muted = !bgMusic.muted;
  muteButton.textContent = bgMusic.muted ? "🔇" : "🔊";
});

// This were used to redirect to next page for the next level.
document.getElementById("nextLevelBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});
