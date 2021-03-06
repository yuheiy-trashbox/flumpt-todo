'use strict';
import {render} from 'react-dom';
import App from './app';

const storage = data => {
  const namespace = 'flumpt-todo';

  if (data) {
    return localStorage.setItem(namespace, JSON.stringify(data));
  }

  const store = localStorage.getItem(namespace);
  return store && JSON.parse(store) || [];
};

const {todos, showing} = storage();

const app = new App({
  renderer: el => {
    render(el, document.querySelector('#app'));
  },
  initialState: {
    todos: todos ? todos : [],
    showing: showing ? showing : 'all'
  },
  middlewares: [
    state => {
      console.log(state);
      storage(state);
      return state;
    }
  ]
});

app.on(':start-async-updating', () => {
  //
});

app.on(':end-async-updating', () => {
  //
});

app.update(initialState => initialState);
