import { useEffect } from 'react';
import incomeIgm from '../../assets/income.svg';
import outcomeIgm from '../../assets/outcome.svg';
import totalIgm from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { formatCurrency, formatShortDate } from '../../utils';

import { Container } from './styles';

export function Summary() {
  const { transactions } = useTransactions();

  let lastDeposit = new Date();
  let lastWithdraw = new Date();

  if (transactions.length > 0) {
    transactions.filter((item) => {
      if (item.type === 'deposit') {
        return (lastDeposit = new Date(item.createdAt));
      } else {
        return (lastWithdraw = new Date(item.createdAt));
      }
    });
  }

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposit += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraw += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposit: 0,
      withdraw: 0,
      total: 0
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIgm} alt='Entradas' />
        </header>
        <strong>{formatCurrency(summary.deposit)}</strong>
        <small>Última entrada dia {formatShortDate(Number(lastDeposit))}</small>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeIgm} alt='Saidas' />
        </header>
        <strong>- {formatCurrency(summary.withdraw)}</strong>
        <small>Última saída dia {formatShortDate(Number(lastWithdraw))}</small>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalIgm} alt='Total' />
        </header>
        <strong>{formatCurrency(summary.total)}</strong>
        <small>01 à {formatShortDate(Number(new Date()))}</small>
      </div>
    </Container>
  );
}
