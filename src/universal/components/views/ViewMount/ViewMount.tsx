import React from 'react';
import styled from 'styled-components';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import DefaultView from '@@src/universal/components/views/DefaultView/DefaultView';
import Footer from '@@src/universal/components/app/Footer/Footer';
import Masthead from '@@src/universal/components/app/Masthead/Masthead';
import { log } from '@@src/universal/modules/Logger';
import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';
import { w320 } from '@@src/universal/styles/media';

const StyledViewMount = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 670,
  minHeight: '100vh',
  padding: '44px 20px',
  width: '100%',
  ...w320({
    padding: '15px 20px',
  }),
});

const ViewMount: React.FC = () => {
  const { views } = useContentData()!;

  const routes = React.useMemo(() => {
    const _routes = views.items.map((item) => {
      log('ViewMount(): registering view, label: %s, url: %s', item.label, item.url);

      return (
        <Route
          exact={!!item.exact && item.exact === 'true'}
          key={item.url}
          path={item.url}
          render={({
            staticContext,
          }) => {
            return (
              <>
                <Masthead visibleOnMenu={item.visibleOnMenu} />
                <DefaultView
                  staticContext={staticContext}
                  view={item}
                />
              </>
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
      <Switch>
        {routes}
      </Switch>
      <Footer />
    </StyledViewMount>
  );
};

export default ViewMount;
