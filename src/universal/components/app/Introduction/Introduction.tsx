import React from 'react';
import styled from 'styled-components';

import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';
import { w320 } from '@@src/universal/styles/media';

const StyledIntroduction = styled.div({
  marginBottom: '2.2em',
});

const Description = styled.div({
  '& > div': {
    marginTop: '0.6em',
  },
  '& p': {
    display: 'inline',
  },
  marginBottom: '0.4em',
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
  },
  borderRadius: 6,
  float: 'right',
  height: 100,
  margin: '0px 0 6px 6px',
  transformOrigin: 'top right',
  transition: 'transform 1s ease',
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
    marginRight: '0.4em',
  },
});

const Introduction: React.FC = () => {
  const { general } = useContentData()!;

  return (
    <StyledIntroduction>
      <Photo
        src={general.photoUrl}
      />
      <Description>
        <p dangerouslySetInnerHTML={{ __html: general.introduction.p1 }} />
        {general.introduction.p2 && <div><p dangerouslySetInnerHTML={{ __html: general.introduction.p2 }} /></div>}
      </Description>
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
    </StyledIntroduction>
  );
};

export default Introduction;
