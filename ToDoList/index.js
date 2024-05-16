const tasks = [];

const taskList = document.querySelector('#tasks-list ul');
const searchTask = document.forms["search-tasks"]
const addTask = document.forms["add-task"];
const taskTitleList = Array.from(document.querySelectorAll('#tasks-list .name'));



function saveTasks() {
    const tasksStr = tasks.map(task => task.querySelector('.name').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasksStr));
}

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach(taskText => {
            addTaskToList(taskText);
        });
    }
}

loadTasks();

function addTaskToList(taskText) {
    const liTag = document.createElement("li");
    const firstSpan = document.createElement("span");
    const secondSpan = document.createElement("span");
    const inputTag = document.createElement("input");
    inputTag.type = "checkbox";

    firstSpan.className = 'name';
    secondSpan.className = 'delete';

    firstSpan.textContent = taskText;
    secondSpan.textContent = "Delete";

    liTag.appendChild(inputTag);
    liTag.appendChild(firstSpan);
    liTag.appendChild(secondSpan);

    tasks.push(liTag);
    taskList.appendChild(liTag);
}



addTask.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = addTask.querySelector('input').value;

    if (inputValue) {
        addTaskToList(inputValue);
        saveTasks();
        addTask.reset();
    }
});

taskList.addEventListener("click", (e) => {
    if (e.target.className === "delete") {
        const li = e.target.parentElement;
        taskList.removeChild(li);
        tasks.splice(tasks.indexOf(li), 1);
        saveTasks();
    }
});

searchTask.addEventListener('keyup', (e) =>{
    let inputText = e.target.value.toLowerCase();

    taskTitleList.forEach((task) =>{
        let title = task.textContent.toLowerCase();
        let parentNode = task.parentNode;

        if(title.includes(inputText)){
            parentNode.style.display = "block"
        } else {
            parentNode.style.display = "none"
        }
    })

})


