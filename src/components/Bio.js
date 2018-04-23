import React from 'react';
import styled from 'styled-components';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import profilePic from './profile-pic.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <Wrapper>
        <Avatar src={profilePic} alt="Vladislav Orlov" />
        <Content>
          <BlogDescription>Личный блог фронтенд разработчика, живущего на Кипре.</BlogDescription>
          <SocialNavigation>
            <a href="https://twitter.com/orlov_vo" target="_blank">
              Twitter
            </a>
            <a href="https://github.com/orlov-vo">GitHub</a>
            <a href="https://www.facebook.com/profile.php?id=100001091027770" target="_blank">
              Facebook
            </a>
          </SocialNavigation>
        </Content>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2.5)};
`;

const Avatar = styled.img`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  width: ${rhythm(2)};
  height: ${rhythm(2)};
  border-radius: ${rhythm(2)};
`;

const Content = styled.div``;

const BlogDescription = styled.div``;

const SocialNavigation = styled.nav`
  a {
    margin-right: ${rhythm(1 / 4)};
  }
`;

export default Bio;
