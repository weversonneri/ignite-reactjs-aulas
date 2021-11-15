import incomeIgm from '../../assets/income.svg';
import outcomeIgm from '../../assets/outcome.svg';
import totalIgm from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from './styles';

export function Summary() {
  const { transactions } = useTransactions();
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIgm} alt="Entradas" />
        </header>
        <strong>R$100,00</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeIgm} alt="Saidas" />
        </header>
        <strong> - R$15,00</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalIgm} alt="Total" />
        </header>
        <strong>R$85,00</strong>
      </div>
    </Container>
  );
}
