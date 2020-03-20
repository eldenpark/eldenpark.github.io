import React from 'react';
import styled from 'styled-components';

import color from '@@src/universal/styles/color';
import { Group as GroupType } from '@@data/ContentData';

const StyledGroup = styled.div({
  marginBottom: '3.7em',
});

const GroupLabel = styled.p({
  color: color.h1Color,
  fontSize: '1.19em',
  fontWeight: 500,
  letterSpacing: '0.027em',
  marginBottom: 7,
});

const Item = styled.div({
  marginBottom: '1.9em',
});

const Description = styled.div({
  marginTop: 5,
});

const Title1 = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: `1px solid ${color.h1Color}`,
  },
  color: color.h1Color,
  fontWeight: 600,
});

const Title = styled.div({
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
  display: 'flex',
  flexDirection: 'column',
});

const Group: React.FC<GroupProps> = ({
  group,
}) => {
  const list = React.useMemo(() => {
    return group.items.map((item) => {
      const children = item.children?.map((depth1) => {
        const children2 = depth1.children?.map((depth2) => {
          return (
            <p key={depth2.label}>
              {depth2.label}
            </p>
          );
        });

        return (
          <p key={depth1.label}>
            {depth1.label}
            {children2}
          </p>
        );
      });

      return (
        <Item key={item.title1 + item.title2}>
          <Title1 dangerouslySetInnerHTML={{ __html: item.title1 }} />
          {item.title2 && <Title dangerouslySetInnerHTML={{ __html: item.title2 }} />}
          {item.title3 && <Title dangerouslySetInnerHTML={{ __html: item.title3 }} />}
          <Description>
            {children}
          </Description>
        </Item>
      );
    });
  }, [group]);

  return (
    <StyledGroup>
      <GroupLabel id={group.id}>{group.label}</GroupLabel>
      {list}
    </StyledGroup>
  );
};

export default Group;

interface GroupProps {
  group: GroupType;
}
