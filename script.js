$(document).ready(function(){

// GET TASKS
function getTasks(){
return JSON.parse(localStorage.getItem("tasks")) || [];
}

// SAVE TASKS
function saveTasks(tasks){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

// TOAST
function showToast(msg){
$("#toast-body").text(msg);
new bootstrap.Toast($("#liveToast")[0]).show();
}

// SHOW SECTIONS
function showSection(id){

$("#add-task-section").hide();
$("#all-tasks-section").hide();
$("#edit-section").hide();

$(id).show();

}

// NAVBAR
$("#nav-add").click(()=>showSection("#add-task-section"));

$("#nav-all").click(()=>{
showSection("#all-tasks-section");
updateTable();
});



// ADD TASK
$("#task-form").submit(function(e){

e.preventDefault();

let tasks = getTasks();

let task = {

id: Date.now(),

name: $("#task-name").val(),

desc: $("#task-desc").val(),

time: $("#task-time").val(),

status: "Pending"

};

tasks.push(task);

saveTasks(tasks);

this.reset();

showToast("Task Added Successfully");

updateTable();

});



// UPDATE TABLE
function updateTable(filter="All"){

let tasks = getTasks();

$("#task-list").empty();

tasks.forEach(task=>{

if(filter==="All" || task.status===filter){

$("#task-list").append(`

<tr>

<td>${task.name}</td>

<td>${task.desc}</td>

<td>${task.time}</td>

<td>${task.status}</td>

<td>

<button class="btn btn-sm btn-primary edit" data-id="${task.id}">
<i class="bi bi-pencil"></i>
</button>

<button class="btn btn-sm btn-success complete" data-id="${task.id}">
<i class="bi bi-check"></i>
</button>

<button class="btn btn-sm btn-danger delete" data-id="${task.id}">
<i class="bi bi-trash"></i>
</button>

</td>

</tr>

`);

}

});

}



// DELETE TASK
$(document).on("click",".delete",function(){

let id=$(this).data("id");

let tasks=getTasks();

tasks=tasks.filter(t=>t.id!=id);

saveTasks(tasks);

updateTable();

showToast("Task Deleted");

});



// COMPLETE TASK
$(document).on("click",".complete",function(){

let id=$(this).data("id");

let tasks=getTasks();

tasks=tasks.map(t=>{

if(t.id==id){
t.status="Completed";
}

return t;

});

saveTasks(tasks);

updateTable();

showToast("Task Completed");

});



// EDIT BUTTON
$(document).on("click",".edit",function(){

let id=$(this).data("id");

let tasks=getTasks();

let task=tasks.find(t=>t.id==id);

$("#edit-id").val(task.id);

$("#edit-name").val(task.name);

$("#edit-desc").val(task.desc);

$("#edit-time").val(task.time);

showSection("#edit-section");

});



// SAVE EDIT
$("#edit-form").submit(function(e){

e.preventDefault();

let id=$("#edit-id").val();

let tasks=getTasks();

tasks=tasks.map(t=>{

if(t.id==id){

t.name=$("#edit-name").val();

t.desc=$("#edit-desc").val();

t.time=$("#edit-time").val();

}

return t;

});

saveTasks(tasks);

showToast("Task Updated");

showSection("#all-tasks-section");

updateTable();

});



// FILTERS
$("#filter-all").click(()=>updateTable("All"));

$("#filter-completed").click(()=>updateTable("Completed"));

$("#filter-pending").click(()=>updateTable("Pending"));



// LOAD TASKS ON PAGE LOAD
updateTable();

showSection("#all-tasks-section");

});