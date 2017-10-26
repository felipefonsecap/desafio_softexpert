import {createStore} from 'redux';
import {renderInicial} from './view';

var initialState = JSON.parse(sessionStorage.getItem("lista"));
console.log(initialState);
if (!initialState) {
	initialState = {
		todos: [
			{
				id: 0,
				text: 'Take a look at the application',
				done: true
			},
			{
				id: 1,
				text: 'Add ability to filter todos',
				done: false
			},
			{
				id: 2,
				text: 'Filter todos by status',
				done: false
			},
			{
				id: 3,
				text: 'Filter todos by text',
				done: false
			}
		]
	};
	sessionStorage.setItem("lista", JSON.stringify(initialState));
}
console.log(initialState);

const initialStateAux = JSON.parse(JSON.stringify(initialState));

function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push(adicionarElemento(change.text, state.todos.length));
			initialStateAux.todos.push(adicionarElemento(change.text, initialStateAux.todos.length));
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
            break;
			
		case 'FILTRAR':
            state.todos = initialStateAux.todos.filter(function(el) {
				return filtro(change.text, el)
			});
            break;
			
		default :
			renderInicial(document.getElementById('root'), state);
			
			break;
    }
	
	sessionStorage.setItem("lista", JSON.stringify(initialStateAux));
	return state;
}

function filtro(tipo, el) {
	switch(tipo) {
		case 'somenteAberto' : return el.done;
			break;
		
		case 'somenteFechado' : return !el.done;
		
		default : return true;
	}
}

function adicionarElemento(texto, tamanho) {
	var elemento = {
		id: tamanho,
		text: texto,
		done: false
	};	
	return elemento;
}

export let todos = createStore(todoChangeHandler, initialState);