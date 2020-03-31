import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { Blog as BlogType } from '@@data/BlogData';
import color from '@@src/universal/styles/color';
import { getDisplayableDate } from '@@src/universal/utils';
import { w320 } from '@@src/universal/styles/media';

const StyledBlogListItem = styled.div({
  fontSize: '1.34rem',
  ...w320({
    fontSize: '1.25rem',
  }),
});

const BlogListItem = styled.div({});

const Title1 = styled.div({
  '& a': {
    '&:hover': {
      borderBottom: '1px solid transparent',
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
              {item.capitalizedTitle}
            </Link>
          </Title1>
          <p>
            {date}
          </p>
        </BlogListItem>
      );
    });
  }, [blog, blogType]);

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
