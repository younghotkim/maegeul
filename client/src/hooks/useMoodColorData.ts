import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext"; // UserContext 임포트

// 환경 변수에서 API URL을 가져오고, 없으면 기본값으로 localhost 사용
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// 커스텀 훅: user_id에 따른 무드 컬러 데이터를 가져옴
export const useMoodColorData = () => {
  const { user } = useUser(); // useUser는 함수 내부에서 호출되어야 함

  const [moodColorData, setMoodColorData] = useState([
    { label: "파란색", value: 0 },
    { label: "노란색", value: 0 },
    { label: "초록색", value: 0 },
    { label: "빨간색", value: 0 },
  ]);

  useEffect(() => {
    const fetchMoodColorData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/moodmeter/colorcount/${user?.user_id}`
        );
        const data = await response.json();

        // API에서 반환된 데이터를 상태로 업데이트
        const updatedMoodColorData = moodColorData.map((item) => {
          const match = data.find(
            (colorData: { color: string }) => colorData.color === item.label
          );
          return match ? { ...item, value: match.count } : item;
        });

        setMoodColorData(updatedMoodColorData);
      } catch (error) {
        console.error(
          "무드 컬러 데이터를 불러오는 중 오류가 발생했습니다:",
          error
        );
      }
    };

    if (user?.user_id) {
      fetchMoodColorData(); // API 호출
    }
  }, [user?.user_id]); // user_id가 변경될 때마다 호출

  // 총 label 개수를 계산
  const totalLabels = moodColorData.reduce(
    (total, item) => total + item.value,
    0
  );

  return { moodColorData, totalLabels };
};
