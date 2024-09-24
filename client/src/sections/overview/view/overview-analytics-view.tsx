import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { _tasks, _posts, _timeline } from "../../../_mock";
import { DashboardContent } from "../../../layouts/dashboard";

import { AnalyticsNews } from "../analytics-news";
import { AnalyticsTasks } from "../analytics-tasks";
import { AnalyticsCurrentVisits } from "../analytics-current-visits";
import { AnalyticsOrderTimeline } from "../analytics-order-timeline";
import { AnalyticsWebsiteVisits } from "../analytics-website-visits";
import { AnalyticsWidgetSummary } from "../analytics-widget-summary";
import { AnalyticsTrafficBySite } from "../analytics-traffic-by-site";
import { AnalyticsCurrentSubject } from "../analytics-current-subject";
import { AnalyticsConversionRates } from "../analytics-conversion-rates";
import { useUser } from "../../../context/UserContext"; // UserContext 임포트
import AnalyticsWordCloud from "../../../dashboardComponents/wordcloud/AnalyticsWordCloud";

import D3WordCloud from "../../../layouts/d3/D3WordCloud";
import { useEffect, useState } from "react";
import { useMoodColorData } from "../../../hooks/useMoodColorData";
import { useDiary } from "../../../context/DiaryContext"; // DiaryContext 가져오기

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  // UserContext에서 사용자 정보 가져오기
  const { user } = useUser();

  const { diaryCount, fetchDiaryCount } = useDiary();

  // 컴포넌트가 마운트될 때 일기 개수를 불러오는 로직
  useEffect(() => {
    if (user?.user_id) {
      fetchDiaryCount(user.user_id); // user_id로 일기 작성 개수 불러오기
    }
  }, [user, fetchDiaryCount]);

  const words = [
    { text: "#불쾌한", size: 80 },
    { text: "#골치 아픈", size: 50 },
    { text: "#근심하는", size: 30 },
    { text: "#들뜬", size: 40 },
    { text: "#만족스러운", size: 100 },
    { text: "#한가로운", size: 20 },
  ];

  //moodColorData Hook
  const { moodColorData, totalLabels } = useMoodColorData();

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        {user?.profile_name}님의 마음 지도 💖
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="무드 컬러 진단 횟수"
            percent={2.6}
            total={totalLabels} // totalLabels 값을 total에 적용
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
              ],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="마음 일기 수"
            percent={0.5} // 필요에 따라 작성 수 증감 비율을 계산하여 넣을 수 있음
            total={diaryCount} // diaryCount 값 적용
            color="secondary"
            icon={
              <img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />
            }
            chart={{
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
              ],
              series: [0, 0, 0, 0, 12, 23, 32, 23],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="AI 진단 수"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
              ],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Messages"
            percent={3.6}
            total={234}
            color="error"
            icon={
              <img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />
            }
            chart={{
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
              ],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="무드 컬러"
            chart={{
              series: moodColorData,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWordCloud title="감정 어휘 클라우드" words={words} />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
              ],
              series: [
                { name: "Team A", data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: "Team B", data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite
            title="Traffic by site"
            list={[
              { value: "facebook", label: "Facebook", total: 323234 },
              { value: "google", label: "Google", total: 341212 },
              { value: "linkedin", label: "Linkedin", total: 411213 },
              { value: "twitter", label: "Twitter", total: 443232 },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ["Italy", "Japan", "China", "Canada", "France"],
              series: [
                { name: "2022", data: [44, 55, 41, 64, 22] },
                { name: "2023", data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="추천 영역"
            chart={{
              categories: ["자기개발", "헬스", "문화", "취미", "언어", "운동"],
              series: [
                { name: "파란색", data: [80, 50, 30, 40, 100, 20] },
                { name: "빨간색", data: [20, 30, 40, 80, 20, 80] },
                { name: "초록색", data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="추천 컨텐츠" list={_posts.slice(0, 5)} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="무드 컬러 타임라인" list={_timeline} />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
