import React from 'react';
import styled from 'styled-components';

import color from '@@src/universal/styles/color';

const Text = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: `1px solid ${color.htmlColor}`,
  },
  '& iframe': {
    alignSelf: 'center',
    height: '44vw',
    margin: '0.9em 0',
    maxHeight: 267,
    maxWidth: 480,
    width: '80vw',
  },
  '& p': {
    marginTop: '0.9em',
  },
  '& small': {
    fontSize: '0.91em',
  },
});

const Multimedia = styled.div({
  '& > *': {
    margin: '0.3em 0',
  },
  '& iframe': {
    alignSelf: 'center',
    height: '44vw',
    margin: '0.9em 0',
    maxHeight: 267,
    maxWidth: 480,
    width: '80vw',
  },
  '& img': {
    borderRadius: 5,
    display: 'block',
    margin: '1.05em 0',
    maxWidth: '80%',
  },
  display: 'flex',
  justifyContent: 'center',
});

const componentMap = {
  multimedia: Multimedia,
  text: Text,
};

const Child = ({
  label,
  type = 'text',
}) => {
  return React.createElement(componentMap[type], {
    dangerouslySetInnerHTML: { __html: label },
  });
};

export default Child;
