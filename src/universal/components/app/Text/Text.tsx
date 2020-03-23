import React from 'react';
import styled from 'styled-components';

import color from '@@src/universal/styles/color';

const H1 = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: `1px solid ${color.h1Color}`,
  },
  color: color.h1Color,
  fontWeight: 600,
});

const Default = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: `1px solid ${color.htmlColor}`,
  },
});

const Blog1 = styled.div({
  color: color.h1Color,
  fontFamily: '"Work Sans", "sans-serif"',
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: '1.1em',
});

const componentMap = {
  blog1: Blog1,
  default: Default,
  h1: H1,
};

const Text: React.FC<TextProps> = ({
  type = 'default',
  ...rest
}) => {
  const component = componentMap[type] || componentMap.default;

  return React.createElement(component, rest);
};

export default Text;

interface TextProps {
  dangerouslySetInnerHTML?;
  type?: 'h1' | 'blog1';
}