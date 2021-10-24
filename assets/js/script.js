//set button as a js variable
var formEl = document.querySelector('#task-form');
//set task container as a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");
//declare taskIdCounter
var taskIdCounter = 0;
//select main section as an object/element
var pageContentEl = document.querySelector('#page-content');
//get variable for tasks in progress section
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
//get variable for tasks completed section
var tasksCompletedEl = document.querySelector("#tasks-completed");
//create empty array
var tasks = [];

var taskFormHandler = function(event) {
    //prevent default web browser refresh on submit
    event.preventDefault();
    //select and store the task value input from the user
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //select and store the task type from the user
    var taskTypeInput = document.querySelector('select[name="task-type"]').value;
    
    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form");
        return false;
    }
    //reset form to wipe values
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");

    
//if li has a data attribute, so get task id and call function to complete edit process
    if(isEdit) {
        //get task id
        var taskId = formEl.getAttribute("data-task-id");
        //call completeEditTask function with name, input, and id
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
            //package up data as an object
            var taskDataObj = {
                name: taskNameInput,
                type: taskTypeInput,
                status: "to do"
            };
            //send it as an argument to createTaskEl
            createTaskEl(taskDataObj);

    }
   
}




var createTaskEl = function(taskDataObj) {

    //set variable =  list item creation
    var listItemEl = document.createElement("li");
    //add css attribute to list item
    listItemEl.className = "task-item";

    //add task id as custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    //append div with task name and type to the list items
    listItemEl.appendChild(taskInfoEl);

    //run createTaskActions function for the current counted element to create edit, delete, and select btns
    var taskActionsEl = createTaskActions(taskIdCounter);
    //append edit, delete, select to each li task
    listItemEl.appendChild(taskActionsEl);

    //set taskDataObj id = counter number
    taskDataObj.id = taskIdCounter;
    //push taskDataObj object into tasks array
    tasks.push(taskDataObj);

    //save to local storage
    saveTasks();
   
    //add entire list item into the task container
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    //create div with class task-actions
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //Create Delete Button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //create select elements and add to nox
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    //declare var for statuses
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    };



    return actionContainerEl;

};

//function to see whats being clicked and filter by delete btn
var taskButtonHandler = function(event) {
    console.log(event.target);
    //get target element from event
    var targetEl = event.target;
    //if edit, run edit, if delete run delete
    if (event.target.matches(".edit-btn")) {
        //get elements task id
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    } else if (targetEl.matches(".delete.btn")){
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var completeEditTask = function(taskName, taskType, taskId) {
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task Updated!");

//loop through tasks array and task object with new content
for (var i = 0; i < tasks.length; i++) {
    if (tasks[i] === parseInt(taskId)) {
        tasks[i].namne = taskName;
        tasks[i].type = taskType;
    }
};
    //save tasks
    saveTasks();

    //remove data-task-id attribute
    formEl.removeAttribute("data-task-id");
    //change save button back to add task text
    document.querySelector("#save-task").textContent = "Add Task";
};

//function to edit tasks
var editTask = function(taskId) {
    console.log("Editing task #" + taskId);
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //get content from task name and type
    var taskName = document.querySelector("h3.task-name").textContent;
    
    //get content from type
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    //select the task input and dropdown fields up top and replace with current edit value
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    //update button name to Save Task when editing
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};




//function to delete tasks
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create a new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i=0; i < tasks.length; i++) {
        //if tasks[i].id doesnt match the value of taskId, keep that task and push into a new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    //save to local storage
    saveTasks();
};

var taskStatusChangeHandler = function (event) {
    //get task items id
    var taskId = event.target.getAttribute("data-task-id");
    //get currently selected options value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    //find the parent task item element based on id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //based on dropdown chosen move li to the corresponding task list in each section
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    //updates tasks in tasks array
    for (var i=0; i< tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    };
    //save to local storage
    saveTasks();
};


var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function() {
    //get task items from localStorage
    tasks = localStorage.getItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
    //if tasks is null, establish it as an empty array
    if (!tasks) {
        var tasks = [];
        return false;
    } else {
        //parse tasks variable
        tasks = JSON.parse(tasks);
        console.log(tasks);
        for (i=0; i < tasks.length; i++) {
            //log current task in loop
            console.log(tasks[i]);
            //set current task object id = taskIdCounter
            tasks[i].id = taskIdCounter;
            //log current task to see updated id
            console.log(tasks[i]);
            //create li element as listItemEl
            listItemEl = document.createElement('li');
            //add a class to the li
            listItemEl.className = "task-item";
            //add data-task-id attribute to li
            listItemEl.setAttribute("data-task-id", tasks[i].id);
            //console log new element
            console.log(listItemEl);
            //create div element in taskInfoEl
            taskInfoEl = document.createElement("div");
            //assign class of task-info
            taskInfoEl.className = "task-info";
            //set inner html of div
            taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
            //append div task info to the li task items
            listItemEl.appendChild(taskInfoEl);
            //create taskActionsEl
            taskActionsEl = createTaskActions(tasks[i].id);
            //append taskActionsEl to listItemEl
            listItemEl.appendChild(taskActionsEl);
            console.log(listItemEl);
            //if current task status is to-do, then change status dropdown to to-do
            if (tasks[i].status === 'to do') {
                //set select dropdown to first value
                listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
                //append task list item to the To-Dp category list
                tasksToDoEl.appendChild(listItemEl);
            } else if (tasks[i].status === 'in progress') {
                //if task status = in progress, set selected dropdown value to 1
                listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
                tasksInProgressEl.appendChild(listItemEl);
            } else if (tasks[i].status === 'complete') {
                //if task status = complete, change dropdown to 2
                listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
                //append list item task to tasksCompletedEl box
                tasksCompletedEl.appendChild(listItemEl);
            }
            taskIdCounter++;
            console.log(listItemEl);

        }

        //convert tasks from string format into array of objects
        //iterates through a tasks array and creates task elements on the page
    }

};

//listen for button click and create new list item task
formEl.addEventListener("submit", taskFormHandler);
//listen for click on main element and run taskButtonHandler function
pageContentEl.addEventListener("click", taskButtonHandler);
//listens for a change in a dropdown and invokes taskStatusChangeHandler
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();