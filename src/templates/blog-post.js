import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import idx from 'idx';
import ReactDisqusComments from 'react-disqus-comments';
import styled from 'styled-components';
import urlJoin from 'url-join';

import Bio from 'components/Bio';

class BlogPostTemplate extends React.Component {
  render() {
    const post = idx(this.props, _ => _.data.markdownRemark);
    const siteTitle = idx(this.props, _ => _.data.site.siteMetadata.title);
    const { previous, next } = this.props.pathContext;

    const siteUrl = idx(this.props, _ => _.data.site.siteMetadata.siteUrl);
    const slug = idx(post, _ => _.fields.slug);
    const title = post.frontmatter.title;

    const navigation = (
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {previous && (
          <li>
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}

        {next && (
          <li>
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </ul>
    );

    console.log(urlJoin(siteUrl, slug));

    return (
      <div>
        <Helmet title={`${title} | ${siteTitle}`} />
        <Title>{title}</Title>
        <DateTime>{post.frontmatter.date}</DateTime>

        <img src={post.frontmatter.thumbnail} />

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <EndLine />
        <Bio />

        {navigation}

        <ReactDisqusComments
          shortname="orlov-vo"
          identifier={post.id}
          title={title}
          url={urlJoin(siteUrl, slug)}
        />

        {navigation}
      </div>
    );
  }
}

const Title = styled.h1`
  line-height: 1.2;
`;

const DateTime = styled.p`
  display: block;
  margin-bottom: 1rem;
  margin-top: -1rem;
`;

const EndLine = styled.hr`
  margin-bottom: 1rem;
`;

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY", locale: "ru")
      }
    }
  }
`;
