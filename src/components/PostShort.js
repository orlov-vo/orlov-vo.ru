import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

export function PostShort(props) {
  const { slug, title, children, date, thumbnail } = props;
  return (
    <Wrapper>
      {thumbnail && (
        <ThumbnailLink to={slug}>
          <Thumbnail
            src={thumbnail.src}
            height={thumbnail.height}
            width={thumbnail.width}
            data-src={thumbnail.src}
            data-srcset={thumbnail.srcSet}
            alt={title}
          />
        </ThumbnailLink>
      )}

      <Content>
        <Title>
          <Link to={slug}>{title}</Link>
        </Title>
        <DateTime>{date}</DateTime>

        <p dangerouslySetInnerHTML={{ __html: children }} />
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: top;
`;

const Title = styled.h3`
  margin-top: 2rem;
  margin-bottom: 0;
`;

const DateTime = styled.small`
  display: block;
  font-size: 0.75rem;
`;

const Content = styled.div``;

const Thumbnail = styled.img`
  flex: 0;
  margin: 2rem 1rem 0 0;
  border-radius: 5px;
`;

const ThumbnailLink = styled(Link)`
  border-bottom: 0;
`;

export default PostShort;
