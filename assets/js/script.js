//set button as a js variable
var formEl = document.querySelector('#task-form');
//set task container as a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    //prevent default web browser refresh on submit
    event.preventDefault();
    //set variable =  list item creation
    var listItemEl = document.createElement("li");
    //add list item into the task container
    tasksToDoEl.appendChild(listItemEl);
    //add css attribute to list item
    listItemEl.className = "task-item";
    //add text to list item
    listItemEl.textContent = "This is a new task.";
}

//listen for button click and create new list item task
formEl.addEventListener("submit", createTaskHandler);



