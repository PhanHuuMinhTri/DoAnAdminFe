import React, { useState, useEffect } from "react";
import {
  Col,
  Table,
  Typography,
  message,
  Image,
  Progress as ProgressBar,
} from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

import { DeleteOutlined } from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled } from "./styled";

const { Title } = Typography;

const Progress = () => {
  const [listProgress, setListProgress] = useState([]);
  const { id } = useParams();
  const getListProgress = async () => {
    const res = await axios.get(`${domainAPI}/progress/${id}`);
    setListProgress(res.data);
  };

  const deleteProgress = async (id) => {
    try {
      await axios.delete(`${domainAPI}/progress/delete/${id}`);
      message.success("Delete progress success!!!");
    } catch (error) {
      message.error("Delete progress error!!!");
    }
  };

  useEffect(() => {
    getListProgress();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "idProgress",
      key: "idProgress",
      width: "100px",
      align: "center",
    },

    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: "100px",
      align: "center",
    },

    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      width: "100px",
      align: "center",
      render: (value) => {
        return <ProgressBar percent={value.toFixed(1)} />;
      },
    },

    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      width: "100px",
      align: "center",
    },

    {
      title: "Avatar",
      dataIndex: "Avatar",
      key: "Avatar",
      align: "center",
      render: (value) => <Image src={value} alt="avatar" />,
    },

    {
      title: "Delete",
      dataIndex: "idProgress",
      key: "Delete",
      align: "center",
      render: (value) => (
        <DeleteOutlined
          onClick={async () => {
            await deleteProgress(value);
            await getListProgress();
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>Managerment Progress</Title>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={listProgress}
          scroll={{ x: 1000 }}
        />
      </Col>
    </RowStyled>
  );
};

export default Progress;
