import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import wonyoungImage from './wonyoung.jpg'; // 이미지 경로를 올바르게 import

// 이미지가 화면 전체를 떠다니는 애니메이션 정의
const floatAround = keyframes`
  0% {
    transform: translate(80, 80);
  }
  25% {
    transform: translate(50px, -60px);
  }
  50% {
    transform: translate(-30px, 100px);
  }
  75% {
    transform: translate(-60px, -30px);
  }
  100% {
    transform: translate(30px, 50px);
  }
`;

// Styled Components 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
  position: relative; /* 상대적 위치로 설정하여 자식 요소의 절대 위치를 설정할 수 있음 */
  overflow: hidden; /* 자식 요소가 컨테이너 바깥으로 나가지 않도록 설정 */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Input = styled.textarea`
  padding: 15px;
  width: 80%;
  min-height: 200px;
  max-width: 600px;
  font-size: 1.1rem;
  margin-bottom: 20px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  outline: none;
  resize: none;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9); /* 반투명한 배경색을 추가하여 가독성 향상 */
  color: #495057;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1.1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;

const ResultContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* 반투명한 배경색 */
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const ResultTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 10px;
  color: #343a40;
  font-weight: 600;
`;

const ResultText = styled.p`
  font-size: 1.1rem;
  color: #495057;
  line-height: 1.6;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: auto;
  animation: ${floatAround} 10s ease-in-out infinite alternate;
  transform-origin: center center;
  pointer-events: none; /* 이미지가 클릭을 방해하지 않도록 함 */

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

// App 컴포넌트 정의
function App() {
  const [inputText, setInputText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    });

    const data = await response.json();
    setAnalysisResult(data.result);
  };

  return (
    <Container>
      <Title>럭키 비키 일기 <span>😘</span> </Title>
      <Input
        value={inputText}
        onChange={handleInputChange}
        placeholder="오늘 하루에 대해 알려주세요!"
      />
      <Button onClick={handleSubmit}>작성 완료</Button>

      {analysisResult && (
        <ResultContainer>
          <ResultTitle>      <ImageWrapper>
        <img src={wonyoungImage} alt="Wonyoung" />
      </ImageWrapper></ResultTitle>
          <ResultText>{analysisResult}</ResultText>
        </ResultContainer>
      )}

      {/* 이미지가 화면 전체에서 떠다니도록 설정 */}
    </Container>
  );
}

export default App;
