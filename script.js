const formElements = [...document.querySelector(".input-container").children];
const [todoText, todoCategory, todoMonth, todoDate, submitt] = [
  ...formElements.value,
];
const todoArea = document.querySelector(".todo-area");

submitt.addEventListener("click", (e) => {
  e.preventDefault();

  if (!todoText) return alert("You forgot to write something!");
  if (todoMonth > 12 || todoMonth < 1 || todoMonth == "")
    return alert("Weired Month Value!");
  if (todoDate > 31 || todoMonth < 1 || todoDate == "")
    return alert("Weired Date Value!");
  let todoTime = `${todoMonth}/${todoDate}`;

  let newDiv = document.createElement("div");
  newDiv.classList.add("todo-container");
  let newText = document.createElement("p");
  newText.classList.add("todo-content");
  newText = todoText;
  let newCategory = document.createElement("p");
  newCategory.classList.add("todo-category");
  newCategory = todoCategory;
  let newTime = document.createElement("p");
  newTime.classList.add("todo-time");
  newTime = todoTime;

  newDiv.appendChild(newText);
  newDiv.appendChild(newCategory);
  newDiv.appendChild(newTime);
});
