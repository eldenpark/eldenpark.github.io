/* eslint-disable no-new-func */
import { useLocation } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { Blog as BlogType } from '@@data/BlogData';
import color from '@@src/universal/styles/color';
import { getDisplayableDate } from '@@src/universal/utils';
import Text from '@@src/universal/components/app/Text/Text';

const StyledBlogDetail = styled.div({});

const BlogMain = styled.div({
  '& div:nth-child(2)': {
    marginTop: '0.3em',
  },
});

const BlogBody = styled.div({
  '& .container': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: `1px solid ${color.htmlColor}`,
  },
  '& iframe': {
    alignSelf: 'center',
    height: '47vw',
    margin: '1.1em 0',
    maxHeight: 267,
    maxWidth: 480,
    width: '85vw',
  },
  '& li': {
    listStyleType: 'disc',
    marginLeft: 24,
  },
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1.2rem',
});

const BlogDetail: React.FC<BlogDetailProps> = ({
  blog,
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
      result.title = selectedBlog.meta?.title;
      const unescapedFunc = selectedBlog.meta?.callable?.replace(/&quot;/g, '"');
      result.func = new Function('dataset', unescapedFunc);
    }

    return result;
  }, [blog, pathname]);

  const registerFunctions = React.useCallback((elem) => {
    if (elem !== null) {
      elem.querySelectorAll('.callable')
        .forEach((callable) => {
          callable.addEventListener('click', func.bind(this, callable.dataset));
        });
    }
  }, [func]);

  return (
    <StyledBlogDetail>
      <BlogMain>
        <Text type="blog1">{title}</Text>
        <Text>{datetime}</Text>
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
}
