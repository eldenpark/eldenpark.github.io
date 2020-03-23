import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { Blog as BlogType } from '@@data/BlogData';
import color from '@@src/universal/styles/color';
import { getDisplayableDate } from '@@src/universal/utils';

const StyledBlogListItem = styled.div({
});

const BlogListItem = styled.div({});

const Title1 = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: `1px solid ${color.h1Color}`,
  },
  color: color.h1Color,
  fontWeight: 600,
});

const Blog: React.FC<BlogProps> = ({
  blog,
  blogType,
}) => {
  const items = React.useMemo(() => {
    return blog.items.map((item) => {
      const date = getDisplayableDate(item.createdAt);
      const pageUrl = `${blogType}/${item.pageUrl}`;

      return (
        <BlogListItem key={item.pageUrl}>
          <Title1>
            <Link to={pageUrl}>
              {item.meta.title}
            </Link>
          </Title1>
          <p>
            {date}
          </p>
        </BlogListItem>
      );
    });
  }, [blog]);

  return (
    <StyledBlogListItem>
      {items}
    </StyledBlogListItem>
  );
};

export default Blog;

interface BlogProps {
  blog: BlogType;
  blogType: string;
}
