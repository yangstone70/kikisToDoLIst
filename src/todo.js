const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = document.querySelector(".js-input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "pendings";
const FINISHED_LS = "finisheds";

let pendings = [];
let finisheds = [];

function savePendings() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}
function saveFinisheds() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finisheds));
}

function loadPendings() {
  const loadedPendings = localStorage.getItem(PENDING_LS);

  if (loadedPendings !== null) {
    const parsedPendings = JSON.parse(loadedPendings);
    parsedPendings.forEach(function (pending) {
      paintPending(pending.id, pending.text);
    });
  }
}
function loadFinisheds() {
  const loadedFinisheds = localStorage.getItem(FINISHED_LS);

  if (loadedFinisheds !== null) {
    const parsedFinisheds = JSON.parse(loadedFinisheds);
    parsedFinisheds.forEach(function (finished) {
      paintFinished(finished.id, finished.text);
    });
  }
}

function deletePending(even) {
  const btn = even.target;
  const li = even.target.parentNode;
  pendingList.removeChild(li);

  const cleanPendings = pendings.filter(function (pending) {
    return pending.id !== parseInt(li.id);
  });

  pendings = cleanPendings;
  savePendings();
}
function deleteFinished(even) {
  const btn = even.target;
  const li = even.target.parentNode;
  finishedList.removeChild(li);

  const cleanFinisheds = finisheds.filter(function (finished) {
    return finished.id !== parseInt(li.id);
  });
  finisheds = cleanFinisheds;
  saveFinisheds();
}

function checkPending(event) {
  const li = event.target.parentNode;
  const span = li.querySelector("span");
  const text = span.innerText;
  deletePending(event);
  paintFinished(0, text);
}
function checkFinished(event) {
  const li = event.target.parentNode;
  const span = li.querySelector("span");
  const text = span.innerText;
  deleteFinished(event);
  paintPending(0, text);
}

function paintPending(id, text) {
  const paintLi = document.createElement("li");
  const paintDelBtn = document.createElement("button");
  const paintCheckBtn = document.createElement("button");
  const paintSpan = document.createElement("span");

  //아이디 생성방식의 문제 보완
  if (id === 0) {
    let newId = 1;

    const loadedPendings = localStorage.getItem(PENDING_LS);
    if (loadedPendings !== null) {
      const parsedPendings = JSON.parse(loadedPendings);
      parsedPendings.forEach(function (pending) {
        if (parseInt(pending.id) >= newId) {
          newId = parseInt(pending.id) + 1;
        }
      });
    }
    id = newId;
  }

  paintDelBtn.innerText = "⛔️";
  paintCheckBtn.innerText = "🟩";

  paintDelBtn.addEventListener("click", deletePending);
  paintCheckBtn.addEventListener("click", checkPending);

  paintSpan.innerText = text;

  paintLi.appendChild(paintSpan);
  paintLi.appendChild(paintDelBtn);
  paintLi.appendChild(paintCheckBtn);
  paintLi.id = id;
  pendingList.appendChild(paintLi);

  const pendingObj = {
    text: text,
    id: id,
  };
  pendings.push(pendingObj);
  savePendings();
}
function paintFinished(id, text) {
  const paintLi = document.createElement("li");
  const paintDelBtn = document.createElement("button");
  const paintCheckBtn = document.createElement("button");
  const paintSpan = document.createElement("span");

  //아이디 생성방식의 문제 보완
  if (id === 0) {
    let newId = 1;

    const loadedFinisheds = localStorage.getItem(FINISHED_LS);
    if (loadedFinisheds !== null) {
      const parsedFinisheds = JSON.parse(loadedFinisheds);
      parsedFinisheds.forEach(function (finished) {
        if (parseInt(finished.id) >= newId) {
          newId = parseInt(finished.id) + 1;
        }
      });
    }
    id = newId;
  }

  paintDelBtn.innerText = "⛔️";
  paintCheckBtn.innerHTML = "✅";
  paintDelBtn.addEventListener("click", deleteFinished);
  paintCheckBtn.addEventListener("click", checkFinished);
  paintSpan.innerText = text;
  paintLi.appendChild(paintSpan);
  paintLi.appendChild(paintDelBtn);
  paintLi.appendChild(paintCheckBtn);
  paintLi.id = id;

  finishedList.appendChild(paintLi);

  const finishedObj = {
    text: text,
    id: id,
  };
  finisheds.push(finishedObj);
  saveFinisheds();
}

function handleSubmit(even) {
  even.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(0, currentValue);
  toDoInput.value = "";
}

function init() {
  loadPendings();
  loadFinisheds();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
