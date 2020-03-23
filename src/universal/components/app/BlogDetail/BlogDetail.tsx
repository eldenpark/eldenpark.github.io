import { useLocation } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { Blog as BlogType } from '@@data/BlogData';
import { getDisplayableDate } from '@@src/universal/utils';
import Text from '@@src/universal/components/app/Text/Text';

const StyledBlogDetail = styled.div({});

// const ButtonRow = styled.div({
//   '& a': {
//     '&:hover': {
//       borderBottom: 'none',
//     },
//     borderBottom: `1px solid ${color.htmlColor}`,
//   },
// });

const BlogMain = styled.div({
  '& div:nth-child(2)': {
    marginTop: '0.3em',
  },
  // marginTop: '2.4rem',
});

const BlogBody = styled.div({
  '& iframe': {
    alignSelf: 'center',
    height: '44vw',
    margin: '1.1em 0',
    maxHeight: 267,
    maxWidth: 480,
    width: '80vw',
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
    html,
    title,
  } = React.useMemo(() => {
    const result = {
      datetime: '',
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
    }

    return result;
  }, [blog]);

  return (
    <StyledBlogDetail>
      <BlogMain>
        <Text type="blog1">{title}</Text>
        <Text>{datetime}</Text>
        <BlogBody dangerouslySetInnerHTML={{ __html: html }} />
      </BlogMain>
    </StyledBlogDetail>
  );
};

export default BlogDetail;

interface BlogDetailProps {
  backUrl: string;
  blog: BlogType;
}
