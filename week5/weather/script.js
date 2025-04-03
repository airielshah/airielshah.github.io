function checkWeather() {
  const myTemp = document.querySelector("#myTemp");
  const body = document.querySelector("body");
  const outer = document.querySelector("outer");
  console.log(myTemp);
  let temp = myTemp.value;
  console.log("Temp value is", temp);
  if (temp < 10) {
    console.log("It is freezing!!!");
    body.style.backgroundColor = "gray";
    outer.style.backgroundColor = "black";
  } else if (temp >= 10 && temp < 20) {
    console.log("NIce and pleasant weather!!!");
    body.style.backgroundColor = "pink";
    outer.style.backgroundColor = "red";
  } else if (temp >= 22 && temp < 35) {
    console.log("Sunny & Warm!!!");
    body.style.backgroundColor = "blue";
    outer.style.backgroundColor = "lime";
  } else if (temp >= 35) {
    console.log("It is burning hot!!!");
    body.style.backgroundColor = "green";
    outer.style.backgroundColor = "purple";
  }
}
