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
        height: "400px", // 고정된 카드 높이 설정 (예시로 400px)
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
          overflowY: "auto", // 아이템이 많을 때 스크롤 가능
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {/* list의 처음 5개의 항목만 가져옴 */}
        {list.slice(0, 4).map((item, index) => (
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
        {/* item.type에 저장된 색상 코드를 사용하여 동적 스타일링 */}
        <TimelineDot
          style={{ backgroundColor: item.type }} // item.type을 색상으로 사용
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{item.title}</Typography>

        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {item.time}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
