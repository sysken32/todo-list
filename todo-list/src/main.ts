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
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.style.display = "inline-block";
  deleteBtn.style.textAlign = "center"; // Add text alignment style
deleteBtn.style.verticalAlign = "middle"; // Add vertical alignment style
deleteBtn.style.lineHeight = "1";

  const deleteTask = () => {
    deleteItem(task);
    item.remove();
  }

  deleteBtn.addEventListener("click", deleteTask);

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    storeTask();
  })
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  label.appendChild(deleteBtn);
  item.append(label);
  list?.append(item);

  storeTask();
};

function storeTask(){
  localStorage.setItem("TASKS",JSON.stringify(taskStorage)); //stores items into local storage under "TASKS".
}

function loadTask(): Task[]{
  const taskJson = localStorage.getItem("TASKS");
  if(taskJson == null){
    return [];
  }
  return JSON.parse(taskJson);
}

function resetBoard(){
  localStorage.clear(); //clears the items in local storage. This function resets the whole board.
  if(list){
    list.innerHTML = "";
  }
}
reset?.addEventListener("click", resetBoard);

function deleteItem(task: Task){
  const index = taskStorage.indexOf(task);
  if(index !== -1){
    taskStorage.splice(index, 1); // Remove the task from the taskStorage
    storeTask(); // Save the updated taskStorage to localStorage
    //create an update storage function to check if the current item is still in the storage then update. ?? 
  }
}