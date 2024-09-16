// src/pages/Auth/Mypage.tsx
// ant Design 설치
// npm i antd 
import React from 'react';
import AppHeader from '../../components/Header'; // Header 이름 중복 충돌 방지를 위해 AppHeader로 이름 변경
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'; // Ant Design 아이콘 사용
import type { MenuProps } from 'antd'; // Ant Design의 메뉴 속성 타입 정의
import { Breadcrumb, Layout, Menu, theme, Card, Row, Col, Grid } from 'antd'; // Ant Design 컴포넌트 임포트
import Footer from '../../components/Footer'; // 사용자 정의 Footer 컴포넌트 임포트

const { Header: AntHeader, Content, Sider } = Layout; // Ant Design Layout 컴포넌트 구조 분해 (Header 별칭 부여)
const { useBreakpoint } = Grid; // 반응형 디자인을 위한 Grid의 useBreakpoint Hook 사용

// 상단 네비게이션 메뉴 아이템 정의
const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

// 사이드바 메뉴 아이템 정의 (아이콘과 서브메뉴 포함)
const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon), // 아이콘 생성
      label: `subnav ${key}`,

      // 각 서브 메뉴의 하위 옵션 항목 생성
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const Mypage: React.FC = () => {
  // 테마에서 토큰 값을 추출하여 스타일링에 사용
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const screens = useBreakpoint(); // 현재 화면 크기에 따라 다른 스타일을 적용하기 위해 사용

  return (
    // Layout 컴포넌트: 전체 페이지의 레이아웃을 잡는 최상위 컨테이너
    <Layout style={{ minHeight: '100vh', position: 'relative' }}> {/* 화면 높이를 전체에 맞추고, 상대 위치 지정 */}
      <AppHeader /> {/* 사용자 정의 Header 컴포넌트 */}
      
      {/* 메인 콘텐츠 영역 */}
      <Content style={{ padding: '0 48px' }}>
        {/* 페이지 경로를 표시하는 Breadcrumb */}
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>My page</Breadcrumb.Item>
          <Breadcrumb.Item>대시보드</Breadcrumb.Item>
        </Breadcrumb>
        
        {/* 사이드바와 메인 콘텐츠를 포함하는 Layout */}
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          {/* 사이드바 (Sider) 컴포넌트 */}
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline" // 사이드바 메뉴 모드: 인라인
              defaultSelectedKeys={['1']} // 기본 선택된 메뉴 항목
              defaultOpenKeys={['sub1']} // 기본으로 열려 있는 서브메뉴
              style={{ height: '100%' }} // 전체 높이로 설정
              items={items2} // 위에서 정의한 메뉴 아이템 사용
            />
          </Sider>
          
          {/* 메인 콘텐츠 영역 */}
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {/* 반응형 디자인을 위한 Row와 Col 컴포넌트 사용 */}
            <Row gutter={[24, 24]} justify="center"> {/* Row: 각 열 사이의 여백(gutter)을 설정 */}
              {/* 반응형 디자인: 화면 크기에 따라 열의 너비 조절 */}
              <Col xs={24} sm={12} md={8}> 
                <Card title="무드 컬러 그래프" size="small">
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="글쓰기 현황" size="small">
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="글쓰기 작성 일수" size="small">
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="감정 변화 그래프" size="small">
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="나의 마음 구름" size="small">
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="'user'님을 위한 콘텐츠 추천" size="small">
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Content>
      
      {/* Footer 컴포넌트를 감싸는 div를 사용하여 스타일링 적용 */}
      <div style={{ bottom: 0, width: '100%' }}> 
        <Footer />
      </div>
    </Layout>
  );
};

export default Mypage;

