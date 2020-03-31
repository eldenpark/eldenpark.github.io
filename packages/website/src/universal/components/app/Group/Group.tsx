import React from 'react';
import styled from 'styled-components';

import Child from './Child';
import color from '@@src/universal/styles/color';
import { Group as GroupType } from '@@data/ContentData';
import Text from '@@src/universal/components/app/Text/Text';

const StyledGroup = styled.div<any>(({ type = 'category' }) => ({
  '&:not(:last-child)': {
    marginBottom: type === 'category' ? '3.7em' : '2.4em',
  },
}));

const StyledGroupLabel = styled.p({
  color: color.h1Color,
  fontSize: '1.6rem',
  fontWeight: 500,
  letterSpacing: '0.027em',
  marginBottom: 7,
});

const GroupLabel = ({
  group,
}) => {
  return (
    <StyledGroupLabel id={group.id.length > 0 ? group.id : undefined}>
      {group.label}
    </StyledGroupLabel>
  );
};

const Item = styled.div({
  '& .desc:not(:first-child)': {
    marginTop: '0.42em',
  },
  '&:not(:last-child)': {
    marginBottom: '1.9em',
  },
});

const Description = styled.div({
});

const Group: React.FC<GroupProps> = ({
  group,
}) => {
  const list = React.useMemo(() => {
    return group.items.map((item) => {
      const children = item.children?.map((depth1) => {
        const children2 = depth1.children?.map((depth2) => {
          return (
            <Child
              key={depth2.label}
              label={depth2.label}
              type={depth2.type}
            />
          );
        });

        return (
          <React.Fragment key={depth1.label}>
            <Child
              key={depth1.label}
              label={depth1.label}
              type={depth1.type}
            />
            {children2}
          </React.Fragment>
        );
      });

      return (
        <Item key={item.title1 || item.title2 || item.children![0]?.label}>
          {item.title1 && <Text dangerouslySetInnerHTML={{ __html: item.title1 }} type="h1" />}
          {item.title2 && <Text dangerouslySetInnerHTML={{ __html: item.title2 }} />}
          {item.title3 && <Text dangerouslySetInnerHTML={{ __html: item.title3 }} />}
          {children && (
            <Description className="desc">
              {children}
            </Description>
          )}
        </Item>
      );
    });
  }, [group]);

  return (
    <StyledGroup type={group.type}>
      {group.label.length > 0 && <GroupLabel group={group} />}
      {list}
    </StyledGroup>
  );
};

export default Group;

interface GroupProps {
  group: GroupType;
}
