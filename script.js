window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const newTodoForm = document.querySelector("#new-todo-form");
  const clearBtn = document.querySelector(".btnClear");
  
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newInput = content.value;
    const OP = e.target.category.value.length;

    if(newInput === "") {
      alert(`"You must write something"`);
      content.focus();
    } else if(OP === 0) {
      alert(`"Please select an items"`);
      content.focus();
    } else {
      const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime(),
      };
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      // <-- Reset the form -->
      e.target.reset();   
      DisplayTodos();
    }
  });
  // <-- Clear List -->
  clearBtn.addEventListener("click", (e) => {
    confirm("Are you sure you want to delete all items?")
     ? (todos = [], localStorage.clear() ,DisplayTodos(todos)) : null;
  });
  DisplayTodos();
});


  function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");              
  const countList = document.getElementById("countList")
  
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");
    
    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" on readonly>`;
    edit.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }
      DisplayTodos();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      if(edit.innerText.toLowerCase() == "edit") {
        edit.innerText = "Save";
        edit.style.backgroundRepeat = "red";
        input.removeAttribute("readonly");
        input.focus().span;
      }else {
        input.setAttribute("readonly", true);
        edit.innerHTML = "Edit";
        todo.content = input.value.trim();
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      }

    });

    deleteBtn.addEventListener("click", (e) => {
      if (confirm("Are you sure you want to delete this item?")) {
        todos = todos.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      }
    });
  });
  countList.textContent = todos.length;
}