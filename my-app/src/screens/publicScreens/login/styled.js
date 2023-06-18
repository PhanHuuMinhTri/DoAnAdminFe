import styled from "styled-components";

import { Layout } from "antd";

const { Content } = Layout;

export const LoginStyled = styled(Content)`
  height: 100%;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .login-form {
    min-width: 500px;

    .ant-input-affix-wrapper {
      height: 50px;

      .ant-input {
        font-size: 16px;
      }
    }

    .ant-btn {
      font-size: 16px;
      font-weight: 500;
      background-color: rgb(91, 189, 43);
      height: 40px;
    }
  }

  .login-form-button {
    width: 100%;
  }
`;
