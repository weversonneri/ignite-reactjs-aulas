import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de blog',
          amount: 1200,
          type: 'deposit',
          category: 'Desenvolvimento',
          createdAt: new Date('2021-10-10 10:00:00')
        },
        {
          id: 2,
          title: 'Compras',
          amount: 200,
          type: 'withdraw',
          category: 'alimento',
          createdAt: new Date('2021-09-10 13:30:00')
        }
      ]
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
