import React from 'react';
import styled from 'styled-components';

import Blog from '@@src/universal/components/app/Blog/Blog';
import BlogDetail from '@@src/universal/components/app/BlogDetail/BlogDetail';
import { Blog as BlogType } from '@@data/BlogData';
import Group from '@@src/universal/components/app/Group/Group';
import { Group as GroupType, View } from '@@data/ContentData';
import { useIsomorphicData } from '@@src/universal/contexts/IsomorphicDataContext';

const StyledDefaultView = styled.div({
  overflowX: 'hidden',
  width: '100%',
});

const componentMap = {
  blog: Blog,
  blogDetail: BlogDetail,
  default: Group,
  group: Group,
};

const DefaultView: React.FC<DefaultViewProps> = ({
  view,
}) => {
  const {
    blogData,
    contentData,
  } = useIsomorphicData()!;

  const contents = React.useMemo(() => {
    return view.children.map((child) => {
      const component = componentMap[child.type] || componentMap.default;

      const componentProps = {
        backUrl: view.backUrl,
        key: child.value,
        ...(child.type === 'group' && { group: contentData.groups[child.value] as GroupType }),
        ...(child.type === 'blog' && {
          blog: blogData[child.value] as BlogType,
          blogType: child.value,
        }),
        ...(child.type === 'blogDetail' && {
          blog: blogData[child.value] as BlogType,
        }),
      };

      return React.createElement(component, componentProps);
    });
  }, [view]);

  return (
    <StyledDefaultView>
      {contents}
    </StyledDefaultView>
  );
};

export default DefaultView;

interface DefaultViewProps {
  view: View;
}
