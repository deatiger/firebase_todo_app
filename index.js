const taskForm = document.getElementById('todo-form');

taskForm.addEventListener('submit', e =>{
	e.preventDefault();
	console.log("submit")
	// store user value
	const item = taskForm["todo-title"];
	const todoName = item.value;

	// create list item to be able to check
	const newItem = `<li class="list-item">
						<input type="checkbox" id="todo-${todoName}" class="checkbox">
						<label for="todo-${todoName}">${todoName}</label>
					 </li>`

	document.getElementById('todo-container').insertAdjacentHTML('beforeend', newItem)
})