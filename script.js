const submittBtn = document.querySelector(".input-submitt");
const todoArea = document.querySelector(".todo-area");

loadData();

submittBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let form = e.target.parentElement;
  let todoText = form[0].value;
  let todoCategory = form[1].value;
  let todoMonth = form[2].value;
  let todoDate = form[3].value;
  if (todoText === "" || todoCategory === "") {
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

  todo.appendChild(text);
  todo.appendChild(category);
  todo.appendChild(time);
  //check button
  let checkBtn = document.createElement("i");
  checkBtn.innerHTML = `<i class="fa fa-check check-button"></i>`;
  checkBtn.addEventListener("click", () => {
    let todoItem = e.target.parentElement.parentElement;
    todoItem.classList.toggle("check-toggle");
  });

  let removeBtn = document.createElement("i");
  removeBtn.innerHTML = `<i class="fas fa-trash remove-button"></i>`;
  removeBtn.addEventListener("click", (e) => {
    let removeItem = e.target.parentElement.parentElement;
    let keyText = removeItem.childNodes[0].innerText;
    let listArray = JSON.parse(localStorage.getItem("list"));
    listArray.forEach((item, index) => {
      if (item.todoText == keyText) {
        listArray.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(listArray));
      }
      removeItem.remove();
      console.log("remove successfuly");
    });
  });

  todo.appendChild(checkBtn);
  todo.appendChild(removeBtn);

  let todoObject = {
    todoText: todoText,
    todoCategory: todoCategory,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };

  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([todoObject]));
  } else {
    let newListArray = JSON.parse(myList);
    newListArray.push(todoObject);
    localStorage.setItem("list", JSON.stringify(newListArray));
  }
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";
  form.children[3].value = "";
  todoArea.appendChild(todo);
});

function loadData() {
  let myList = localStorage.getItem("list");
  if (myList !== null) {
    let listArray = JSON.parse(myList);
    listArray.forEach((item) => {
      let todo = document.createElement("div");
      todo.setAttribute("draggable", true);
      todo.classList.add("todo-container");
      let text = document.createElement("p");
      text.classList.add("todo-content");
      text.innerText = item.todoText;
      let category = document.createElement("p");
      category.innerText = item.todoCategory;
      category.classList.add("todo-category");
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = `${item.todoMonth}/${item.todoDate}`;

      todo.appendChild(text);
      todo.appendChild(category);
      todo.appendChild(time);

      let checkBtn = document.createElement("i");
      checkBtn.innerHTML = `<i class="fa fa-check check-button"></i>`;
      checkBtn.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement.parentElement;
        todoItem.classList.toggle("check-toggle");
      });

      let removeBtn = document.createElement("i");
      removeBtn.innerHTML = `<i class="fas fa-trash remove-button"></i>`;
      removeBtn.addEventListener("click", (e) => {
        let removeItem = e.target.parentElement.parentElement;
        let keyText = removeItem.childNodes[0].innerText;
        let listArray = JSON.parse(localStorage.getItem("list"));
        listArray.forEach((item, index) => {
          if (item.todoText == keyText) {
            listArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(listArray));
          }
          removeItem.remove();
          console.log("remove successfuly");
        });
      });

      todo.appendChild(checkBtn);
      todo.appendChild(removeBtn);
      todoArea.appendChild(todo);
    });
  }
}
