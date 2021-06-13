const body = document.querySelector("body");

const IMG_NUMBER = 10;

function handleImgLoad() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./img/delivery witch kiki 0${imgNumber + 0}.png`;
  image.addEventListener("loadend", handleImgLoad);
  image.classList.add("bgImage"); //css
  body.appendChild(image);
}
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}
function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
