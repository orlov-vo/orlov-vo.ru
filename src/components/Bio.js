import React from 'react';
import styled from 'styled-components';

import profilePic from './profile-pic.jpg';

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
  margin-bottom: 2.5rem;
  align-items: center;
`;

const Avatar = styled.img`
  margin-right: 1rem;
  margin-bottom: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
`;

const Content = styled.div`
  font-size: 0.8rem;
`;

const BlogDescription = styled.div``;

const SocialNavigation = styled.nav`
  a {
    margin-right: 0.25rem;
  }
`;

export default Bio;
