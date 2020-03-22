import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';
import { w320 } from '@@src/universal/styles/media';

const textShadow1 = keyframes({
  '0%, 100%': {
    transform: 'translate(0px, 0px)',
  },
  '20%': {
    transform: 'translate(5px, 1px)',
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
    transform: 'translate(3px, 0px)',
  },
  '40%': {
    transform: 'translate(0px, 0px)',
  },
});

const StyledIntroHeader = styled.div({
});

const Top = styled.div({
});

const Bottom = styled.div({
  marginTop: 15,
});

const Title = styled.div<any>(({ label }) => ({
  '& .main': {
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
      zIndex: -1,
    },
    transition: 'color 1s ease',
  },
  '&:hover .main': {
    color: '#eff',
  },
  '&:hover .main:after': {
    // transform: 'translate(7px, 1px)',
  },
  '&:hover .main:before': {
    // transform: 'translate(3px, -1px)',
  },
  color: 'white',
  cursor: 'pointer',
  fontFamily: '"Work Sans"',
  fontSize: '2.0rem',
  fontWeight: 800,
  position: 'relative',
  ...w320({
    fontSize: '1.82rem',
  }),
}), css`
  & .main::after {
    animation: 10s ease 0s infinite normal forwards ${textShadow2};
  }
  & .main::before {
    animation: 10s ease 0s infinite normal forwards ${textShadow1};
  }
`);

const Introduction = styled.div({
  '& > div': {
    marginTop: '0.6em',
  },
  '& p': {
    display: 'inline',
  },
  minHeight: 90,
  paddingTop: 5,
  ...w320({
    minHeight: 80,
    paddingTop: 0,
  }),
});

const Photo = styled.img({
  '&:hover': {
    // boxShadow: '0px 0px 4px 1px rgba(0,0,0,0.8)',
    transform: 'scale(1.2)',
    transformOrigin: 'top right',
  },
  borderRadius: 6,
  float: 'right',
  height: 100,
  margin: '0px 0 6px 6px',
  transition: 'all 1s ease',
  width: 100,
  ...w320({
    height: 85,
    width: 85,
  }),
});

const Contact = styled.ul({
  '& a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: '1px solid #c4bddb',
    color: '#c4bddb',
  },
  '& li': {
    color: '#c4bddb',
    display: 'inline-block',
  },
  '& li:not(:first-child)': {
    marginLeft: '0.4em',
  },
  '& li:not(:first-child)::before': {
    content: '"|"',
    marginRight: '0.4em',
  },
  fontSize: '1rem',
  marginTop: 13,
});

const IntroHeader = () => {
  const { general } = useContentData()!;

  return (
    <StyledIntroHeader>
      <Top>
        <Title label={general.name}>
          <Link to="/">
            <p className="main">
              {general.name}
            </p>
          </Link>
        </Title>
      </Top>
      <Bottom>
        <Photo
          src={general.photoUrl}
        />
        <Introduction>
          <p dangerouslySetInnerHTML={{ __html: general.introduction.p1 }} />
          {general.introduction.p2 && <div><p dangerouslySetInnerHTML={{ __html: general.introduction.p2 }} /></div>}
        </Introduction>
        <Contact>
          <li>
            <a href={`mailto:${general.email}`}>{general.email}</a>
          </li>
          <li>
            <a href={general.github}>Github</a>
          </li>
          <li>
            <a href={general.linkedIn}>LinkedIn</a>
          </li>
        </Contact>
      </Bottom>
    </StyledIntroHeader>
  );
};

export default IntroHeader;
