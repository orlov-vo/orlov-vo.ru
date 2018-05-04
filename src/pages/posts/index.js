// idxgen-disable
import React from 'react';
import Helmet from 'react-helmet';
import idx from 'idx';

import { Bio, PostShort } from 'components';

class BlogPosts extends React.Component {
  render() {
    const siteTitle = idx(this, _ => _.props.data.site.siteMetadata.title);
    const posts = idx(this, _ => _.props.data.allMarkdownRemark.edges);

    return (
      <div>
        <Helmet title={siteTitle} />
        <Bio />
        {posts.map(({ node }) => {
          const slug = idx(node, _ => _.fields.slug);
          const title = idx(node, _ => _.frontmatter.title) || slug;
          const date = idx(node, _ => _.frontmatter.date);
          const excerpt = idx(node, _ => _.excerpt);
          const thumbnail = idx(
            node,
            _ => _.frontmatter.thumbnail.childImageSharp.responsiveResolution,
          );

          return (
            <PostShort key={slug} slug={slug} title={title} date={date} thumbnail={thumbnail}>
              {excerpt}
            </PostShort>
          );
        })}
      </div>
    );
  }
}

export default BlogPosts;

export const pageQuery = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { published: { eq: true } }
        fields: { slug: { regex: "/^/posts/i" } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY", locale: "ru")
            title
            thumbnail {
              childImageSharp {
                responsiveResolution(width: 200, height: 220, quality: 90, cropFocus: CENTER) {
                  base64
                  src
                  srcSet
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;
