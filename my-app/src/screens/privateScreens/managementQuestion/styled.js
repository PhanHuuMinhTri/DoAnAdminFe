import styled from "styled-components";
import { Image, Row, Modal } from "antd";

export const ImageStyled = styled(Image)`
  width: 100px;
  height: 100px;
`;

export const RowStyled = styled(Row)`
  .col-btn {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;

    .ant-btn {
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

export const ModalStyled = styled(Modal)`
  .ant-form-item-explain-error {
    color: red;
  }
  .ant-space-item {
    width: 100%;

    .ant-input {
      margin-right: 10px;
    }
  }
`;
