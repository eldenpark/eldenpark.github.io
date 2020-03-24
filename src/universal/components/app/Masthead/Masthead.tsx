import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    fontSize: '2.52rem',
    fontSize320: '2.28rem',
  },
};

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
    transition: 'transform 1s ease',
    zIndex: -1,
  },
  '&::before': {
    color: '#e62e73',
    content: `"${label}"`,
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'transform 1s ease',
    zIndex: -2,
  },
  '&:hover': {
    color: '#eff',
  },
  '&:hover::after': {
    transform: 'translate(3px, 0px)',
  },
  '&:hover::before': {
    transform: 'translate(5px, 1px)',
  },
  color: theme.fontColor,
  fontFamily: '"Work Sans"',
  fontSize: theme.fontSize,
  fontWeight: 800,
  lineHeight: '1.1em',
  marginBottom: '0.24em',
  position: 'relative',
  transition: 'color 1s ease',
  ...w320({
    fontSize: theme.fontSize320,
  }),
}));

const Masthead: React.FC<MastheadProps> = ({
  visibleOnMenu,
}) => {
  const { general } = useContentData();

  return (
    <StyledMasthead
      label={general.name}
      theme={mastHeadTheme[visibleOnMenu]}
    >
      <Link to="/">
        {general.name}
      </Link>
    </StyledMasthead>
  );
};

export default Masthead;

interface MastheadProps {
  visibleOnMenu: string;
}
