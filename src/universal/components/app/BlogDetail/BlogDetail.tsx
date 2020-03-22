import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { Blog as BlogType } from '@@data/BlogData';
import color from '@@src/universal/styles/color';

const StyledBlogDetail = styled.div({});

const ButtonRow = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: `1px solid ${color.htmlColor}`,
  },
});

const BlogBody = styled.div({
  marginTop: '2.4em',
});

const BlogDetail: React.FC<BlogDetailProps> = ({
  backUrl,
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
      const date = new Date(selectedBlog.createdAt);
      result.datetime = `${date.getMonth() - 1} ${date.getDate()} ${date.getFullYear()}`;
      result.html = selectedBlog.html;
      result.title = selectedBlog.meta?.title;
    }

    return result;
  }, [blog]);

  return (
    <StyledBlogDetail>
      <ButtonRow>
        <Link to={backUrl}>
          Back to list
        </Link>
      </ButtonRow>
      <div>
        {title}
      </div>
      {/* {selectedBlog} */}
      {/* <BlogBody dangerouslySetInnerHTML={{ __html: }} /> */}
    </StyledBlogDetail>
  );
};

export default BlogDetail;

interface BlogDetailProps {
  backUrl: string;
  blog: BlogType;
}
