import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;
  overflow-x: auto;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    thead {
      @media (max-width: 500px) {
        display: none;
      }
    }

    tbody {
      @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    tr {
      @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        margin: 0 2rem 0.5rem;
        width: 100%;

        td:nth-child(2) {
          font-size: 1.25rem;
          padding-top: 0;
        }
      }
    }

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);

        &:before {
          content: '- ';
        }
      }
    }
  }
`;
