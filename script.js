const submittBtn = document.querySelector(".input-submitt");
const sortByTimeBtn = document.querySelector(".input-sort-by-time");
const todopinArea = document.querySelector(".todo-pin-container");
const todoUnpinArea = document.querySelector(".todo-unpin-container");
const category = document.querySelector(".input-category");
const modal = document.querySelector(".modal");
const addBtn = document.getElementById("modal-add");
const removeBtn = document.getElementById("modal-remove");
const searchBtn = document.querySelector(".search-button");
const result = document.querySelector(".result");
const closeBtn = document.querySelector(".result-close-button");
const colorSwitch = document.getElementById("ball");
const root = document.documentElement;
let searchText = document.querySelector(".search-text");
let tags = document.querySelectorAll(".tag");
let checkedTag = null;
let searchKeyword = "";

//Initialize
colorModeInitialize();
loadData();
loadTags();
//Color Mode - Be careful to do anything in this
colorSwitch.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  let mode = JSON.parse(localStorage.getItem("state"));
  if (mode.color === "light") {
    root.style.setProperty("--background-color", "#000");
    root.style.setProperty("--text-color", "rgb(231, 231, 231)");
    root.style.setProperty("--component-color", "#da4167");
    root.style.setProperty("--interaction-color", "#f4d35e");
    root.style.setProperty("--background-color-modal", "#333");

    root.style.setProperty("--color-mode-active", "#000");
    root.style.setProperty("--color-mode-passive", "#da4167");

    root.style.setProperty("--color-light-side", "#000");
    root.style.setProperty("--color-dark-side", "#f4d35e");
    colorSwitch.classList.remove("ball-light");
    colorSwitch.classList.add("ball-dark");

    mode.color = "dark";
    localStorage.setItem("state", JSON.stringify(mode));
    console.log("dark mode");
  } else if (mode.color === "dark") {
    root.style.setProperty("--background-color", "rgb(231, 231, 231)");
    root.style.setProperty("--text-color", "#000");
    root.style.setProperty("--component-color", "#f4d35e");
    root.style.setProperty("--interaction-color", "#da4167");
    root.style.setProperty("--color-mode-active", "#da4167");
    root.style.setProperty("--color-mode-passive", "#000");
    root.style.setProperty("--background-color-modal", "#eee");

    root.style.setProperty("--color-light-side", "#da4167");
    root.style.setProperty("--color-dark-side", "#000");
    colorSwitch.classList.remove("ball-dark");
    colorSwitch.classList.add("ball-light");

    mode.color = "light";
    localStorage.setItem("state", JSON.stringify(mode));
    console.log("light mode");
  } else {
    alert("somewhere getting wrong , plz contact us .");
    return;
  }
});
//Category-Controller
category.addEventListener("click", (e) => {
  e.preventDefault();
  tags = document.querySelectorAll(".tag");
  tagsContainer = document.querySelector(".tags-container");
  modal.classList.toggle("display");
  tagsContainer.addEventListener("click", (e) => {
    event.stopImmediatePropagation();
    if (e.target.classList.contains("tag")) {
      // obj=1
      if (tagsContainer.length == 1) {
        //n -> y
        if (!checkedTag.classList.contains("tag-checked")) {
          checkedTag = e.target;
          checkedTag.classList.add("tag-checked");
          category.innerText = checkedTag.innerText;
        } else {
          //y -> n
          checkedTag = null;
          checkedTag.classList.remove("tag-checked");
          category.innerText = "Category";
        }
        //obj > 1
      } else {
        //n -> y
        if (checkedTag == null) {
          checkedTag = e.target;
          checkedTag.classList.add("tag-checked");
          category.innerText = checkedTag.innerText;
        } else {
          //same tag toggle
          if (e.target.classList.contains("tag-checked")) {
            checkedTag.classList.remove("tag-checked");
            category.innerText = "Category";
            checkedTag = null;
          } else {
            // 1 to another
            if (e.target !== checkedTag) {
              checkedTag.classList.remove("tag-checked");
              checkedTag = e.target;
              checkedTag.classList.add("tag-checked");
              category.innerText = checkedTag.innerText;
            }
          }
        }
      }
    }
  });
});

