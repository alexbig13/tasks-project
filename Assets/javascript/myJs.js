let tasks = [];
const DOM = {
  task: null,
  date: null,
  time: null,
  taskNotes: null,
};

function init() {
  const addNewTaskButton = document.querySelector("#addBtnId");
  const clearNotesBtn = document.querySelector("#clearBtnId");
  const saveTasksBtn = document.querySelector("#saveBtnId");
  DOM.task = document.querySelector("#TaskId");
  DOM.date = document.querySelector("#dateId");
  DOM.time = document.querySelector("#timeId");
  DOM.taskNotes = document.querySelector("#result");
  addNewTaskButton.addEventListener("click", addNewTask);
  clearNotesBtn.addEventListener("click", clearAllTasks);
  saveTasksBtn.addEventListener("click", function () {
    saveTasks(tasks);
  });
  getTasks();
}

function addNewTask(e) {
  if (DOM.task.value && DOM.date.value && DOM.time.value !== "") {
    tasks.push(new Task(DOM.task.value, DOM.date.value, DOM.time.value));
  }

  if (DOM.task.value && DOM.date.value && DOM.time.value !== "") {
    drawTasks(tasks);
  }
}
function clearAllTasks() {
  DOM.task.value = "";
  DOM.date.value = "";
  DOM.time.value = "";
  DOM.taskNotes.innerHTML = "";
  localStorage.clear();
}
function clearTask() {
  DOM.task.value = "";
  DOM.date.value = "";
  DOM.time.value = "";
  DOM.taskNotes.innerHTML = "";
}

function drawTasks(tasksArr) {
  if (Array.isArray(tasksArr) === false) return;
  clearTask();

  for (let index = 0; index < tasksArr.length; index++) {
    const currentTask = tasksArr[index];
    const baseContainer = document.createElement("div");
    const span = document.createElement("span");
    span.classList.add("spanBtn");
    baseContainer.append(span);
    baseContainer.classList.add(`baseContainer`, `baseContainerImage`);
    const pTaskInfo = document.createElement("p");
    pTaskInfo.classList.add("pInfo");
    pTaskInfo.innerHTML = currentTask.task;
    const pTaskDate = document.createElement("p");
    pTaskDate.innerHTML = currentTask.date;
    const pTaskTime = document.createElement("p");
    pTaskTime.innerHTML = currentTask.time;
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("deleteBtn", "constStyleBtn");
    const icon = document.createElement("i");
    icon.classList.add("glyphicon", "glyphicon-remove");
    buttonDelete.append(icon);
    baseContainer.classList.add("fadeIn");

    buttonDelete.addEventListener("click", function () {
      tasks.splice(index, 1);
      localStorage.removeItem(index);
      drawTasks(tasks);
    });
    span.append(buttonDelete);
    baseContainer.append(pTaskInfo, pTaskDate, pTaskTime);

    baseContainer.addEventListener("mouseover", function () {
      buttonDelete.classList.remove("deleteBtn");
    });
    baseContainer.addEventListener("mouseleave", function () {
      buttonDelete.classList.remove("deleteBtnVissible");
      buttonDelete.classList.add("deleteBtn");
    });
    DOM.taskNotes.append(baseContainer);
  }
}
function saveTasks(tasksArr) {
  if (Array.isArray(tasksArr) === false) return;
  let tasksArrInner = [];
  for (index = 0; index < tasksArr.length; index++) {
    let tasksObj = {
      task: "",
      date: "",
      time: "",
    };
    tasksObj.task = tasksArr[index].task;
    tasksObj.date = tasksArr[index].date;
    tasksObj.time = tasksArr[index].time;
    tasksArrInner.push(tasksObj);

    localStorage.setItem(index, JSON.stringify(tasksArrInner));
  }
}
function getTasks() {
  let innerTasksArrAfterP;
  for (let index = 0; index < localStorage.length; index++) {
    innerTasksArrAfterP = JSON.parse(localStorage.getItem(index));
    drawTasks(innerTasksArrAfterP);
  }
}

init();
