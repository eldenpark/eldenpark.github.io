/* eslint-disable no-new-func */
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Blog as BlogType } from '@@data/BlogData';
import color from '@@src/universal/styles/color';
import { getDisplayableDate } from '@@src/universal/utils';
import { StaticContext } from '@@src/universal/contexts/StaticContext';
import Text from '@@src/universal/components/app/Text/Text';

const StyledBlogDetail = styled.div({
  paddingTop: 15,
});

const DateTime = styled(Text)({
  fontStyle: 'italic',
});

const BlogMain = styled.div({
  '& div:nth-child(2)': {
    marginTop: '0.3em',
  },
});

const BlogBody = styled.div({
  '& .container': {
    '& figcaption': {
      color: 'gray',
      fontFamily: '"Arial, Helvetica, sans-serif;"',
      fontSize: '0.9em',
      marginTop: 5,
      textAlign: 'center',
    },
    '& iframe': {
      alignSelf: 'center',
      height: '47vw',
      maxHeight: 267,
      maxWidth: 480,
      width: '85vw',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '1.1em 0',
  },
  '& a': {
    '&:hover': {
      borderBottom: '1px solid transparent',
    },
    borderBottom: `1px solid ${color.htmlColor}`,
  },
  '& li': {
    listStyleType: 'disc',
    marginLeft: 24,
  },
  '& p:not(:last-child)': {
    marginBottom: '1.4em',
  },
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1.2rem',
});

const BlogDetail: React.FC<BlogDetailProps> = ({
  blog,
  staticContext,
}) => {
  const { pathname } = useLocation();
  const {
    datetime,
    func,
    html,
    title,
  } = React.useMemo(() => {
    const result = {
      datetime: '',
      func: new Function(),
      html: 'Something wrong happend. Check the blog url',
      title: '',
    };

    const selectedBlog = blog.items.find((item) => {
      return pathname.endsWith(item.pageUrl);
    });

    if (selectedBlog) {
      result.datetime = getDisplayableDate(selectedBlog.createdAt);
      result.html = selectedBlog.html;
      result.title = selectedBlog.capitalizedTitle;
      const unescapedFunc = selectedBlog.meta?.clickable?.replace(/&quot;/g, '"');
      result.func = new Function('dataset', unescapedFunc);
    }

    if (staticContext !== undefined) {
      staticContext.metaTitle = result.title;
      staticContext.metaDescription = (result.html.replace(/(<([^>]+)>)/ig, '')
        .substring(0, 300)) + '...';
    }

    return result;
  }, [blog, pathname, staticContext]);

  const registerFunctions = React.useCallback((elem) => {
    if (elem !== null) {
      elem.querySelectorAll('.clickable')
        .forEach((clickable) => {
          clickable.addEventListener('click', func.bind(this, clickable.dataset));
        });
    }
  }, [func]);

  return (
    <StyledBlogDetail>
      <BlogMain>
        <Text type="blog1">{title}</Text>
        <DateTime>{datetime}</DateTime>
        <BlogBody
          dangerouslySetInnerHTML={{ __html: html }}
          ref={registerFunctions}
        />
      </BlogMain>
    </StyledBlogDetail>
  );
};

export default BlogDetail;

interface BlogDetailProps {
  backUrl: string;
  blog: BlogType;
  staticContext: StaticContext;
}
