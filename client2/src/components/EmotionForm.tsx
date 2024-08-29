import React, { useState } from 'react';
import styled from 'styled-components';
import { analyzeEmotion } from '../api/analyzeApi';

const DiaryContainer = styled.div`
    background-color: #fdf7e1;
    padding: 20px;
    border-radius: 15px;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Noto Sans KR', sans-serif;
    background-image: url('/paper-texture.jpg');
    background-size: cover;
    background-repeat: no-repeat;
`;

const Title = styled.h1`
    text-align: center;
    color: #5a3e2b;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 20px;
`;

const DiaryTextarea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.1rem;
    line-height: 1.5;
    background-color: #fff8dc;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
        border-color: #ffab91;
        box-shadow: 0 0 8px rgba(255, 171, 145, 0.5);
        outline: none;
    }
`;

const SubmitButton = styled.button`
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #ffab91;
    color: white;
    font-size: 1.2rem;
    font-family: 'Noto Sans KR', sans-serif;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: #ff8a65;
        transform: scale(1.02);
    }
`;

const EmotionResult = styled.div`
    margin-top: 20px;
    padding: 15px;
    background-color: #fff3e0;
    border-radius: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #6d4c41;
    line-height: 1.6;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    white-space: pre-line; /* 줄바꿈 문자 처리 */
`;

const ErrorMessage = styled.div`
    margin-top: 20px;
    padding: 15px;
    background-color: #ffebee;
    border-radius: 10px;
    color: #d32f2f;
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.6;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const EmotionForm: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [emotion, setEmotion] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const result = await analyzeEmotion(text);
            setEmotion(result);
        } catch (err) {
            setError('Error analyzing emotion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DiaryContainer>
            <Title>감정 일기 v1.0</Title>
            <form onSubmit={handleSubmit}>
                <DiaryTextarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="오늘의 감정을 기록하세요..."
                    required
                />
                <SubmitButton type="submit" disabled={loading}>
                    {loading ? '분석 중...' : '감정 분석'}
                </SubmitButton>
            </form>
            {emotion && (
                <EmotionResult>
                    {emotion.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                </EmotionResult>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </DiaryContainer>
    );
};

export default EmotionForm;
