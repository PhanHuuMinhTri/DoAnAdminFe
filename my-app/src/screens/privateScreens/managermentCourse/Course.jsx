import React, { useState, useEffect } from "react";
import { Col, Table, Typography } from "antd";
import axios from "axios";

import { EditOutlined, FileSearchOutlined } from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled, ImageStyled } from "./styled";

const { Title } = Typography;

const Course = () => {
  const [listCourse, setListCourse] = useState([]);

  const getListCourse = async () => {
    const res = await axios.get(`${domainAPI}/course`);
    setListCourse(res.data);
  };

  useEffect(() => {
    getListCourse();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "idCourse",
      key: "idCourse",
      width: "100px",
    },
    {
      title: "Name Course",
      dataIndex: "nameCourse",
      key: "nameCourse",
      width: "200px",
    },
    {
      title: "Numbers Test",
      dataIndex: "numberTest",
      key: "numberTest",
      width: "50px",
    },
    {
      title: "Numbers Lesson",
      dataIndex: "numberLession",
      key: "numberLession",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Image Course",
      dataIndex: "imageCourse",
      key: "imageCourse",
      render: (value) => (
        <ImageStyled src={value} alt="imageCourse" preview={false} />
      ),
    },
    {
      title: "Teacher",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (value) => (
        <ImageStyled src={value} alt="avatar" preview={false} />
      ),
    },

    {
      title: "Edit",
      dataIndex: "id",
      key: "edit",
      render: (value) => (
        <EditOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      ),
    },

    {
      title: "Managerment Lesson",
      dataIndex: "id",
      key: "lesson",
      render: (value) => (
        <FileSearchOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      ),
    },
  ];

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>Managerment User</Title>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={listCourse} scroll={{ x: 1500 }} />
      </Col>
    </RowStyled>
  );
};

export default Course;
