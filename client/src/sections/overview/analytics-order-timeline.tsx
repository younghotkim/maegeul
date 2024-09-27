import type { CardProps } from "@mui/material/Card";
import type { TimelineItemProps } from "@mui/lab/TimelineItem";

import Card from "@mui/material/Card";
import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

import { fDateTime } from "../../utils/format-time";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    type: string;
    title: string;
    time: string | number | null;
  }[];
};

export function AnalyticsOrderTimeline({
  title,
  subheader,
  list,
  ...other
}: Props) {
  return (
    <Card
      {...other}
      sx={{
        height: "100%", // 부모 요소의 높이에 맞춰서 확장
        display: "flex", // flex를 사용하여 자식 요소들이 높이에 맞게 조정
        flexDirection: "column", // 수직으로 정렬
      }}
    >
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          flexGrow: 1, // 남은 공간을 차지하게 만듦
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            lastItem={index === list.length - 1}
          />
        ))}
      </Timeline>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  item: Props["list"][number];
};

function Item({ item, lastItem, ...other }: ItemProps) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          color={
            (item.type === "order1" && "primary") ||
            (item.type === "order2" && "success") ||
            (item.type === "order3" && "info") ||
            (item.type === "order4" && "warning") ||
            "error"
          }
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{item.title}</Typography>

        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {fDateTime(item.time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
