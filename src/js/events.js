import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
		console.log('ok2');
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });
	
	listen('keydown', '#todoInput', event => {
		if (event.code == 'Enter' || event.keyCode == 13) {
			const todoInput = document.getElementById('todoInput');
			todos.dispatch(addTodo(todoInput.value));			
		}
        event.stopPropagation();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });
}
