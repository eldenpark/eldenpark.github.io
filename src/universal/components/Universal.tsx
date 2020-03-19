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
    backgroundColor: '#28242b',
    color: '#e8e8e8',
  },
  html: {
    fontFamily: '"Source Serif Pro", "Work Sans", "Helvetica", "Arial", sans-serif;',
    fontSize: 14,
    lineHeight: 1.42,
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
