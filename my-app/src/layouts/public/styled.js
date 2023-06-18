import styled from "styled-components";
import { Layout, Row, Button } from "antd";

export const PublicLayoutStyle = styled(Layout)`
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-image: url("https://dungmori.com/assets/img/new_home/x-o-bg.svg");

  .bottom-header {
    height: 1px;
    border: 1px solid #eaeaef;
  }

  .body-content {
    padding-top: 10px;
  }

  .footer {
    width: 100%;
    height: 200px;
    background-image: url("https://dungmori.com/assets/img/new_home/footer-bg.jpg");

    .col-info {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
    }
  }
`;

export const HeaderStyled = styled(Row)`
  padding: 10px 200px;

  background-color: #5bbd2b;

  .col-logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .logo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

  .col-menu {
    display: flex;
    align-items: center;
    justify-content: center;

    .ant-menu {
      width: 100%;
      color: #293142;
      font-family: "Noto Sans", sans-serif;
      font-weight: 500;
      display: flex;
      font-size: 20px;
      justify-content: center;
      background-color: transparent;
      border: none;

      .ant-menu-item-selected,
      .ant-menu-submenu-selected {
        background-color: #96d962;
        color: black;
      }
    }
  }

  .col-auth {
    display: flex;
    align-items: center;
    justify-content: center;

    .avatar {
      border-radius: 30px;
      cursor: pointer;
      margin-right: 10px;
      width: 50px;
      height: 50px;
    }

    .profile {
      display: flex;
      align-items: center;
      justify-content: center;

      .name {
        text-align: center;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
`;

export const LoginButtonStyled = styled(Button)`
  font-size: 20px;
  font-family: "Noto Sans", sans-serif;
  width: 130px;
  background-color: #33cc33;
  padding-right: 10px;
  border: none;
  height: 40px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-right: 2px solid #293142;
`;
export const RegisterButtonStyled = styled(Button)`
  font-family: "Noto Sans", sans-serif;
  font-size: 20px;
  width: 140px;
  height: 40px;
  border: none;
  background-color: #33cc33;
  margin-right: 20px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const MenuItem = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
