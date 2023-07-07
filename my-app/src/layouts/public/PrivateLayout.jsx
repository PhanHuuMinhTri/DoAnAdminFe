import React, { useEffect, useState, createContext } from "react";
import { useTranslation } from "react-i18next";
import { useOutlet, useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  AreaChartOutlined,
  HighlightOutlined,
  TranslationOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, theme, Typography } from "antd";

import axios from "axios";
import { domainAPI } from "../../configs/dev";
import { KEY_MENU_PRIVATE } from "../../constants/common";

import { PublicLayoutStyle, MenuStyled, SiderStyled } from "./styled";
const { Header, Content } = Layout;

const { Title } = Typography;

function getItem(label, key, icon, link) {
  return {
    key,
    icon,
    label,
    link,
  };
}
const items = [
  getItem("Managerment User", "/user", <UserOutlined />),
  getItem("Managerment Course", "/course", <AreaChartOutlined />),
  getItem("Managerment Test", "/test", <HighlightOutlined />),
  getItem("Managerment Test Kanji", "/test-kanji", <TranslationOutlined />),
  getItem("Managerment Teacher", "/teacher", <TeamOutlined />),
  getItem("Logout", "/logout", <LogoutOutlined />),
];

export const ProfileContext = createContext();

const PrivateLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const [defaultMenu, setDefaultMenu] = useState("");
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("isLoginAdmin");
    localStorage.removeItem("idUser");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <PublicLayoutStyle
      style={{
        minHeight: "100vh",
      }}
    >
      <SiderStyled
        collapsed={collapsed}
        collapsible
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <MenuStyled
          theme="dark"
          defaultSelectedKeys={defaultMenu}
          mode="inline"
          onSelect={(value) => {
            if (value.key === "/logout") {
              handleLogout();
            } else {
              navigate(value.key);
            }
          }}
          items={items}
        />
      </SiderStyled>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            ADMIN TRICHAN
          </Title>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {outlet}
        </Content>
      </Layout>
    </PublicLayoutStyle>
  );
};

export default PrivateLayout;
