const card = document.querySelector(".card");
console.log(card);

let draggedCard = card;

card.addEventListener("dragstart", function () {
  draggedCard = card;
  console.log(draggedCard);
});

const dropbox = document.querySelector(".dropbox");
console.log(dropbox);

dropbox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

// dropbox.addEventListener("drop", function (e){
//     card clone = draggedCard;
//     dropbox.append(clone);
//     clone.addEventListener("click", function (){
//         clone.classList.toggle("flip");
//     });
//     draggedCard = null;
// });
