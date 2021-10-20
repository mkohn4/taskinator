//set button as a js variable
var formEl = document.querySelector('#task-form');
//set task container as a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");
//declare taskIdCounter
var taskIdCounter = 0;

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
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
   
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



//listen for button click and create new list item task
formEl.addEventListener("submit", taskFormHandler);



