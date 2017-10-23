import {isEnabled} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems)
    );
}

function renderApp(input, todoList) {
	if (isEnabled('renderBottom') && isEnabled('filter') && isEnabled('filterTop')) {
		return renderAddTodoAtBottomFilterTop(input, todoList)
	} else {
		if(isEnabled('renderBottom') && isEnabled('filter')) {
			return renderAddTodoAtBottomFilter(input, todoList)
		}
		else {
			if(isEnabled('filter')) {
				return renderAddTodoAtTopFilter(input, todoList);
			} else {
				if(isEnabled('renderBottom')) {
					return renderAddTodoAtBottom(input, todoList);
				} else {
					return renderAddTodoAtTop(input, todoList);
				}			
			}
		}
	}
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtTopFilter(input, todoList) {
    return `<form action="">
  <input type="radio" name="toos" value="todos" checked="">Mostrar Todos<br>
  <input type="radio" name="somenteAberto" value="somenteAberto"> Somente Aberto<br>
  <input type="radio" name="somenteFechado" value="somenteFechado"> Somente Fechado
</form>
	<div id="app">
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}
        ${input}
    </div>`;
}

function renderAddTodoAtBottomFilter(input, todoList) {
    return `
		<div id="app">
			${todoList}
			${input}
		</div>
		<form action="">
		  <input type="radio" name="toos" value="todos" checked="">Mostrar Todos<br>
		  <input type="radio" name="somenteAberto" value="somenteAberto"> Somente Aberto<br>
		  <input type="radio" name="somenteFechado" value="somenteFechado"> Somente Fechado
		</form>`;
}

function renderAddTodoAtBottomFilterTop(input, todoList) {
    return `
		<form action="">
		  <input type="radio" name="toos" value="todos" checked="">Mostrar Todos<br>
		  <input type="radio" name="somenteAberto" value="somenteAberto"> Somente Aberto<br>
		  <input type="radio" name="somenteFechado" value="somenteFechado"> Somente Fechado
		</form>
		<div id="app">
			${todoList}
			${input}
		</div>`;
}

function renderInput() {
    return `<div class="todo__input"><input type="text" id="todoInput"><button id="addTodo">Add</button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}
