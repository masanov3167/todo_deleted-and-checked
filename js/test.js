const elForm = document.querySelector(".form");
const elInput = document.querySelector(".form__input");
const elList = document.querySelector(".todo-list");

const todos = [];

elList.addEventListener("click" , evt => {
  if(evt.target.matches(".delete-item")){

    const btnId = (evt.target.dataset.todoId);

    const findIndexArr = todos.findIndex(todo => todo.id == btnId);

    todos.splice(findIndexArr, 1);

    renderTodos(todos , elList);

  }
  else if(evt.target.matches(".todo-checked")){
    const checkId = Number(evt.target.dataset.todoId);

    const findTodo = todos.find(todo => todo.id === checkId);

    findTodo.isComplate = !findTodo.isComplate;

    renderTodos(todos , elList);
  }
})



function renderTodos(arr , element){
  element.innerHTML = "";

  arr.forEach(todo => {

    const newItem = document.createElement("li");
    const newBtn = document.createElement("button");
    const inputCheck = document.createElement("input");

    newItem.textContent = todo.title;

    newBtn.textContent = "Delete";
    newBtn.classList.add("delete-item")
    newBtn.dataset.todoId = todo.id;

    inputCheck.type = "checkbox";
    inputCheck.dataset.todoId = todo.id
    inputCheck.classList.add("todo-checked");

    if(todo.isComplate){
      inputCheck.checked = true;
      newItem.style.textDecoration = "line-through";
    }


    newItem.appendChild(inputCheck);
    newItem.appendChild(newBtn);
    element.appendChild(newItem);
  });

}

elForm.addEventListener("submit" , evt => {
  evt.preventDefault();

  const elInputValue = elInput.value.trim();

  const todo = {
    // id: todos[todos.length-1]?.id + 1 || 0,
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
    title: elInputValue,
    isComplate: false,
  }

  todos.push(todo);

  renderTodos(todos, elList);

  elInput.value = "";

})
