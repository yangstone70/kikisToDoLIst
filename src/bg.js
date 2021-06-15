const body = document.querySelector("body");

const IMG_NUMBER = 10;

function handleImgLoad() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const image = new Image();
  if (window.innerWidth / window.innerHeight >= 1) {
    image.src = `./img/delivery witch kiki 0${imgNumber + 0}.png`;
  } else {
    image.src = `./img/delivery witch kiki 1${imgNumber + 0}.jpeg`;
  }

  image.addEventListener("loadend", handleImgLoad);
  image.classList.add("bgImage"); //css
  body.appendChild(image);
}
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function removeImage(iamge) {
  const image = document.querySelector(".bgImage");
  if (image != null) {
    body.removeChild(image);
  }
}

function rotateBg() {
  removeImage();
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);

  setInterval(rotateBg, 8000);
}

init();
