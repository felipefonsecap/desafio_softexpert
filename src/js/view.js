import {isEnabled} from './lib/feature';
import React from 'react'
import ReactDOM from 'react-dom';

export function renderInicial(el, state) {
    //const todoItems = state.todos.map(renderTodoItem).join('');
    ReactDOM.render(renderApp(), el);
	
	renderLista(document.getElementById('lista'), state);
}

export function renderLista(el, state) {
    //const todoItems = state.todos.map(renderTodoItem).join('');
	console.log(<ListaUL list={state.todos} />);
    ReactDOM.render(<div>
        <ListaUL list={state.todos} />
    </div>,el);
}

function renderApp() {
	if (isEnabled('renderBottom') && isEnabled('filter') && isEnabled('filterTop')) {
		return (<div><Titulo /><RenderAddTodoAtBottomFilterTop /></div>);
	} else {
		if(isEnabled('renderBottom') && isEnabled('filter')) {
			return (<div><Titulo /><RenderAddTodoAtBottomFilter /></div>);
		}
		else {
			if(isEnabled('filter')) {
				return (<div><Titulo /><RenderAddTodoAtTopFilter /></div>);
			} else {
				if(isEnabled('renderBottom')) {
					return (<div><Titulo /><RenderAddTodoAtBottom /></div>);
				} else {
					return (<div><Titulo /><RenderAddTodoAtTop /></div>);
				}			
			}
		}
	}
}

class Titulo extends React.Component {
	render() {
		return (
			<h2 id="titulo">Todo List</h2>
		);
	}
};

class RenderAddTodoAtTop extends React.Component {
  render() {
		return (
			<div id="app">
				<AddInput />
				<div id="lista"></div>
			</div>
		);
	}
};

class RenderAddTodoAtTopFilter extends React.Component {
  render() {
		return (
			<div>
				<Filtro />
				<div id="app">
					<AddInput />
					<div id="lista"></div>
				</div>
			</div>
		);
	}
};

class RenderAddTodoAtBottom extends React.Component {
  render() {
		return (
			<div id="app">
				<div id="lista"></div>
				<AddInput />
			</div>
		);
	}
};

class RenderAddTodoAtBottomFilter extends React.Component {
  render() {
    return (
		<div>
			<div id="app">
				<div id="lista"></div>
				<AddInput />
			</div>
			<Filtro />
		</div>
    );
  }
};

class RenderAddTodoAtBottomFilterTop extends React.Component {
  render() {
    return (
		<div>
			<Filtro />
			<div id="app">
				<div id="lista"></div>
				<AddInput />
			</div>]
		</div>
    );
  }
};


class AddInput extends React.Component {
  render() {
    return (
      <div className="todo__input">
		Item: 
		<input type="text" id="todoInput">
		</input>
		<button id="addTodo"> + </button>
      </div>
    );
  }
};

class Filtro extends React.Component {
  render() {
    return (
		<div>
			<div>
				<hr></hr>
				<h3> Filtro:</h3>
				<form action="">
				  <input className="checkbox" type="radio" name="toos" value="todos" defaultChecked="true"></input><span> Mostrar Todos</span>
				  <input className="checkbox" type="radio" name="somenteAberto" value="somenteAberto"></input> <span> Somente Aberto</span>
				  <input className="checkbox" type="radio" name="somenteFechado" value="somenteFechado"></input> <span> Somente Fechado</span>
				</form>
			</div>
			<br></br>
			<hr></hr>
		</div>);
	}
};

class ListaUL extends React.Component {
  render() {
    return (
        <ul>
          {this.props.list.map(function(listValue){
            return <TodoItem id={listValue.id} text={listValue.text} done={listValue.done}/>;
          })}
        </ul>
      )
    }
};

class TodoItem extends React.Component {
  render() {
   console.log(this.props);
    return (<li className="todo__item todo__item--{this.props.done ? 'done' : 'open'}">
        <input className="js_toggle_todo" type="checkbox" data-id={this.props.id} checked={this.props.done}></input>
        {this.props.text}
    </li>);
  }
}
