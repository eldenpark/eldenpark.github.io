import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import styled from 'styled-components';

import color from '@@src/universal/styles/color';
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
    transform: 'scale(1.24)',
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

const Contact = styled.div({
  '& > ul': {
    marginLeft: 20,
  },
  '& a:not(.icon)': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: `1px solid ${color.lightBlueC4}`,
  },
  '& li': {
    '&:hover': {
      color: color.h1Color,
    },
    display: 'inline-block',
    fontSize: '1.1em',
  },
  '& li:not(:first-child)': {
    marginLeft: 14,
  },
  color: color.lightBlueC4,
  display: 'flex',
  fontSize: '0.95em',
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
        {general.introduction.p2 && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: general.introduction.p2 }} />
          </div>
        )}
      </Description>
      <Contact>
        <p>
          <a href={`mailto:${general.email}`}>{general.email}</a>
        </p>
        <ul>
          <li>
            <a className="icon" href={general.github}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          <li>
            <a className="icon" href={general.linkedIn}>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </li>
        </ul>
      </Contact>
    </StyledIntroduction>
  );
};

export default Introduction;
