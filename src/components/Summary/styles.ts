import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -10rem;
  overflow: auto;

  @media (max-width: 800px) {
    padding-right: 1rem;
    margin-right: -1.5rem;
  }

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);
    min-width: 280px;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    small {
      color: var(--text-body);
      font-size: 0.75rem;
    }

    &.highlight-background {
      background: var(--green);
      color: #fff;

      small {
        color: #fff;
      }
    }
  }
`;
