import axios from "axios";

// 환경 변수에서 API URL을 가져오고, 없으면 기본값으로 localhost 사용
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// 특정 사용자의 일기를 가져오는 함수
export const getDiariesByUserId = async (user_id: number) => {
  try {
    const response = await axios.get(`${API_URL}/diary/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("일기 불러오기 중 오류 발생:", error);
    throw error;
  }
};

// 특정 사용자의 일기 갯수를 가져오는 함수
export const countDiariesByUserId = async (user_id: number) => {
  try {
    const response = await axios.get(`${API_URL}/diary/count/${user_id}`);
    return response.data.totalDiaries; // 서버에서 totalDiaries로 응답한다고 가정
  } catch (error) {
    console.error("일기 갯수 불러오기 중 오류 발생:", error);
    throw error;
  }
};

// 일기를 저장하는 함수
export const saveDiary = async (diaryData: {
  user_id: number;
  title: string;
  content: string;
  color: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/diary`, diaryData);
    return response.data;
  } catch (error) {
    console.error("일기 저장 중 오류 발생:", error);
    throw error;
  }
};

// 특정 사용자의 연속된 일수를 가져오는 함수
export const getConsecutiveDaysByUserId = async (user_id: number) => {
  try {
    const response = await axios.get(`${API_URL}/diary/consecutive/${user_id}`);
    return response.data; // 서버에서 연속된 일수를 반환한다고 가정
  } catch (error) {
    console.error("연속된 일수 불러오기 중 오류 발생:", error);
    throw error;
  }
};
