
const taskForm = document.getElementById('task-form');

taskForm.addEventListener('submit', e =>{
	e.preventDefault();
	console.log("submit")
  // store user value
	var item    = taskForm["task-title"];
	// create a text node from the user input
	var text    = document.createTextNode(item.value)
	// create a li tag
	var newItem = document.createElement('li')
	// add the user input to the li tag
	newItem.appendChild(text)
	// append the li to the html todoList id tag
	document.getElementById('tasks-container').appendChild(newItem)
})