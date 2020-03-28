import React from 'react';
import styled from 'styled-components';

import color from '@@src/universal/styles/color';
import { w320 } from '@@src/universal/styles/media';

const H1 = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: '1px solid transparent',
    },
    borderBottom: `1px solid ${color.h1Color}`,
  },
  color: color.h1Color,
  fontWeight: 700,
});

const Default = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: '1px solid transparent',
    },
    borderBottom: `1px solid ${color.htmlColor}`,
  },
});

const Blog1 = styled.div({
  color: color.h1Color,
  fontFamily: '"Work Sans", "sans-serif"',
  fontSize: '2.7rem',
  fontWeight: 700,
  lineHeight: '1.1em',
  ...w320({
    fontSize: '2.15rem',
  }),
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
