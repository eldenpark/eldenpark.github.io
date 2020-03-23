import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import color from '@@src/universal/styles/color';
import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';
import { w320 } from '@@src/universal/styles/media';

const mastHeadTheme = {
  false: {
    fontColor: color.htmlColor,
    fontSize: '1.3rem',
    fontSize320: '1.3rem',
  },
  true: {
    fontColor: color.h1Color,
    fontSize: '2.32rem',
    fontSize320: '2.08rem',
  },
};

const textShadow1 = keyframes({
  '0%, 100%': {
    transform: 'translate(0px, 0px)',
  },
  '20%': {
    transform: 'translate(4px, 0px)',
  },
  '40%': {
    transform: 'translate(0px, 0px)',
  },
});

const textShadow2 = keyframes({
  '0%, 100%': {
    transform: 'translate(0px, 0px)',
  },
  '20%': {
    transform: 'translate(6px, 1px)',
  },
  '40%': {
    transform: 'translate(0px, 0px)',
  },
});

const StyledMasthead = styled.div<any>(({
  label,
  theme,
}) => ({
  '&::after': {
    color: '#665dd5',
    content: `"${label}"`,
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  '&::before': {
    color: '#e62e73',
    content: `"${label}"`,
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: -2,
  },
  '&:hover': {
    color: '#eff',
  },
  '&:hover .main:after': {
    // transform: 'translate(7px, 1px)',
  },
  '&:hover .main:before': {
    // transform: 'translate(3px, -1px)',
  },
  color: theme.fontColor,
  cursor: 'pointer',
  fontFamily: '"Work Sans"',
  fontSize: theme.fontSize,
  fontWeight: 800,
  letterSpacing: '0.02em',
  lineHeight: '1.1em',
  marginBottom: '0.24em',
  position: 'relative',
  transition: 'color 1s ease',
  ...w320({
    fontSize: theme.fontSize320,
  }),
}), css`
  &::after {
    animation: 10s ease 0s infinite normal forwards ${textShadow1};
  }
  &::before {
    animation: 10s ease 0s infinite normal forwards ${textShadow2};
  }
`);

const Masthead: React.FC<MastheadProps> = ({
  visibleOnMenu,
}) => {
  const { general } = useContentData();

  return (
    <StyledMasthead
      label={general.name}
      theme={mastHeadTheme[visibleOnMenu]}
    >
      {general.name}
    </StyledMasthead>
  );
};

export default Masthead;

interface MastheadProps {
  visibleOnMenu: string;
}
