import React from 'react';
import styled from 'styled-components';

import { Group as GroupType } from '@@data/ContentData';

const StyledGroup = styled.div({
  marginBottom: '3.7em',
});

const GroupLabel = styled.p({
  color: '#fff',
  fontSize: '1.31rem',
  fontWeight: 500,
  letterSpacing: '0.021em',
  marginBottom: 7,
});

const Item = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: '1px solid #fff',
  },
  marginBottom: '1.4em',
});

const Description = styled.div({
  marginTop: 5,
});

const Title1 = styled.p({
  '& a': {
    '&:hover': {
      color: 'inherit',
    },
    color: 'inherit',
  },
  color: '#fff',
  fontWeight: 600,
});

const Group: React.FC<GroupProps> = ({
  group,
}) => {
  const list = React.useMemo(() => {
    return group.items.map((item) => {
      const children = item.children?.map((depth1) => {
        return (
          <p key={depth1.label}>
            {depth1.label}
          </p>
        );
      });

      return (
        <Item key={item.title1 + item.title2}>
          <Title1 dangerouslySetInnerHTML={{ __html: item.title1 }} />
          {item.title2 && <p dangerouslySetInnerHTML={{ __html: item.title2 }} />}
          {item.title3 && <p dangerouslySetInnerHTML={{ __html: item.title3 }} />}
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
