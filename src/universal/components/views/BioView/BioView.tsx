import React from 'react';
import styled from 'styled-components';

import Header from './Header';

const StyledBioView = styled.div({
  alignItems: 'center',
  border: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
});

const Inner = styled.div({
  border: '1px solid gray',
  maxWidth: 500,
  width: '100%',
});

const BioView = () => {
  return (
    <StyledBioView>
      <Inner>
        <Header />
      </Inner>
    </StyledBioView>
  );
};

export default BioView;
