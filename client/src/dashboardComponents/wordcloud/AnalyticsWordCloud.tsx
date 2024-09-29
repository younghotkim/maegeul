import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  CardProps,
} from "@mui/material";
import D3WordCloud from "../../layouts/d3/D3WordCloud"; // D3WordCloud 컴포넌트
import { useUser } from "../../context/UserContext"; // UserContext 임포트
import useUserMoodData from "../../hooks/useUserMoodData"; // useUserMoodData 훅 임포트
import { ChartLegends } from "../chart/chart-legends";

// Word 타입 정의 (size와 color 포함)
type Word = {
  text: string;
  size: number;
  color: string;
};

// ChartOptions 타입 정의
export type ChartOptions = {
  labels?: string[];
  colors?: string[];
  series?: number[];
  type?: string;
};

// Chart에 기본 옵션을 추가
const chartOptions: ChartOptions = {
  labels: ["편안 지수가 높은 단어들이 더 크게 보여요"], // 원하는 라벨 추가
  colors: ["#B9A2FF"], // 색상 커스텀
};

interface AnalyticsWordCloudProps {
  title: string;
}

const AnalyticsWordCloud: React.FC<AnalyticsWordCloudProps> = ({
  title,
  ...other
}) => {
  const { user } = useUser(); // UserContext에서 user 가져오기
  const moodData = useUserMoodData(user?.user_id || undefined); // 이미 매칭된 데이터를 가져옴

  // API에서 받은 라벨을 D3WordCloud에서 요구하는 형식으로 변환
  const words: Word[] = moodData.map((mood) => ({
    text: mood.label, // 감정 라벨
    size: mood.pleasantness * 5, // pleasantness를 기반으로 크기 설정
    color: mood.color, // 매칭된 색상
  }));

  return (
    <Card
      {...other}
      style={{ display: "flex", flexDirection: "column", height: "100%" }} // 부모 요소의 높이에 맞게 확장
    >
      <CardHeader title={title} />
      <CardContent
        style={{
          flex: "1 1 auto", // 남은 공간을 차지하게 만듦
          display: "flex",
          alignItems: "center", // 수직으로 중앙 정렬
          justifyContent: "center", // 가로로 중앙 정렬
          padding: 0, // padding 제거하여 자식 요소가 부모 영역을 더 잘 차지하도록 함
        }}
      >
        {/* 필터링된 데이터를 기반으로 워드 클라우드 렌더링 */}
        {words.length > 0 ? (
          <div style={{ width: "100%", height: "356px" }}>
            <D3WordCloud words={words} />
          </div>
        ) : (
          <div>
            지금 매글을 시작해서 나만의 감정 어휘 클라우드를 만들어보세요 🎈
          </div>
        )}
      </CardContent>

      <Divider sx={{ borderStyle: "dashed" }} />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: "center" }}
      />
    </Card>
  );
};

export default AnalyticsWordCloud;
