const submittBtn = document.querySelector(".input-submitt");
const todoArea = document.querySelector(".todo-area");
const category = document.querySelector(".input-category");
const modal = document.querySelector(".modal");

loadData();

category.addEventListener("click", () => {
  modal.classList.toggle("display-toggle");

  let addBtn = document.getElementById("modal-add");
  let removeBtn = document.getElementById("modal-remove");
  let tags = document.querySelectorAll(".tag"); //this variable is array and the items inside is typeof object
  let tagArray = [...tags];
  let checkedTag = null;

  tagArray.forEach((item) => {
    item.addEventListener("click", (e) => {
      tagArray.forEach((item) => {
        item.classList.remove("tag-checked");
      });
      e.target.classList.toggle("tag-checked");
      category.innerText = e.target.innerText;
      checkedTag = e.target;
      console.log(e.target.innerText);
    });
  });
  removeBtn.addEventListener("click", () => {
    if (checkedTag == null) {
      alert("You have to select one tag!");
      return;
    }
    checkedTag.remove();
  });
  addBtn.addEventListener("click", () => {
    let tagsContainer = document.querySelector(".tags-container");
    let tags = document.querySelectorAll(".tag");

    console.log(tags);

    let newTag = prompt("Please enter name of the new tag .", "");
    if (newTag == "" || newTag == null) {
      alert("You can't use empty name with a tag !");
      return;
    } else {
      let tagsLoop = 0;
      tags.forEach((item) => {
        if (item.innerText == newTag) {
          tagsLoop--;
        }
      });
      console.log(tagsLoop);

      if (tagsLoop < 0) {
        alert(`You already have ${newTag}, Try another name !`);
        return;
      } else {
        let newBtn = document.createElement("button");
        newBtn.innerText = newTag;
        newBtn.classList.add("tag");
        tagsContainer.appendChild(newBtn);
        console.log(`${newTag} tag adding successfully !`);
        modal.classList.toggle("display-toggle");
      }

      // tags.forEach((item) => {
      //   if (item.innerText === newTag) {
      //     alert(`You already have ${newTag}, Try another name !`);
      //   } else {
      //     let newBtn = document.createElement("button");
      //     newBtn.innerText = newTag;
      //     newBtn.classList.add("tag");
      //     tagsContainer.appendChild(newBtn);
      //     console.log(`${newTag} tag adding successfully !`);
      //     modal.classList.toggle("display-toggle");
      //   }
      // });
    }
  });
});

submittBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let form = e.target.parentElement;
  let todoText = form[0].value;
  let todoCategory = form[1].innerText;
  let todoMonth = form[2].value;
  let todoDate = form[3].value;
  console.log(form);
  if (todoCategory === "Category") {
    alert("You forgot to choose your category tag !");
    return;
  }
  if (todoText === "") {
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
