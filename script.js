////////////////////////////////////////////////////////////////////////////////////////////////
//// Defining Main Functions and Callback Functions	////////////////////////////////////////////

// Purpose: When you hit enter the task entered is put onto the To Do List.
var newTaskEntered = function(e) {
  if (e.keyCode == 13) { //Enter Key
    var textInputToDoList = document.getElementById("textInputToDoList");
    var task = textInputToDoList.value;
    textInputToDoList.value = "";
    //Create an element
    var liElement = document.createElement("li");
    var text = document.createTextNode(task);
    liElement.appendChild(text);
    liElement.className = "toDoListItem";
    document.getElementById("toDoList").appendChild(liElement);
  }
};

// Purpose: Clicking on a task on the To Do List moves the task over to the completed tasks list.
var completeATask = function(completedTaskText) {
  var liElement = document.createElement("li");
  var text = document.createTextNode(completedTaskText);
  liElement.appendChild(text);
  liElement.className = "completedListItem";
  document.getElementById("completedList").appendChild(liElement);
};

// Purpose: Save your lists for future use.  This pursists on future visits in local storage.
var saveTasks = function() {
  var saveObject = { toDoListItems: [], completedListItems: []}
  var toDoListItems = document.getElementsByClassName('toDoListItem');
  for (var i = 0; i < toDoListItems.length; i++) {
    saveObject.toDoListItems.push(toDoListItems[i].innerHTML);
  }
  var completedListItems = document.getElementsByClassName('completedListItem');
  for (var i = 0; i < completedListItems.length; i++) {
    saveObject.completedListItems.push(completedListItems[i].innerHTML);
  }  
  localStorage.setItem('saveObject', JSON.stringify(saveObject));
  alert('Save Complete');
};

// Purpose: Load your saved file from local storage and load it onto the screen.
var loadSavedFile = function() {
  var retrievedObject = localStorage.getItem('saveObject');
  var loadObject = JSON.parse(retrievedObject);
  var textInputToDoList = document.getElementById("textInputToDoList");
  $('.toDoListItem').hide();
  $('.toDoListItem').removeClass();
  $('.completedListItem').hide();
  $('.completedListItem').removeClass();
  textInputToDoList.value = "";
  //Create saved toDoListItems
  for (var i = 0; i < loadObject.toDoListItems.length; i++) {
    var liElement = document.createElement("li");
    var text = document.createTextNode(loadObject.toDoListItems[i]);
    liElement.appendChild(text);
    liElement.className = "toDoListItem";
    document.getElementById("toDoList").appendChild(liElement);
  }
  //Create saved completedListItems
  for (var i = 0; i < loadObject.completedListItems.length; i++) {
    var liElement = document.createElement("li");
    var text = document.createTextNode(loadObject.completedListItems[i]);
    liElement.appendChild(text);
    liElement.className = "completedListItem";
    document.getElementById("completedList").appendChild(liElement);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
//// Main Event Listeners and Function Calls	//////////////////////////////////////////////////

// Purpose: Check to see if enter is pressed.  This will create new tasks for the To Do List.
document.getElementById("textInputToDoList").addEventListener("keypress", newTaskEntered)

// Purpose: When focus is removed from the input field the following happens:
// 1) The To Do List items lose all their event listeners and gain a new one.
// 2) The input field becomes blank again.
$(document).on('blur','#textInputToDoList',function() {
  $('.toDoListItem').off('click').on("click",function() {
    var content = $(this).text();
    $(this).removeClass('toDoListItem');
    $(this).hide();
    completeATask(content);
  });
  textInputToDoList.value = "";
});

// Purpose: Sets up the button events after the page loads.
$(document).ready(function() {
  $('#clearToDoListButton').click(function() {
    $('.toDoListItem').hide();
    $('.toDoListItem').removeClass();
  });
  $('#clearCompletedListButton').click(function() {
    $('.completedListItem').hide();
    $('.completedListItem').removeClass();
  });
  $('#saveTasksButton').click(function() {
    saveTasks(); 
  });
  $('#loadSavedFileButton').click(function() {
    loadSavedFile();
    $('.toDoListItem').off('click').on("click",function() {
      var content = $(this).text();
      $(this).removeClass('toDoListItem');
      $(this).hide();
      completeATask(content);
    });
  })
});