//Category-Remove
removeBtn.addEventListener("click", () => {
  let removeItem;
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
    removeItem = checkedTag;
    removeItem.remove();
    checkedTag = null;

    modal.classList.toggle("display");
    category.innerText = "Category";
    tagsUpdate();
  } else {
    console.log("remove error");
  }
});
//Category-Add
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
      modal.classList.toggle("display");
      let myTagsArray = JSON.parse(localStorage.getItem("tags"));
      if (myTagsArray == null) {
        myTagsArray = [];
      }
      myTagsArray.push(newTag);
      localStorage.setItem("tags", JSON.stringify(myTagsArray));
      tags = document.querySelectorAll("tag");
      checkedTag = null;
    }
  }
});
//Submoitt-Create New Object
submittBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let form = e.target.parentElement;
  let todoText = form[0].value;
  let todoCategory = form[1].innerText;
  let todoMonth = form[2].value;
  let todoDate = form[3].value;
  let todoCheck = false;
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
  let pin = document.createElement("i");
  pin.innerHTML = `<i class="fa fa-thumb-tack todo-pin"></i>`;
  pin.classList.add("todo-pin");
  let text = document.createElement("p");
  text.classList.add("todo-content");
  text.innerText = todoText;
  let category = document.createElement("p");
  category.classList.add("todo-category");
  category.innerText = todoCategory;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = `${todoMonth}/${todoDate}`;

  todo.appendChild(pin);
  todo.appendChild(text);
  todo.appendChild(category);
  todo.appendChild(time);
  //generate first object
  let todoObject = {
    todoText: todoText,
    todoCategory: todoCategory,
    todoMonth: todoMonth,
    todoDate: todoDate,
    todoCheck: todoCheck,
    pinState: false,
  };
  //to local storage
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([todoObject]));
  } else {
    let newListArray = JSON.parse(myList);
    newListArray.push(todoObject);
    localStorage.setItem("list", JSON.stringify(newListArray));
  }
  //check button
  let checkBtn = document.createElement("i");
  checkBtn.innerHTML = `<i class="fa fa-check check-button"></i>`;
  checkBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa")) {
      let todoItem = e.target.parentElement.parentElement;
      if (!todoItem.classList.contains("check-toggle")) {
        todoItem.classList.add("check-toggle");
        todoCheck = true;
        console.log(todoCheck);
        let listArray = JSON.parse(localStorage.getItem("list"));
        listArray.forEach((item) => {
          if (todoItem.children[1].innerText === item.todoText) {
            item.todoCheck = true;
          }
        });
        localStorage.setItem("list", JSON.stringify(listArray));
      } else {
        todoItem.classList.remove("check-toggle");
        todoCheck = false;
        console.log(todoCheck);
        let listArray = JSON.parse(localStorage.getItem("list"));
        listArray.forEach((item) => {
          if (todoItem.children[1].innerText === item.todoText) {
            item.todoCheck = false;
          }
        });
        localStorage.setItem("list", JSON.stringify(listArray));
      }
    }
  });
  todo.appendChild(checkBtn);
  //remove button
  let removeBtn = document.createElement("i");
  removeBtn.innerHTML = `<i class="fas fa-trash remove-button"></i>`;
  removeBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("fas")) {
      let removeItem = e.target.parentElement.parentElement;
      let keyText = removeItem.childNodes[1].innerText;
      let listArray = JSON.parse(localStorage.getItem("list"));
      listArray.forEach((item, index) => {
        if (item.todoText == keyText) {
          listArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(listArray));
        }
        removeItem.remove();
        console.log("remove successfuly");
      });
    }
  });
  todo.appendChild(removeBtn);
  //pin button
  pin.addEventListener("click", (e) => {
    if (e.target.classList.contains("todo-pin")) {
      let pinItem = e.target.parentElement.parentElement;
      let keyText = pinItem.childNodes[1].innerText;
      let listArray = JSON.parse(localStorage.getItem("list"));
      listArray.forEach((item) => {
        if (item.todoText == keyText) {
          if (item.pinState == false) {
            item.pinState = true;
            todopinArea.appendChild(pinItem);
            localStorage.setItem("list", JSON.stringify(listArray));
          } else {
            item.pinState = false;
            todoUnpinArea.appendChild(pinItem);
            localStorage.setItem("list", JSON.stringify(listArray));
          }
        }
      });
    }
  });
  //reset input
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";
  form.children[3].value = "";
  todoUnpinArea.appendChild(todo);
  modal.classList.add("display");
});
//Sort - By Time (I will do another MergeSort if I am Free)
sortByTimeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let listArray = JSON.parse(localStorage.getItem("list"));
  listArray = sortByTime(listArray).reverse();
  localStorage.setItem("list", JSON.stringify(listArray));
  loadData();
});
//Search - Accuracy way , I do this first 😂 , I figure this way by myself
searchBtn.addEventListener("click", () => {
  let rate = 0;
  let calcAcc = 0;
  let calcRate = 0;
  let highest = "";
  let searchArray = [];
  let myList = JSON.parse(localStorage.getItem("list"));
  searchText = document.querySelector(".search-text");
  if (searchText.value == "") {
    alert("You must have to write some keyword before searching.");
    return;
  } else {
    searchKeyword = searchText.value.toLowerCase();
    console.log(`search: ${searchKeyword}`);
    searchText.value = "";
    result.classList.remove("display");
    myList.forEach((item) => {
      searchArray.push(item.todoText.toLowerCase());
    });
    searchArray.forEach((item) => {
      let charArraySearch = [];
      let charArrayData = [];
      for (let i = 0; i < searchKeyword.length; i++) {
        charArraySearch.push(searchKeyword[i]);
      }
      for (let j = 0; j < item.length; j++) {
        charArrayData.push(item[j]);
      }
      for (let x = 0; x < charArraySearch.length; x++) {
        if (charArraySearch[x] == charArrayData[x]) {
          calcAcc++;
        }
      }
      calcRate = Math.floor((calcAcc / charArrayData.length) * 100);
      if (calcRate > rate) {
        rate = calcRate;
        highest = item;
      }
      calcAcc = 0;
    });
    let highestObj = myList.find(
      (item) => item.todoText.toLowerCase() == highest
    );
    console.log(highest, myList, highestObj);

    if (rate != 0 || rate != false) {
      let condition = document.querySelector(".search-condition");
      let display = document.querySelector(".search-display");
      condition.innerHTML = `Keyword:${searchKeyword} , Accuracy:${rate}%`;
      display.innerHTML = `Name:${highest} , Category:${highestObj.todoCategory} , Date:${highestObj.todoMonth}/${highestObj.todoDate}`;
    } else {
      let condition = document.querySelector(".search-condition");
      let display = document.querySelector(".search-display");
      condition.innerHTML = `Keyword:${searchKeyword} , Accuracy:0%`;
      display.innerHTML = `I can't find this , coz my creater is noob  , plz try a phrase which is more straight again.`;
    }
    rate = 0;
  }
});
//Result modal
closeBtn.addEventListener("click", () => {
  result.classList.add("display");
});

