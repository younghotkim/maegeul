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

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  // UserContext에서 사용자 정보 가져오기
  const { user } = useUser();

  const words = [
    { text: "#불쾌한", size: 80 },
    { text: "#골치 아픈", size: 50 },
    { text: "#근심하는", size: 30 },
    { text: "#들뜬", size: 40 },
    { text: "#만족스러운", size: 100 },
    { text: "#한가로운", size: 20 },
  ];

  // 무드 컬러 데이터를 저장할 상태
  const [moodColorData, setMoodColorData] = useState([
    { label: "파란색", value: 0 },
    { label: "노란색", value: 0 },
    { label: "초록색", value: 0 },
    { label: "빨간색", value: 0 },
  ]);

  // useEffect를 사용하여 API 호출
  useEffect(() => {
    const fetchMoodColorData = async () => {
      try {
        // 백엔드에서 특정 user_id로 무드 컬러 데이터를 가져옴
        const response = await fetch(
          `http://localhost:5000/api/moodmeter/colorcount/${user?.user_id}`
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

    // API 호출
    fetchMoodColorData();
  }, [user?.user_id]);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        {user?.profile_name}님의 마음 지도 💖
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Weekly sales"
            percent={2.6}
            total={714000}
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
            title="New users"
            percent={-0.1}
            total={1352831}
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
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Purchase orders"
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
            title="Current subject"
            chart={{
              categories: [
                "English",
                "History",
                "Physics",
                "Geography",
                "Chinese",
                "Math",
              ],
              series: [
                { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
