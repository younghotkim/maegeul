import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import D3WordCloud from "../../layouts/d3/D3WordCloud"; // D3WordCloud 컴포넌트

// Word 타입 정의 (size와 color 포함)
type Word = {
  text: string;
  size: number;
  color: string;
};

interface AnalyticsWordCloudProps {
  title: string;
  words: Word[];
}

const AnalyticsWordCloud: React.FC<AnalyticsWordCloudProps> = ({
  title,
  words,
  ...other
}) => {
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
        }}
      >
        <D3WordCloud words={words} />
      </CardContent>
    </Card>
  );
};

export default AnalyticsWordCloud;
