let tasks = [];

let addTask = () => {
  let taskInput = document.getElementById('taskInput');
  let taskText = taskInput.value.trim();
  if (taskText !== '') {
    tasks.push(taskText);
    displayTasks();
    taskInput.value = ''; 
  }
}

let bool = true; 
let sortTasks = () => {  
  let img = document.querySelector("#sortImg");
  if (bool == true) {
    img.src = "/Group 90.png";
    tasks.sort((a, b) => a.localeCompare(b)); 
    bool = false; 
  } else {    
    img.src = "/Group 38.png";
    tasks.sort((a, b) => b.localeCompare(a)); 
    bool = true; 
  }
  displayTasks();
}

let deleteTask = (index) => {
  tasks.splice(index, 1);
  displayTasks();
}

let removeInput = () => {
  let del = document.getElementById('taskInput');
  if(del){
    del.value = "";
  }
}

let displayTasks = () => {
  let taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; 

  tasks.forEach((item, i) => {
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = item;
    li.appendChild(span);

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteTask(i);
    li.appendChild(deleteBtn);

    li.draggable = true;
    li.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', i);
    });

    li.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    li.addEventListener('drop', (event) => {
      event.preventDefault();
      let fromIndex = event.dataTransfer.getData('text/plain');
      let toIndex = i;

      let movedTask = tasks.splice(fromIndex, 1)[0];
      tasks.splice(toIndex, 0, movedTask);

      displayTasks();
    });

    taskList.appendChild(li);
  });
}

displayTasks();
