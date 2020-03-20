import React from 'react';
import styled from 'styled-components';

import Group from '@@src/universal/components/app/Group/Group';
import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';

const StyledDefaultView = styled.div({
});

const StyledText = styled.div({
  '& small': {
    fontSize: '0.91em',
  },
  marginBottom: '2.4em',
});

const Text = ({
  text,
}) => {
  return (
    <StyledText dangerouslySetInnerHTML={{ __html: text }} />
  );
};

const componentMap = {
  group: Group,
  text: Text,
};

const DefaultView: React.FC<any> = ({
  childrenMeta,
}) => {
  const contentData = useContentData()!;

  const contents = React.useMemo(() => {
    return childrenMeta.map((child) => {
      const component = componentMap[child.type];
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
