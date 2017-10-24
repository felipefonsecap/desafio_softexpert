import {isEnabled} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
		renderFiltro()
    );
}

function renderApp(input, todoList, filtro) {
	return renderTitulo() + renderCorpo(input, todoList, filtro);
}

function renderCorpo(input, todoList, filtro) {
	if (isEnabled('renderBottom') && isEnabled('filter') && isEnabled('filterTop')) {
		return renderAddTodoAtBottomFilterTop(input, todoList, filtro)
	} else {
		if(isEnabled('renderBottom') && isEnabled('filter')) {
			return renderAddTodoAtBottomFilter(input, todoList, filtro)
		}
		else {
			if(isEnabled('filter')) {
				return renderAddTodoAtTopFilter(input, todoList, filtro);
			} else {
				if(isEnabled('renderBottom')) {
					return renderAddTodoAtBottom(input, todoList, '');
				} else {
					return renderAddTodoAtTop(input, todoList, '');
				}			
			}
		}
	}
}

function renderTitulo() {
	return '<h2 id="titulo">Todo List</h2>';
}

function renderAddTodoAtTop(input, todoList, filtro) {
    return `<div id="app">
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtTopFilter(input, todoList, filtro) {
    return `${filtro}
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

function renderAddTodoAtBottomFilter(input, todoList, filtro) {
    return `
		<div id="app">
			${todoList}
			${input}
		</div>
		${filtro}`;
}

function renderAddTodoAtBottomFilterTop(input, todoList, filtro) {
    return `
		${filtro}
		<div id="app">
			${todoList}
			${input}
		</div>`;
}

function renderInput() {
    return `<div class="todo__input">Item: <input type="text" id="todoInput"><button id="addTodo"> + </button></div><hr>`;
}

function renderFiltro() {
	return '<div>'+
	'<hr>'+
	'<h3> Filtro:</h3>'+
	'<form action="">'+
	  '<input class="checkbox" type="radio" name="toos" value="todos" checked=""><span> Mostrar Todos</span>'+
	  '<input class="checkbox" type="radio" name="somenteAberto" value="somenteAberto"> <span> Somente Aberto</span>'+
	  '<input class="checkbox" type="radio" name="somenteFechado" value="somenteFechado"> <span> Somente Fechado</span>'+
	'</form>'+
	'</div>'+
	'</br>'+
	'<hr>';
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
