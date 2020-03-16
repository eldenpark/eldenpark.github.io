import { compose } from 'redux';
import styled, { createGlobalStyle } from 'styled-components';
import { hot } from 'react-hot-loader/root';
import React from 'react';

import BioView from '@@src/universal/components/views/BioView/BioView';
import ErrorBoundary from '@@src/universal/components/app/Error/ErrorBoundary';
import normalize from '@@src/universal/styles/normalize';

const Normalize = createGlobalStyle`
  ${normalize}
`;

const GlobalStyle = createGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
  a: {
    textDecoration: 'none',
  },
  body: {
    backgroundColor: '#1c1721',
    color: 'white',
  },
  input: {
    border: 'none',
    outline: 'none',
  },
  p: {
    margin: 0,
  },
});

const StyledUniversal = styled.div({
  fontFamily: '"Ubuntu", "Helvetica", "Arial", sans-serif;',
});

const Universal: React.FC<any> = () => {
  return (
    <StyledUniversal>
      <ErrorBoundary>
        <Normalize />
        <GlobalStyle />
        <BioView />
      </ErrorBoundary>
    </StyledUniversal>
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
