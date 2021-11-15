import incomeIgm from '../../assets/income.svg';
import outcomeIgm from '../../assets/outcome.svg';
import totalIgm from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { formatCurrency } from '../../utils';

import { Container } from './styles';

export function Summary() {
  const { transactions } = useTransactions();

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
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeIgm} alt='Saidas' />
        </header>
        <strong>- {formatCurrency(summary.withdraw)}</strong>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalIgm} alt='Total' />
        </header>
        <strong>{formatCurrency(summary.total)}</strong>
      </div>
    </Container>
  );
}
