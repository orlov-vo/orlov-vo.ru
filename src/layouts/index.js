// idxgen-disable
import React from 'react';
import Link from 'gatsby-link';
import styled, { injectGlobal } from 'styled-components';

import 'normalize.css';
import 'typeface-merriweather';
import 'prismjs/themes/prism-okaidia.css';

import { route } from 'utils';

injectGlobal`
  html,
  body {
    font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 18px;
    line-height: 1.8;
    color: hsl(214, 5%, 20%);
  }

  a {
    color: hsl(214, 50%, 50%);
    border-bottom: 1px solid hsl(214, 50%, 50%);
    text-decoration: none;

    &:hover,
    &:focus {
      color: hsl(214, 50%, 60%);
      border-bottom-color: hsl(214, 50%, 60%);
      text-decoration: none;
    }

    &:visited {
      color: hsl(254, 50%, 50%);
      border-bottom-color: hsl(254, 50%, 50%);
      text-decoration: none;

      &:hover,
      &:focus {
        color: hsl(254, 50%, 60%);
        border-bottom-color: hsl(254, 50%, 60%);
        text-decoration: none;
    }
    }

    &.gatsby-resp-image-link {
      border-bottom: 0;
    }
  }

  table {
    min-width: 100%;
    font-variant-numeric: lining-nums tabular-nums;
    border-collapse: collapse;
  }

  td, th {
    padding: 0.5em;
  }

  tbody {
    tr {
      &:nth-child(odd) {
        background: #fafafa;
      }
    }
  }
`;

class Template extends React.Component {
  render() {
    const { location, children } = this.props;

    const isHeaderBig = [route('/'), route('/posts/'), route('/posts')].includes(location.pathname);
    const HomeTitle = isHeaderBig ? BigTitle : Title;

    return (
      <Container>
        <HomeTitle>
          <HomeLink to={'/'}>Vladislav Orlov</HomeLink>
        </HomeTitle>
        {children()}
      </Container>
    );
  }
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 42rem;
  padding: 1.5rem 0.75rem;
`;

const HomeLink = styled(Link)`
  &,
  &:visited {
    &,
    &:hover,
    &:focus {
      border-bottom: none;
      text-decoration: none;
      color: inherit;
    }
  }
`;

const BigTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: -1rem;
`;

export default Template;
