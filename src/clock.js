/* 브라우저의 콘솔에서 
const date = new Date()
> undefined
date
> Thu Jun 03 2021 22:18:02 GMT+0900 (대한민국 표준시) {}
date.getMonth()
> 5
date.getDay()
> 4      (Thursday)
date.getHours()
> 22
*/

function getTime() {
  const date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();
  const clockContainer = document.querySelector(".js-clock");
  const clockTitle = clockContainer.querySelector("h2");

  clockTitle.innerText = ` 🕰 ${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  } : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  setInterval(getTime, 1000);
}

init();
