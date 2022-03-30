const form = document.createElement("form");
form.setAttribute("method", "POST");
form.setAttribute("autocomplete", "off");
form.setAttribute("class", "form");
document.body.appendChild(form);

const formInput = document.createElement("input");
formInput.setAttribute("class","form__input");
formInput.setAttribute("type","text");
formInput.setAttribute("maxlength","35");
formInput.setAttribute("minlength","3");
formInput.setAttribute("placeholder","write the text");
formInput.setAttribute("aria-label","type your task..");
formInput.setAttribute("required","true");
form.appendChild(formInput);

const formBtn = document.createElement("button");
formBtn.setAttribute("type","submit");
formBtn.textContent = "Add";
formBtn.classList.add("form__btn");
form.appendChild(formBtn);

const btnContainer = document.createElement("div");
btnContainer.classList.add("btn__container","display-none");
document.body.appendChild(btnContainer);

const allBtn = document.createElement("button");
allBtn.setAttribute("type","submit");
allBtn.textContent = "All tasks";

const allCount = document.createElement("strong");
allBtn.appendChild(allCount);

btnContainer.appendChild(allBtn);

const completedBtn = document.createElement("button");
completedBtn.setAttribute("type","submit");
completedBtn.textContent = "Completed";

const completedCount = document.createElement("strong");
completedBtn.appendChild(completedCount);

btnContainer.appendChild(completedBtn);

const unCompletedBtn = document.createElement("button");
unCompletedBtn.setAttribute("type","submit");
unCompletedBtn.textContent = "Uncompleted";

const unCompletedCount = document.createElement("strong");
unCompletedBtn.appendChild(unCompletedCount);

btnContainer.appendChild(unCompletedBtn);

const list = document.createElement("ol");
list.classList.add("list");
document.body.appendChild(list);

const todos = [];



list.addEventListener("click", evt => {
    if(evt.target.matches(".delete__item")){
        const elementId = (evt.target.dataset.deletedItemId);

        const findIndexArr = todos.findIndex(todo => todo.id == elementId);

        todos.splice(findIndexArr, 1);

        let all = todos.length;
        allCount.textContent = ` ${all}`;
        unCompletedCount.textContent = ` ${all}`;
        
        let unCompleted = 0;
         let completed = 0;
        
         const result = todos.filter(a => {
             if(a.isComplate){
                 completed += 1;
             }else{
                unCompleted +=1;
             }
         });
        //  console.log(sum);
         completedCount.textContent = ` ${completed}`;
         unCompletedCount.textContent = ` ${unCompleted}`;

        renderTodos(todos, list);
    }
     if(evt.target.matches(".checked__item")){
         const checkBoxId = (evt.target.dataset.checkedItemId)
         
         const findCkeckedId = todos.find(todo => todo.id == checkBoxId)

         findCkeckedId.isComplate = !findCkeckedId.isComplate;

         let unCompleted = 0;
         let completed = 0;
        
         const result = todos.filter(a => {
             if(a.isComplate){
                 completed += 1;
             }else{
                unCompleted +=1;
             }
         });
        //  console.log(sum);
         completedCount.textContent = ` ${completed}`;
         unCompletedCount.textContent = ` ${unCompleted}`;

         renderTodos(todos, list);
     }
});


function renderTodos(arr, element){
    element.innerHTML = "";

    arr.forEach(todo => {
        const createdItem = document.createElement("li");
        createdItem.classList.add("list__item");
        createdItem.textContent = todo.title;
        element.appendChild(createdItem);

        const newContainer = document.createElement("div");
        newContainer.classList.add("new__container");
        createdItem.appendChild(newContainer);

        const itemChecker = document.createElement("input");
        itemChecker.setAttribute("type","checkbox");
        itemChecker.classList.add("checked__item");
        itemChecker.dataset.checkedItemId = todo.id;
        newContainer.appendChild(itemChecker);

        const createdItemBtn = document.createElement("div");
        createdItemBtn.classList.add("delete__item");
        createdItemBtn.dataset.deletedItemId = todo.id;
        newContainer.appendChild(createdItemBtn);

        if(todo.isComplate){
            itemChecker.checked = true;
            createdItem.style.textDecoration = "line-through";
          }

          
    })
}

form.addEventListener("submit", evt => {
    evt.preventDefault();

    let inputVal = formInput.value;

    const todo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
        title: inputVal,
        isComplete: false,
    }
 
    todos.push(todo);

    let all = todos.length;
    allCount.textContent = ` ${all}`;
    
    let unCompleted = 0;
    let completed = 0;
        
    const result = todos.filter(a => {
         if(a.isComplate){
             completed += 1;
         }else{
            unCompleted +=1;
         }
     });
     completedCount.textContent = ` ${completed}`;
     unCompletedCount.textContent = ` ${unCompleted}`;

    renderTodos(todos, list);

    formInput.value = "";
});