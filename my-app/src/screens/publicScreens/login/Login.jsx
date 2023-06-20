import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Form, Input, Typography, notification } from "antd";
import axios from "axios";
import { domainAPI } from "../../../configs/dev";
import { Link, useNavigate } from "react-router-dom";

import { LoginStyled } from "./styled";

const { Title } = Typography;

const LoginScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await axios.post(`${domainAPI}/auth/login`, { values });
      localStorage.setItem("isLogin", true);
      localStorage.setItem("idUser", res.data.idUser);
      localStorage.setItem("name", res.data.name);
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      notification.error({
        message: t("loginPage.username_password_invalid"),
      });
    }
  };

  return (
    <LoginStyled>
      <Title>Admin TriChan {t("loginPage.sign_in")}</Title>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              message: t("loginPage.please_input_username"),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t("loginPage.user_name")}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t("loginPage.please_input_password"),
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("loginPage.password")}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t("loginPage.remeber_me")}</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {t("loginPage.sign_in")}
          </Button>
        </Form.Item>
      </Form>
    </LoginStyled>
  );
};
export default LoginScreen;
