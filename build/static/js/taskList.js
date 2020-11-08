M.AutoInit();

// Define UI Variables

const form = document.querySelector('#task-form');
const activeTasks = document.querySelector('#active-tasks')
const taskInput = document.querySelector('#task')
const completedTasks = document.querySelector('#completed-tasks')
const clearTasks = document.querySelector('#clear-tasks')
const filter = document.querySelector('#filter');

// Add event listeners
document.addEventListener('DOMContentLoaded', getTasks);
form.addEventListener('submit', addTask);
activeTasks.addEventListener('click', removeTask);
activeTasks.addEventListener('click', completeTask);
completedTasks.addEventListener('click', uncompleteTask);
completedTasks.addEventListener('click', removeTask);
clearTasks.addEventListener('click', clearAllTasks);
filter.addEventListener('keyup', filterTasks);

// Get Tasks

function getTasks() {

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }

    tasks.forEach(function(taskItem) {

        // Create a tr element
        const tr = document.createElement('tr');
        const dateString = new Date().toDateString();
        
        
        // Create the td elements
        const task = document.createElement('td');
        task.innerHTML = taskItem.task
        const date = document.createElement('td');
        date.innerHTML = taskItem.date
        const complete = document.createElement('td');
        if (taskItem.completed) {
            complete.innerHTML = `
                <a class="waves-effect waves-light btn-small amber accent-4 uncomplete-task">Uncomplete</a>
                <a class="waves-effect waves-light btn-small red darken-2 delete-task">Delete</a>`
        } else {
            complete.innerHTML = `
                <a class="waves-effect waves-light btn-small complete-task">Complete</a>
                <a class="waves-effect waves-light btn-small red darken-2 delete-task">Delete</a>`
        }
        // Create the full tr element
        tr.appendChild(date)
        tr.appendChild(task)
        tr.appendChild(complete)

        // Store in local storage
        const taskJson = {"task":task.innerHTML, "date":dateString}

        // Append the tr element to the active tasks
        if (taskItem.completed) {
            completedTasks.appendChild(tr);
        } else {
            activeTasks.appendChild(tr);
        }

    })

}

// Add task 
function addTask(e) {
    e.preventDefault();
    if (taskInput.value === '') {
        alert('No task specified.')
    } else {
        
        // Add tasks
        addSingleTask();

        // Clear the input
        taskInput.value = '';

    }
    
}

function addSingleTask() {
    // Create a tr element
    const tr = document.createElement('tr');
    const dateString = new Date().toDateString();
    
    
    // Create the td elements
    const task = document.createElement('td');
    task.innerHTML = taskInput.value;
    const date = document.createElement('td');
    date.innerHTML = dateString;
    const complete = document.createElement('td');
    complete.innerHTML = `
        <a class="waves-effect waves-light btn-small complete-task">Complete</a>
        <a class="waves-effect waves-light btn-small red darken-2 delete-task">Delete</a>`

    // Create the full tr element
    tr.appendChild(date)
    tr.appendChild(task)
    tr.appendChild(complete)

    // Store in local storage
    const taskJson = {"task":task.innerHTML, "date":dateString, "completed":false}
    storeTaskInLS(taskJson);

    // Append the tr element to the active tasks
    activeTasks.appendChild(tr);
}

function storeTaskInLS(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLS(taskName) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index) {
      if (taskName === task.task) {
        tasks.splice(index, 1)
      }
    })
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
  }


function flipCompleteTaskLS(taskName) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    const tasksToAdd = []
    tasks.forEach(function(task, index) {
      if (taskName === task.task) {
        console.log('taskname:', taskName, 'task', task.task)
        tasks.splice(index, 1)
        if(task.completed) {
            task.completed = false;
            console.log('Set false')
        } else {
            task.completed = true;
            console.log('Set true')

        }
        console.log(tasks);
        tasksToAdd.push(task);
      }
    })
    
    tasksToAdd.forEach(function(task) {
        tasks.push(task)
    })
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

// Remove a task
function removeTask(e) {
    if (e.target.classList.contains('delete-task')){
        if (confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLS(e.target.parentElement.parentElement.children[1].innerHTML)
        }
    }
}

// Complete a task
function completeTask(e) {
    if (e.target.classList.contains('complete-task')){
        const task = e.target.parentElement.parentElement
        const completeButton = task.lastChild.firstElementChild
        completeButton.innerHTML = 'Uncomplete'
        completeButton.classList.remove('complete-task')
        completeButton.classList.add('uncomplete-task')
        completeButton.classList.add('amber')
        completeButton.classList.add('accent-4')
        // Add the task to the completed tasks
        completedTasks.appendChild(task);
        flipCompleteTaskLS(task.children[1].innerHTML)

    }
    e.preventDefault();
}

function uncompleteTask(e) {
    if (e.target.classList.contains('uncomplete-task')){
        const task = e.target.parentElement.parentElement
        const completeButton = task.lastChild.firstElementChild
        completeButton.innerHTML = 'Complete'
        completeButton.classList.remove('uncomplete-task')
        completeButton.classList.add('complete-task')
        completeButton.classList.remove('amber')
        completeButton.classList.remove('accent-4')
        // Add the task to the completed tasks
        activeTasks.appendChild(task);
        flipCompleteTaskLS(task.children[1].innerHTML)

    }
    e.preventDefault();
}

function clearAllTasks(e) {
    if (confirm('Clear all completed tasks?')) {
        while(completedTasks.firstChild) {
            completedTasks.removeChild((completedTasks.firstChild))
        }
        let tasks;
        if (localStorage.getItem('tasks') === null) {
        tasks = [];
        } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        }
    
        tasks.forEach(function(task, index) {
        if (task.completed) {
            tasks.splice(index, 1)
        }
        })
        tasks.forEach(function(task, index) {
            if (task.completed) {
                tasks.splice(index, 1)
            }
            })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('tr').forEach(function(task) {
        
        // Ignore headers
        if (task.children[0].nodeName === 'TD'){
            taskName = task.children[1].textContent;
            if (taskName.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'table-row';
              } else {
                task.style.display = 'none';
              }
        }

    })
}