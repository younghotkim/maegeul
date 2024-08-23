//src/pages/Diag.tsx
import React from 'react';
import Header from '../components/Header';
import MoodSlider from '../components/MoodSlider';
import Footer from '../components/Footer';
import styled from 'styled-components';
import AntSlider from '../components/AntSlider';

const Home: React.FC = () => {
  return (
    <Container>

      <Content>
        <Title>오늘의 기분 지수를 측정해 볼까요?</Title>
        <Subtitle>하루를 보내고 난 지금의 나의 기분은 어떤지 솔직하게 기록해봐요.</Subtitle>
        <MoodSlider />
        {/* <AntSlider /> */}
      </Content>

    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
`;

const Content = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-size: 40px;
  color: #6c6783;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #8c8c8c;
  margin-bottom: 2rem;
`;
