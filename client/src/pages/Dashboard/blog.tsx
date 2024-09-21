import React from "react";
import { DashboardLayout } from "../../layouts/dashboard";
import { NavDesktop } from "../../layouts/dashboard/nav";
import { BlogView } from "../../sections/blog/view";
import { Iconify } from "../../dashboardComponents/iconify"; // 아이콘 컴포넌트, 경로에 맞게 수정
import { CONFIG } from "../../config-global";
import { Helmet } from "react-helmet-async";

import { ProductsView } from "../../sections/product/view";

const navItems = [
  {
    title: "홈",
    path: "/",
    icon: <Iconify icon="ion:home" />,
  },
  {
    title: "대시보드",
    path: "/dashboard",
    icon: <Iconify icon="ic:baseline-dashboard" />,
  },
  {
    title: "글 목록",
    path: "/user",
    icon: <Iconify icon="tabler:writing" />,
  },
  {
    title: "추천 컨텐츠",
    path: "/blog",
    icon: <Iconify icon="oui:table-of-contents" />,
  },
];

const Blog: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> {`${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta
          name="keywords"
          content="react,material,kit,application,dashboard,admin,template"
        />
      </Helmet>
      <DashboardLayout>
        <NavDesktop data={navItems} layoutQuery={"xs"} />
        <ProductsView />
      </DashboardLayout>
    </>
  );
};

export default Blog;
