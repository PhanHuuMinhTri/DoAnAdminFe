import styled from "styled-components";
import { Row, Col } from "antd";

export const RowStyled = styled(Row)`
  padding: 100px;
  .ant-form-item-label {
    font-weight: 700;

    label {
      font-size: 20px;
    }
  }

  .ant-form-item {
    width: 100%;
  }

  .ant-input {
    height: 40px;
    width: 100%;
  }

  .field-avatar {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .upload {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
  }

  .ant-image {
    width: 700px;
    height: 400px;

    img {
      width: 700px;
      height: 400px;
    }
  }
`;
