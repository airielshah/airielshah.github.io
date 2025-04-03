let grade = 80;
if (grade > 75) {
  console.log("Yey! you got distinction");
} else {
  console.log("You just passed the course");
}

// numberical variable 0 -9
let a = 10;
let b = parseInt("20");
let c = a + b;
console.log(a, b, c);
// + add - subtract * multiply / division

// string or text variables '' "" `` back ticks
let myName = "Rohit";
console.log("Hello", myName);

let myCity = "Melbourne";
let msg = `<h1> I live in ${myCity} <h1>
<p> this is ${myName} <p>`;
console.log(msg);

// boolean variable true or false
let isItSunday = false;
const isIt0ART1013 = true;

// object variable
const myStudentRecord = {
  name: "Rohit",
  id: 1234,
  homeTown: "Melbourne",
  isLocal: false,
};
console.log(myStudentRecord);
console.log(myStudentRecord.homeTown);

// arrays they start at 0
let student1 = "Rohit";
let student2 = "Roger";
let student3 = "Lucy";
let student4 = "Sarah";
let students = ["Rohit", "Lucy", "Sarah", "Jim", "Mike"];
// console.log(students);
// console.log(students[0]);
// console.log(students[2]);
for (let i = 0; i < student1.length; i++) {
  console.log("HELLO", students[i]);
}
