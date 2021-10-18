//set button as a js variable
var formEl = document.querySelector('#task-form');
//set task container as a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    //prevent default web browser refresh on submit
    event.preventDefault();
    //select and store the task value input from the user
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //select and store the task type from the user
    var taskTypeInput = document.querySelector('select[name="task-type"]').value;
    
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

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    //append div with task name and type to the list items
    listItemEl.appendChild(taskInfoEl);
    
    //add entire list item into the task container
    tasksToDoEl.appendChild(listItemEl);
}

//listen for button click and create new list item task
formEl.addEventListener("submit", taskFormHandler);



