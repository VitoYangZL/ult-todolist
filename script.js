const submittBtn = document.querySelector(".input-submitt")
const todoArea = document.querySelector(".todo-area");

submittBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let form = e.target.parentElement;
  console.log(form);
  let todoText = form[0].value;
  let todoCategory = form[1].value;
  let todoMonth = form[2].value;
  let todoDate = form[3].value;
  if (todoText === "" || todoCategory ==="") {
    alert("You forgot to write something.");
    return;
  }
  if (todoMonth > 12 || todoMonth < 1 || todoMonth === "") {
    alert("Your Month is weired , plz try again");
    return;
  }
  if (todoDate > 31 || todoDate < 1 || todoDate === "") {
    alert("Your Date is weired , plz try again");
    return;
  }
  if (todoMonth === "2") {
    if (todoDate > 29 || todoDate < 1 || todoDate === "") {
      alert("What's wrong with your February?");
      return;
    }
  }

  let todo = document.createElement("div");
  todo.setAttribute("draggable", true);
  todo.classList.add("todo-container");
  let text = document.createElement("p");
  text.classList.add("todo-content");
  text.innerText = todoText;
  let category = document.createElement("p");
  category.classList.add("todo-category");
  category.innerText = todoCategory;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = `${todoMonth}/${todoDate}`;
  todoArea.appendChild(todo);
  todo.appendChild(text);
  todo.appendChild(category);
  todo.appendChild(time);

  //check button
  let checkBtn = document.createElement('i')
  checkBtn.innerHTML = `<i class="fa fa-check check-button"></i>`;
  todo.appendChild(checkBtn);

  checkBtn.addEventListener('click', e=>{

    let todoItem = e.target.parentElement.parentElement;
    todoItem.classList.toggle('check-toggle')
  })



});
