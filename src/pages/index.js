// idxgen-disable
import React from 'react';
import Helmet from 'react-helmet';
import idx from 'idx';

import { Bio, PostShort } from 'components';

class BlogIndex extends React.Component {
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

          return (
            <PostShort key={slug} slug={slug} title={title} date={date}>
              {excerpt}
            </PostShort>
          );
        })}
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY", locale: "ru")
            title
          }
        }
      }
    }
  }
`;
