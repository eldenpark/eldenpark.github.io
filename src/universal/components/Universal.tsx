import { compose } from 'redux';
import styled, { createGlobalStyle } from 'styled-components';
import { hot } from 'react-hot-loader/root';
import React from 'react';

import color from '@@src/universal/styles/color';
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
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 1s ease',
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
    backgroundColor: color.htmlBackgroundColor,
    color: color.htmlColor,
    fontFamily: '"Source Serif Pro", "Work Sans", "Helvetica", "Arial", sans-serif;',
    fontSize: 14,
    lineHeight: 1.51,
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
  display: 'flex',
  fontSize: '1.16rem',
  justifyContent: 'center',
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
