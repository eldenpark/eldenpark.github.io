import React from 'react';
import styled from 'styled-components';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import DefaultView from '@@src/universal/components/views/DefaultView/DefaultView';
import Footer from '@@src/universal/components/app/Footer/Footer';
import IntroHeader from '@@src/universal/components/app/IntroHeader/IntroHeader';
import Menu from '@@src/universal/components/views/ViewMount/Menu';
import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';

const StyledViewMount = styled.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '15 9',
});

const Inner = styled.div({
  maxWidth: 600,
  width: '100%',
});

const ViewWrapper = styled.div({
  marginTop: 24,
});

const ViewMount = () => {
  const { views } = useContentData();

  const routes = React.useMemo(() => {
    const _routes = views.items.map((item) => {
      return (
        <Route
          exact={!!item.exact && item.exact === 'true'}
          key={item.url}
          path={item.url}
          render={() => {
            return (
              <DefaultView childrenMeta={item.children} />
            );
          }}
        />
      );
    });

    _routes.push(
      <Redirect key="default" to={views.items[0].url} />,
    );

    return _routes;
  }, [views]);

  return (
    <StyledViewMount>
      <Inner>
        <IntroHeader />
        <Menu />
        <ViewWrapper>
          <Switch>
            {routes}
          </Switch>
        </ViewWrapper>
        <Footer />
      </Inner>
    </StyledViewMount>
  );
};

export default ViewMount;
