import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext"; // UserContext 임포트
import { AnalyticsOrderTimeline } from "../../sections/overview/analytics-order-timeline"; // 타임라인 컴포넌트 임포트

// Diary 타입 정의
interface Diary {
  diary_id: number;
  user_id: number;
  title: string;
  content: string;
  formatted_date: string;
  color: string;
}

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export function DiaryTimeline() {
  const [diaryData, setDiaryData] = useState<Diary[]>([]); // Diary 데이터를 저장하는 상태
  const { user } = useUser(); // 사용자 정보 가져오기

  // Diary 데이터를 API에서 가져오는 함수
  const fetchDiaryData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/diary/${user?.user_id}`);
      const data = await response.json();

      // 응답이 배열인지 확인 후 처리
      if (Array.isArray(data)) {
        setDiaryData(data);
      } else {
        console.error("다이어리 데이터가 배열이 아닙니다:", data);
        setDiaryData([]); // 배열이 아닐 경우 빈 배열로 처리
      }
    } catch (error) {
      console.error(
        "다이어리 데이터를 가져오는 중 오류가 발생했습니다:",
        error
      );
      setDiaryData([]); // 오류 발생 시에도 빈 배열로 설정
    }
  };

  // 컴포넌트가 처음 렌더링될 때 다이어리 데이터를 가져옴
  useEffect(() => {
    if (user?.user_id) {
      fetchDiaryData();
    }
  }, [user?.user_id]);

  // 색상 변환 맵 정의
  const colorMap: { [key: string]: string } = {
    빨간색: "#EE5D50",
    노란색: "#FFDE57",
    파란색: "#6AD2FF",
    초록색: "#35D28A",
  };

  // 데이터를 AnalyticsOrderTimeline에서 사용할 수 있는 리스트 형식으로 변환
  const _timeline = diaryData.map((diary) => {
    // 변환되지 않은 색상 값 로그 출력
    console.log(`Diary ID: ${diary.diary_id}, Color: ${diary.color}`);

    return {
      id: diary.diary_id.toString(),
      type: colorMap[diary.color] || "#000000", // colorMap에서 diary.color를 찾아 변환, 없으면 기본 색상(#000000)
      title: diary.title,
      time: diary.formatted_date, // 시간을 시간 형식으로 표시
    };
  });

  return (
    <div>
      {diaryData.length === 0 ? (
        <AnalyticsOrderTimeline
          title="무드 컬러 타임라인"
          list={_timeline} // 변환한 _timeline 데이터 전달
        />
      ) : (
        <AnalyticsOrderTimeline
          title="무드 컬러 타임라인"
          list={_timeline} // 변환한 _timeline 데이터 전달
        />
      )}
    </div>
  );
}
