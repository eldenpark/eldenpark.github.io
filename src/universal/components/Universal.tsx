import { compose } from 'redux';
import styled, { createGlobalStyle } from 'styled-components';
import { hot } from 'react-hot-loader/root';
import React from 'react';

import ErrorBoundary from '@@src/universal/components/app/Error/ErrorBoundary';
import normalize from '@@src/universal/styles/normalize';
import ViewMount from '@@src/universal/components/views/ViewMount/ViewMount';

const Normalize = createGlobalStyle`
  ${normalize}
`;

const GlobalStyle = createGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
  a: {
    '&:hover': {
      textDecoration: 'none',
    },
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.5s ease',
  },
  body: {
  },
  button: {
    backgroundColor: 'inherit',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    margin: 0,
    outline: 'none',
    padding: 0,
  },
  html: {
    backgroundColor: '#2e2c2f',
    color: '#e1e1e1',
    fontFamily: '"Source Serif Pro", "Work Sans", "Helvetica", "Arial", sans-serif;',
    fontSize: 14,
    lineHeight: 1.45,
  },
  input: {
    border: 'none',
    outline: 'none',
  },
  p: {
    margin: 0,
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
});

const StyledUniversal = styled.div({
  fontSize: '1.1rem',
});

const Universal: React.FC<any> = () => {
  return (
    <ErrorBoundary>
      <StyledUniversal>
        <Normalize />
        <GlobalStyle />
        <ViewMount />
      </StyledUniversal>
    </ErrorBoundary>
  );
};

export default compose(
  hot,
)(Universal);

declare global {
  interface Window {
    SimpleMDE;
  }
}
