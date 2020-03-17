import React from 'react';
import styled from 'styled-components';

import { DataContext } from '@@src/universal/components/DataProvider';

const StyledHeader = styled.div({
  display: 'flex',
});

const Left = styled.div({
  flexGrow: 1,
});

const Title = styled.div({
  fontFamily: '"Work Sans"',
  fontSize: '1.8em',
  fontWeight: 800,
});

const Description = styled.div({
  color: '#ffffffe0',
  fontFamily: '"Noto Serif", serif',
});

const Name = styled.p({

});

const Photo = styled.img.attrs({
  src: 'assets/pic2.jpg',
})({
  borderRadius: 6,
  height: 120,
  width: 120,
});

const Header = () => {
  const { general } = React.useContext(DataContext)!;

  return (
    <StyledHeader>
      <Left>
        <Title>
          {general.name}
        </Title>
        <Description>
          {general.introduction}
        </Description>
      </Left>
      <div>
        <Photo />
      </div>
    </StyledHeader>
  );
};

export default Header;
