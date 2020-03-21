import React from 'react';
import styled from 'styled-components';

import Group from '@@src/universal/components/app/Group/Group';
import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';

const StyledDefaultView = styled.div({
  overflowX: 'hidden',
  width: '100%',
});

const componentMap = {
  group: Group,
};

const DefaultView: React.FC<any> = ({
  childrenMeta,
}) => {
  const contentData = useContentData()!;

  const contents = React.useMemo(() => {
    return childrenMeta.map((child) => {
      const component = componentMap[child.type] || Group;

      const componentProps = {
        key: child.value,
        ...(child.type === 'group' && { group: contentData[child.value] }),
        ...(child.type === 'text' && { text: child.value }),
      };

      return React.createElement(component, componentProps);
    });
  }, [contentData]);

  return (
    <StyledDefaultView>
      {contents}
    </StyledDefaultView>
  );
};

export default DefaultView;
