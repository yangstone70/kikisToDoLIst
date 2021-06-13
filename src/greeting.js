/* Console에서 연습
localStorage.setItem("country","kr")
-> Application / Storage / LocalStorage 에 가면 키-밸류 값으로 저장되어 있다.

localStorage.getItem("country")
-> kr 을 반환해 준다.


*/

const form = document.querySelector(".js-nameForm");
input = form.querySelector("input");
greetings = document.querySelector(".js-greetings");
// querySelectorAll은 여러 input 오브젝트를 가져오므로 array에 저장된다.

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

//입력폼은 숨기고 localStorage의 유저네임을 보여주는 함수
function paintGreetings(text) {
  form.classList.remove(SHOWING_CN);
  greetings.classList.add(SHOWING_CN);
  greetings.innerText = `🌱 Hello ${text} ~`;
}

//입력폼을 드러내어 유저네임을 받으려는 함수
function askForName() {
  //greetings.classList.remove("SHOWING_CN"); 어차피 보여주어도 출력되는 게 없다.
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault(); //기본동작인 리프레시와 데이터 전송 같은 걸 막는다.
  const currentValue = input.value; // input의 내용을 가져온다.
  paintGreetings(currentValue);
  saveName(currentValue);
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    //currentUser가 없을 때.
    askForName();
  } else {
    //currentUser가 있다...
    paintGreetings(currentUser);
  }
}

function init() {
  loadName();
}

init();
