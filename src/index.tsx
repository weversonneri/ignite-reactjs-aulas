import React from 'react';
import ReactDOM from 'react-dom';
import { createServer } from 'miragejs';
import { App } from './App';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transaction', () => [
      {
        id: 1,
        title: 'Desenvolvimento de blog',
        amount: 1200,
        type: 'deposit',
        category: 'Desenvolvimento',
        date: new Date()
      }
    ]);
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
