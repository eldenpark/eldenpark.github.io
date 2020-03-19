import React from 'react';
import styled from 'styled-components';

import { useContentData } from '@@src/universal/contexts/dataContext';
import { w320 } from '@@src/universal/styles/media';

const StyledIntroHeader = styled.div({
});

const Top = styled.div({
});

const Bottom = styled.div({
  marginTop: 15,
});

const Title = styled.div({
  color: 'white',
  fontFamily: '"Work Sans"',
  fontSize: '1.7rem',
  fontWeight: 800,
});

const Introduction = styled.div({
  '& > p': {
    display: 'inline',
  },
  '& br': {
    display: 'block',
    margin: '4 0',
  },
  minHeight: 90,
  paddingTop: 5,
  ...w320({
    minHeight: 80,
    paddingTop: 0,
  }),
});

const Photo = styled.img.attrs({
  src: 'assets/pic2.jpg',
})({
  borderRadius: 6,
  float: 'right',
  height: 100,
  margin: '0px 0 6px 6px',
  width: 100,
  ...w320({
    height: 75,
    width: 75,
  }),
});

const Contact = styled.ul({
  '& a': {
    '&:hover': {
      color: '#ddc3f7',
    },
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
  fontSize: '0.9rem',
  marginTop: 13,
});

const IntroHeader = () => {
  const { general } = useContentData()!;

  return (
    <StyledIntroHeader>
      <Top>
        <Title>
          {general.name}
        </Title>
      </Top>
      <Bottom>
        <Photo />
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
