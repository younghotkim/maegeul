import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
// 환경 변수에서 API URL을 가져오고, 없으면 기본값으로 localhost 사용

export const analyzeEmotion = async (text: string) => {
  try {
    const response = await axios.post(`${API_URL}/analyze/`, { text });
    return response.data.emotion;
  } catch (error) {
    console.error("Error analyzing emotion:", error);
    throw error;
  }
};
