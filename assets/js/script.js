//set button as a js variable
var formEl = document.querySelector('#task-form');
//set task container as a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    //prevent default web browser refresh on submit
    event.preventDefault();
    //select and store the task value input from the user
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //select and store the task type from the user
    var taskTypeInput = document.querySelector('select[name="task-type"]').value;
    //set variable =  list item creation
    var listItemEl = document.createElement("li");
    //add css attribute to list item
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
    //append div with task name and type to the list items
    listItemEl.appendChild(taskInfoEl);
    
    //add entire list item into the task container
    tasksToDoEl.appendChild(listItemEl);
}

//listen for button click and create new list item task
formEl.addEventListener("submit", createTaskHandler);



