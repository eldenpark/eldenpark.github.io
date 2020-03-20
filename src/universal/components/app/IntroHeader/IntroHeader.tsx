import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';
import { w320 } from '@@src/universal/styles/media';

const StyledIntroHeader = styled.div({
});

const Top = styled.div({
});

const Bottom = styled.div({
  marginTop: 15,
});

const Title = styled.div({
  '& .dummy': {
    opacity: 0,
  },
  '& .effect': {
    color: '#e62e73',
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  '& .effect-2': {
    color: '#665dd5',
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  '& .main': {
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  '& p': {
    transition: '1s ease',
  },
  '&:hover .effect': {
    transform: 'translate(9px, 1px)',
  },
  '&:hover .effect-2': {
    transform: 'translate(5px, -1px)',
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
});

const Introduction = styled.div({
  '& > p': {
    display: 'inline',
  },
  '& br': {
    display: 'block',
    marginTop: '0.7em',
  },
  minHeight: 90,
  paddingTop: 5,
  ...w320({
    minHeight: 80,
    paddingTop: 0,
  }),
});

const Photo = styled.img({
  borderRadius: 6,
  float: 'right',
  height: 100,
  margin: '0px 0 6px 6px',
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
    marginLeft: 5,
  },
  '& li:not(:first-child)::before': {
    content: '"| "',
  },
  fontSize: '1rem',
  marginTop: 13,
});

const IntroHeader = () => {
  const { general } = useContentData()!;

  return (
    <StyledIntroHeader>
      <Top>
        <Title>
          <Link to="/">
            <p className="dummy">
              {general.name}
            </p>
            <p className="main">
              {general.name}
            </p>
            <p className="effect">
              {general.name}
            </p>
            <p className="effect-2">
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
          <p dangerouslySetInnerHTML={{ __html: general.introduction }} />
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
