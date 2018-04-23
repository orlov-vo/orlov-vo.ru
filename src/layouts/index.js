import React from 'react';
import Link from 'gatsby-link';
import { Container } from 'react-responsive-grid';
import 'prismjs/themes/prism-okaidia.css';

import { rhythm, scale } from '../utils/typography';

class Template extends React.Component {
  render() {
    const { location, children } = this.props;

    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`;
    }

    const homeLink = (
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit',
        }}
        to={'/'}
      >
        Vladislav Orlov
      </Link>
    );
    const isHeaderBig = location.pathname === rootPath || location.pathname === `${rootPath}posts/`;
    const header = isHeaderBig ? (
      <h1
        style={{
          ...scale(1.25),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        {homeLink}
      </h1>
    ) : (
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          marginTop: 0,
          marginBottom: rhythm(-1),
        }}
      >
        {homeLink}
      </h3>
    );

    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children()}
      </Container>
    );
  }
}

export default Template;
