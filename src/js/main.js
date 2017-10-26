

import {todos} from './state';
import {renderLista} from './view';
import {registerEventHandlers} from './events';
console.log(todos.getState());
document.getElementById('lista');
todos.subscribe(newState => renderLista(document.getElementById('lista'), todos.getState()));

registerEventHandlers();