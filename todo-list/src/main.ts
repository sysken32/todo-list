import './style.css'

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const reset = document.querySelector<HTMLInputElement>("#resetBtn");

const taskStorage: Task[] = loadTask();
taskStorage.forEach(addListItem);

type Task = {
    title: string
    completed: boolean
    createdAt: Date
}
form?.addEventListener("submit", e => {
  e.preventDefault();
  if(input?.value == "" || input?.value == null) return;

  const newTask = {
    title: input.value,
    completed: false,
    createdAt: new Date()
  };

  taskStorage.push(newTask);

  addListItem(newTask);
  input.value = ""; //resets the input box to blank
  storeTask();
});

function addListItem(task: Task )
{
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    storeTask();
  })
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);

  storeTask();
};

function storeTask(){
  localStorage.setItem("TASKS",JSON.stringify(taskStorage));
}

function loadTask(): Task[]{
  const taskJson = localStorage.getItem("TASKS");
  if(taskJson == null){
    return [];
  }
  return JSON.parse(taskJson);
}

function resetBoard(){
  localStorage.clear();
  if(list){
    list.innerHTML = "";
  }
}
reset?.addEventListener("click", resetBoard);