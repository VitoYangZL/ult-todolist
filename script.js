const submittBtn = document.querySelector(".input-submitt");
const todoArea = document.querySelector(".todo-area");
const category = document.querySelector(".input-category");
const modal = document.querySelector(".modal");
const addBtn = document.getElementById("modal-add");
const removeBtn = document.getElementById("modal-remove");
const searchText = document.querySelector(".searchText");
const searchBtn = document.querySelector(".search-button");
let tags = document.querySelectorAll(".tag"); //this variable is array and the items inside is typeof object
let checkedTag = null;
let searchKeyword = "";

//Data Initialize
loadData();
loadTags();

//Input Control
category.addEventListener("click", () => {
  tags = document.querySelectorAll(".tag");
  modal.classList.toggle("display-toggle");

  tags.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(tags.length);

      if (tags.length == 1) {
        checkedTag = e.target;
        checkedTag.classList.toggle("tag-checked");
        if (checkedTag.classList.contains("tag-checked")) {
          category.innerText = checkedTag.innerText;
        } else {
          category.innerText = "Category";
        }
      } else {
        tags.forEach((item) => {
          item.classList.remove("tag-checked");
        });
        checkedTag = e.target;
        console.log(checkedTag);
        checkedTag.classList.toggle("tag-checked");
        category.innerText = checkedTag.innerText;
      }
    });
  });
});
removeBtn.addEventListener("click", () => {
  let tagsArray = JSON.parse(localStorage.getItem("tags"));
  if (checkedTag == null) {
    alert("You have to select one tag!");
    return;
  }
  if (tagsArray !== null) {
    for (let i = 0; i < tagsArray.length; i++) {
      if (tagsArray[i] == checkedTag.innerText) {
        tagsArray.splice(i, 1);
      }
    }
    localStorage.setItem("tags", JSON.stringify(tagsArray));
    console.log(tagsArray);
    checkedTag.remove();
    modal.classList.toggle("display-toggle");
    category.innerText = "Category";
    // tagsUpdate();
  } else {
    console.log("remove error");
  }
});
addBtn.addEventListener("click", () => {
  let tagsContainer = document.querySelector(".tags-container");
  tags = document.querySelectorAll(".tag");
  let newTag = prompt("Please enter name of the new tag .", "");
  if (newTag == "" || newTag == null) {
    alert("You can't use empty name with a tag !");
    return;
  } else {
    let tagsLoop = 0;
    tags.forEach((item) => {
      if (item.innerText == newTag) {
        tagsLoop--;
        console.log(`adding action refuse`);
      }
    });

    if (tagsLoop < 0) {
      alert(`You already have ${newTag}, Try another name !`);
      return;
    } else {
      let newBtn = document.createElement("button");
      console.log(`${newTag} tag adding successfully`);
      newBtn.innerText = newTag;
      newBtn.classList.add("tag");
      tagsContainer.appendChild(newBtn);
      modal.classList.toggle("display-toggle");
      let myTagsArray = JSON.parse(localStorage.getItem("tags"));
      if (myTagsArray == null) {
        myTagsArray = [];
      }
      myTagsArray.push(newTag);
      localStorage.setItem("tags", JSON.stringify(myTagsArray));
      console.log(myTagsArray);
      // tagsUpdate();
    }
  }
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
  checkBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-button")) {
      let todoItem = e.target.parentElement.parentElement;
      todoItem.classList.toggle("check-toggle");
    }
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
        if (e.target.classList.contains("check-button")) {
          let todoItem = e.target.parentElement.parentElement;
          todoItem.classList.toggle("check-toggle");
        }
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
function tagsUpdate() {
  tags = [...document.querySelectorAll(".tag")];
  checkedTag = null;
  console.log(`initial tags`);
  console.log(tags);
}
function loadTags() {
  let tagsContainer = document.querySelector(".tags-container");
  let myTags = localStorage.getItem("tags");
  if (myTags !== null) {
    let tagsArray = JSON.parse(myTags);
    for (let i = 0; i < tagsArray.length; i++) {
      let newTag = document.createElement("button");
      newTag.classList.add("tag");
      newTag.innerText = tagsArray[i];
      tagsContainer.appendChild(newTag);
    }
  }
}
