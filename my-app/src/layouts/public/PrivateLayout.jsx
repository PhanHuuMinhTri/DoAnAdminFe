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
  getItem("Logouts", "/logout", <LogoutOutlined />),
];

export const ProfileContext = createContext();

const PrivateLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const [profile, setProfile] = useState();

  const location = useLocation();

  const { t, i18n } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getKeyByPath = () => {
    const listKey = Object.values(KEY_MENU_PRIVATE);
    const listPath = location.pathname.split("/");
    const removeNullPath = listPath.filter((item) => item);

    const findIndex = listKey.findIndex((item) => item === removeNullPath[0]);

    if (findIndex >= 0) {
      return listKey[findIndex];
    } else return "";
  };

  const handleSetProfile = (value) => {
    setProfile(value);
  };

  const handleLanguageChange = (value) => {
    localStorage.setItem("language", value);
    i18n.changeLanguage(value);
  };

  const getProfile = async () => {
    const res = await axios.get(
      `${domainAPI}/auth/profile/${localStorage.getItem("idUser")}`
    );

    setProfile(res.data);
  };

  useEffect(() => {
    // getProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("idUser");
    localStorage.removeItem("name");
    navigate("/");
  };

  const itemSelect = [
    {
      label: "VI",
      value: "en",
    },
    {
      label: "JP",
      value: "jp",
    },
  ];

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
          defaultSelectedKeys={"/user"}
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
