import React, { useState } from "react";
import styled from "styled-components";
import { analyzeEmotion } from "../api/analyzeApi";
import Header from "../components/Header"; // 헤더 컴포넌트 임포트
import ProgressBar from "./ProgressBar";

const DiaryContainer = styled.div`
  background-color: #f3f0ff; /* 밝은 scampi 배경색 */
  padding: 20px;
  border-radius: 15px;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "DM Sans", sans-serif;
  background-image: url("/paper-texture.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.h1`
  text-align: center;
  color: #5a3e2b; /* 다크 모드에서도 조화로운 색상 */
  color: #4c3c90; /* scampi 색상 */
  font-family: "DM Sans", sans-serif;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const DiaryTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #c5b4ff; /* scampi 색상 */
  font-family: "DM Sans", sans-serif;
  font-size: 1.1rem;
  line-height: 1.5;
  background-color: #e5e0ff; /* 연한 scampi 배경색 */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #8c79ff; /* 집중 상태에서 scampi 강조 */
    box-shadow: 0 0 8px rgba(140, 121, 255, 0.5);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #7c67ff; /* 버튼의 scampi 기본 색상 */
  color: white;
  font-size: 1.2rem;
  font-family: "DM Sans", sans-serif;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #5c45e9; /* hover 상태에서 더 짙은 scampi */
    transform: scale(1.02);
  }
`;

const EmotionResult = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f3e7ff; /* 결과의 연한 scampi 배경색 */
  border-radius: 10px;
  font-family: "DM Sans", sans-serif;
  color: #4c3c90; /* 텍스트의 scampi 색상 */
  line-height: 1.6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  white-space: pre-line; /* 줄바꿈 문자 처리 */
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #ffebee; /* 에러 메시지의 밝은 배경색 */
  border-radius: 10px;
  color: #d32f2f; /* 텍스트의 강렬한 빨간색 */
  font-family: "DM Sans", sans-serif;
  line-height: 1.6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #7c67ff; /* Close button color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;

  &:hover {
    background-color: #5c45e9;
  }
`;

const EmotionForm: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [emotion, setEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeEmotion(text);
      setEmotion(result);
      setIsModalOpen(true); // 모달 열기
    } catch (err) {
      setError("Error analyzing emotion");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmotion(null);
  };

  return (
    <>
      <Header />
      <div className="w-full">
        <ProgressBar value={15} />
      </div>
      <DiaryContainer>
        <Title>AI 하루 진단 v1.0</Title>
        <form onSubmit={handleSubmit}>
          <DiaryTextarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="오늘의 감정을 기록하세요..."
            required
          />
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "분석 중..." : "감정 분석"}
          </SubmitButton>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </DiaryContainer>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>AI 하루 진단 리포트</h2>
            <EmotionResult>
              {emotion?.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </EmotionResult>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default EmotionForm;
