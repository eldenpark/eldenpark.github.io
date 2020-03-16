import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div({
  display: 'flex',
});

const Left = styled.div({
  flexGrow: 1,
});

const Title = styled.div({
  fontSize: '1.8em',
  fontWeight: 900,
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
  return (
    <StyledHeader>
      <Left>
        <Title>
          Gieur nagnei
        </Title>
        <Description>
          Space of
          <Name>Elden S. Park</Name>
        </Description>
      </Left>
      <div>
        <Photo />
      </div>
    </StyledHeader>
  );
};

export default Header;
