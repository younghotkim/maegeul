import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import D3WordCloud from "../../layouts/d3/D3WordCloud"; // D3WordCloud 컴포넌트

type Word = {
  text: string;
  size: number;
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
    <Card {...other}>
      <CardHeader title={title} />
      <CardContent>
        <D3WordCloud words={words} />
      </CardContent>
    </Card>
  );
};

export default AnalyticsWordCloud;
