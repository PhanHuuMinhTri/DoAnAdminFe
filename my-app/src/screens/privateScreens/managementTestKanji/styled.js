import styled from "styled-components";
import { Image, Row } from "antd";

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

  .ant-image-img {
    width: 200px;
    height: 100px;
  }
`;
