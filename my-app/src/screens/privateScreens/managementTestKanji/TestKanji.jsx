import React, { useState, useEffect } from "react";
import { Col, Table, Typography, message, Image, Button } from "antd";
import axios from "axios";

import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled } from "./styled";

const { Title } = Typography;

const Test = () => {
  const [listTest, setListTest] = useState([]);
  const getListTest = async () => {
    const res = await axios.get(`${domainAPI}/write-kanji/practice-kanji`);
    setListTest(res.data);
  };

  const deleteTest = async (id) => {
    try {
      await axios.delete(`${domainAPI}/test/delete/${id}`);
      message.success("Delete testsuccess!!!");
    } catch (error) {
      message.error("Delete test error!!!");
    }
  };

  useEffect(() => {
    getListTest();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "100px",
      align: "center",
    },

    {
      title: "Name Test",
      dataIndex: "namePractice",
      key: "namePractice",
      width: "100px",
      align: "center",
    },

    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },

    {
      title: "Edit",
      dataIndex: "idTeacher",
      key: "edit",
      align: "center",
      render: (value) => (
        <EditOutlined
          onClick={async () => {
            await deleteTest(value);
            await getListTest();
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },

    {
      title: "Delete",
      dataIndex: "idTeacher",
      key: "edit",
      align: "center",
      render: (value) => (
        <DeleteOutlined
          onClick={async () => {
            await deleteTest(value);
            await getListTest();
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },

    {
      title: "Management Kanji Test",
      dataIndex: "idTeacher",
      key: "edit",
      align: "center",
      render: (value) => (
        <FileSearchOutlined
          onClick={async () => {
            await deleteTest(value);
            await getListTest();
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>Managerment Test Kanji</Title>
      </Col>

      <Col span={24} className="col-btn">
        <Button>Add Test Kanji</Button>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={listTest} scroll={{ x: 1000 }} />
      </Col>
    </RowStyled>
  );
};

export default Test;
