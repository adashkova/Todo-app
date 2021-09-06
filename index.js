const inputValue = document.querySelector('.input_value');
const todoItems = document.querySelector('.todo_items');
const btnAdd = document.querySelector('.btn_add');
const btnClear = document.querySelector('.btn_clear');
const btnDelete = document.querySelector('.btn_delete');
const filters = [...document.querySelectorAll('.filters p')];

const todo = {
  // State
  todos: [],

  // Initialisation

  init() {
    const html = `
    <div class="todo_item">
       <h3 class="no_records">Welcome  to our todo app! </h3>
    </div>
  `;
    todoItems.innerHTML = html;
  },

  // Add new item
  add() {
    const text = inputValue.value;

    if (!text) {
      alert('Please input text!!!');
    } else {
      this.todos.push({
        textTodo: text,
        isCompleted: false,
      });

      this.update(this.todos);
    }

    this.clearInputField();
  },

  // Update UI

  update(todos) {
    if (this.todos.length) {
      todoItems.innerHTML = '';
      todos.forEach(todo => {
        const html = `
          <div class="todo_item">
          <h3 ${
            todo.isCompleted ? 'class="checked" ' : ''
          } onClick="todo.checked('${todo.textTodo}')" >
          ${todo.textTodo}</h3>
          <button class="btn_delete"
           onClick="todo.deleteItem('${todo.textTodo}')">X</button>
        </div>
        `;

        todoItems.innerHTML += html;
      });
    } else {
      this.setIfNoRec();
    }
  },

  // Delete Item ftom todos
  deleteItem(text) {
    this.todos = this.todos.filter(item => item.textTodo !== text);
    this.update(this.todos);
  },

  // Clear All

  clear() {
    this.todos = [];
    this.setIfNoRec();
    this.resetActiveClass();
  },
  /// Do checked

  checked(text) {
    this.todos = this.todos.map(todo => {
      if (todo.textTodo === text) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }

      return todo;
    });

    this.resetActiveClass();

    this.update(this.todos);
  },

  // Filtration
  setFilter(filter) {
    const todos = this.todos;

    if (filter === 'All') {
      this.update(todos);
    }

    if (filter === 'Completed') {
      const complitedTodo = todos.filter(todo => todo.isCompleted);
      complitedTodo.length ? this.update(complitedTodo) : this.setIfNoRec();
    }

    if (filter === 'In Progress') {
      const inProgressTodo = todos.filter(todo => !todo.isCompleted);
      inProgressTodo.length ? this.update(inProgressTodo) : this.setIfNoRec();
    }
  },
  // Works if there are no todos
  setIfNoRec() {
    const html = `
    <div class="todo_item">
       <h3 class="no_records">No records found!</h3>
    </div>
  `;
    todoItems.innerHTML = html;
  },
  // Reset active class
  resetActiveClass() {
    filters.forEach(item => {
      item.classList.remove('active');
    });
    filters[0].classList.add('active');
  },
  // Clear input
  clearInputField() {
    inputValue.value = '';
  },
};

/////////////////////////////////////////////////////////////

// Add todos on click
btnAdd.addEventListener('click', () => {
  todo.add();
});

// Add todos on press enter

inputValue.onkeypress = e => {
  if (e.keyCode == 13) {
    btnAdd.click();
  }
};
/// Filter todos

filters.forEach(filter => {
  filter.addEventListener('click', e => {
    if (todo.todos.length) {
      filters.forEach(item => {
        item.classList.remove('active');
        e.target.classList.add('active');
      });

      const filter = e.target.textContent;

      todo.setFilter(filter);
    } else {
      filters.forEach(item => {
        item.classList.remove('active');
      });
    }
  });
});

/// Clear All
btnClear.addEventListener('click', () => {
  todo.clear();
});

todo.init();
