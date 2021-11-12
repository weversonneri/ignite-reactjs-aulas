import React, { useEffect } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

export function TransactionTable() {
  useEffect(() => {
    api.get('transaction').then((response) => console.log(response.data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de blog</td>
            <td className="deposit">R$ 2000,00</td>
            <td>Desenvolvimento</td>
            <td>10/10/2021</td>
          </tr>
          <tr>
            <td>Comida</td>
            <td className="withdraw"> - R$ 200,00</td>
            <td>Alimentação</td>
            <td>05/10/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
