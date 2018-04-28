import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

export function PostShort(props) {
  const { slug, title, children, date } = props;
  return (
    <div>
      <Title>
        <Link to={slug}>{title}</Link>
      </Title>
      <DateTime>{date}</DateTime>
      <p dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
}

const Title = styled.h3`
  margin-top: 2rem;
  margin-bottom: 0;
`;

const DateTime = styled.small`
  font-size: 0.75rem;
`;

export default PostShort;
