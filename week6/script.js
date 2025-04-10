const header = document.querySelector("header");
console.log(header.innerHTML);
const topHeading = document.querySelector("h1");
// console.log(topHeading);
// console.log(topHeading.textContent);
// topHeading.textContent = "This is a new heading";
// topHeading.style.color = "Blue";

const myButton = document.querySelector("#my-button");
console.log(myButton);

myButton.addEventListener("click", handleClick);

const myCat = document.querySelector("#my-cat");
console.log(myCat);

myCat.addEventListener("mouseenter", addMe);
myCat.addEventListener("mouseleave", removeMe);

function addMe() {
  myCat.classList.add("round");
}

function removeMe() {
  myCat.classList.remove("round");
}

function handleClick() {
  console.log("HEy did you just click me??");
  myCat.classList.toggle;
}

const allParas = document.querySelectorAll("p");
// console.log(allParas);
// console.log(allParas.textContent);
for (let i = 0; i < allParas.length; i++) {
  //   console.log(allParas[i].textContent);
  allParas[i].style.border = "1px solid green";
  allParas[i].style.backgroundColor = "beige";
}

const myFirstSub = document.querySelector("#first-subheading");
// console.log(myFirstSub);
// console.log(myFirstSub.textContent);

// let a = 20;
// let b = 10;

// function add(val1, val2) {
//   let total = val1 + val2;
//   console.log(total);
//   return total;
// }

// function whatIsMyGrade (mark) {
//     if (mark > 80) {
//         return "HD";
//     } else if (mark < 40) {
//         return "FAIL";
//     } else {
//         return "PASS";
//     }
// }

// let score = 82;
// let msg = whatIsMyGrade (score);
// console.log (msg);

// let c = add(a,b);
// console.log(c);
// a = 40;
// b = 14;
// c = add(a,b);
// c = add(35,50);
// // console.log(c);
