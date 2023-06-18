import React, { useEffect, useState, createContext } from "react";
import { useTranslation } from "react-i18next";
import { useOutlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import axios from "axios";
import { domainAPI } from "../../configs/dev";
import { KEY_MENU_PRIVATE } from "../../constants/common";

import { PublicLayoutStyle, HeaderStyled, MenuItem } from "./styled";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
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
    navigate("/login");
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
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {outlet}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