//Dug sheet
function loadData() {
  let todoAll = document.querySelectorAll(".todo-container");
  let myList = localStorage.getItem("list");
  todoAll.forEach((item) => {
    item.remove();
  });
  if (myList !== null) {
    let listArray = JSON.parse(myList);
    listArray.forEach((item) => {
      let todo = document.createElement("div");
      todo.setAttribute("draggable", true);
      todo.classList.add("todo-container");
      let pin = document.createElement("i");
      pin.innerHTML = `<i class="fa fa-thumb-tack todo-pin"></i>`;
      pin.classList.add("todo-pin");
      let text = document.createElement("p");
      text.classList.add("todo-content");
      text.innerText = item.todoText;
      let category = document.createElement("p");
      category.innerText = item.todoCategory;
      category.classList.add("todo-category");
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = `${item.todoMonth}/${item.todoDate}`;
      todo.appendChild(pin);
      todo.appendChild(text);
      todo.appendChild(category);
      todo.appendChild(time);

      let checkBtn = document.createElement("i");
      checkBtn.innerHTML = `<i class="fa fa-check check-button"></i>`;
      if (item.todoCheck == true) {
        todo.classList.add("check-toggle");
      }
      checkBtn.addEventListener("click", (e) => {
        if (e.target.classList.contains("fa")) {
          let todoItem = e.target.parentElement.parentElement;
          if (!todoItem.classList.contains("check-toggle")) {
            todoItem.classList.add("check-toggle");
            todoCheck = true;
            console.log(todoCheck);
            let listArray = JSON.parse(localStorage.getItem("list"));
            listArray.forEach((item) => {
              if (todoItem.children[1].innerText === item.todoText) {
                item.todoCheck = true;
              }
            });
            localStorage.setItem("list", JSON.stringify(listArray));
          } else {
            todoItem.classList.remove("check-toggle");
            todoCheck = false;
            let listArray = JSON.parse(localStorage.getItem("list"));
            listArray.forEach((item) => {
              if (todoItem.children[1].innerText === item.todoText) {
                item.todoCheck = false;
              }
            });
            localStorage.setItem("list", JSON.stringify(listArray));
          }
        }
      });

      let removeBtn = document.createElement("i");
      removeBtn.innerHTML = `<i class="fas fa-trash remove-button"></i>`;
      removeBtn.addEventListener("click", (e) => {
        if (e.target.classList.contains("fas")) {
          let removeItem = e.target.parentElement.parentElement;
          let keyText = removeItem.childNodes[1].innerText;
          let listArray = JSON.parse(localStorage.getItem("list"));
          listArray.forEach((item, index) => {
            if (item.todoText == keyText) {
              listArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(listArray));
            }
            removeItem.remove();
            console.log("remove successfuly");
          });
        }
      });
      pin.addEventListener("click", (e) => {
        if (e.target.classList.contains("todo-pin")) {
          let pinItem = e.target.parentElement.parentElement;
          let keyText = pinItem.childNodes[1].innerText;
          let listArray = JSON.parse(localStorage.getItem("list"));
          listArray.forEach((item) => {
            if (item.todoText == keyText) {
              if (item.pinState == false) {
                item.pinState = true;
                todopinArea.appendChild(pinItem);
                localStorage.setItem("list", JSON.stringify(listArray));
              } else {
                item.pinState = false;
                todoUnpinArea.appendChild(pinItem);
                localStorage.setItem("list", JSON.stringify(listArray));
              }
            }
          });
        }
      });

      todo.appendChild(checkBtn);
      todo.appendChild(removeBtn);
      if (item.pinState == true) {
        todopinArea.appendChild(todo);
      } else {
        todoUnpinArea.appendChild(todo);
      }
    });
  }
}
function tagsUpdate() {
  tags = document.querySelectorAll(".tag");
  checkedTag = null;
  console.log(`tags upadte`);
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
function sortByTime(array) {
  let saveArray = array;
  let counter = array.length;
  return sorting(saveArray, counter);
}
function sorting(array, counter) {
  let compare = 0;
  let order = 0;
  let sortedArray = [];
  for (let i = 0; i < counter; i++) {
    array.forEach((item, index) => {
      if (Number(item.todoMonth + item.todoDate / 100) > compare) {
        compare = Number(item.todoMonth + item.todoDate / 100);
        order = index;
      }
    });
    sortedArray.push(array[order]);
    array.splice(order, 1);
    compare = 0;
    order = 0;
  }
  // console.log(sortedArray);
  return sortedArray;
}
function colorModeInitialize() {
  let mode = JSON.parse(localStorage.getItem("state"));
  if (mode == null) {
    let bodyState = {
      color: "light",
      // userToken:,
      // userVerify:,
    };
    localStorage.setItem("state", JSON.stringify(bodyState));
  } else {
    if (mode.color === "light") {
      root.style.setProperty("--background-color", "rgb(231, 231, 231)");
      root.style.setProperty("--text-color", "#000");
      root.style.setProperty("--component-color", "#f4d35e");
      root.style.setProperty("--interaction-color", "#da4167");
      root.style.setProperty("--color-mode-active", "#da4167");
      root.style.setProperty("--color-mode-passive", "#000");
      root.style.setProperty("--background-color-modal", "#eee");

      root.style.setProperty("--color-light-side", "#da4167");
      root.style.setProperty("--color-dark-side", "#000");
      colorSwitch.classList.remove("ball-dark");
      colorSwitch.classList.add("ball-light");
    } else if (mode.color === "dark") {
      root.style.setProperty("--background-color", "#000");
      root.style.setProperty("--text-color", "rgb(231, 231, 231)");
      root.style.setProperty("--component-color", "#da4167");
      root.style.setProperty("--interaction-color", "#f4d35e");
      root.style.setProperty("--background-color-modal", "#333");

      root.style.setProperty("--color-mode-active", "#000");
      root.style.setProperty("--color-mode-passive", "#da4167");

      root.style.setProperty("--color-light-side", "#000");
      root.style.setProperty("--color-dark-side", "#f4d35e");
      colorSwitch.classList.remove("ball-light");
      colorSwitch.classList.add("ball-dark");
    }
  }
}
