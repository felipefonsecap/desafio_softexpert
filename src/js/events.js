import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState, filtrar} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });
	
	//codigo para adicionar novo item com o pressionar da tecla ENTER
	listen('keydown', '#todoInput', event => {
		if (event.code == 'Enter' || event.keyCode == 13) {
			const todoInput = document.getElementById('todoInput');
			todos.dispatch(addTodo(todoInput.value));
		}
        event.stopPropagation();
		//comando para forcar o foco no input
		todoInput.focus();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });
	
	listen('click', 'input[type="radio"]', event => {
		var elemento = event.target;

		var listaInputs = document.querySelectorAll('[type="radio"]');
		listaInputs[0].checked = false;
		listaInputs[1].checked = false;
		listaInputs[2].checked = false;
		elemento.checked = true;
		
		event.stopPropagation();
		
		todos.dispatch(filtrar(elemento.value));
	});
	
}
