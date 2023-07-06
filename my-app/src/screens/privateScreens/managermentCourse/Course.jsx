import React, { useState, useEffect } from "react";
import { Col, Table, Typography, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  EditOutlined,
  FileSearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled, ImageStyled } from "./styled";

const { Title } = Typography;

const Course = () => {
  const [listCourse, setListCourse] = useState([]);
  const navigate = useNavigate();

  const getListCourse = async () => {
    const res = await axios.get(`${domainAPI}/course`);
    setListCourse(res.data);
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${domainAPI}/course/delete/${id}`);
      message.success("Delete course success!!!");
    } catch (error) {
      message.error("Delete course error!!!");
    }
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
      align: "center",
    },
    {
      title: "Numbers Test",
      dataIndex: "numberTest",
      key: "numberTest",
      width: "50px",
      align: "center",
    },
    {
      title: "Numbers Lesson",
      dataIndex: "numberLession",
      key: "numberLession",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
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
      dataIndex: "nameCourse",
      key: "edit",
      render: (value) => (
        <EditOutlined
          onClick={() => {
            navigate(`/course/edit/${value}`);
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },

    {
      title: "Delete",
      dataIndex: "idCourse",
      key: "delete",
      render: (value) => (
        <DeleteOutlined
          onClick={async () => {
            await deleteCourse(value);
            await getListCourse();
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },

    {
      title: "Managerment Lesson",
      dataIndex: "idCourse",
      key: "lesson",
      align: "center",
      render: (value) => (
        <FileSearchOutlined
          onClick={() => navigate(`${value}/lesson`)}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },

    {
      title: "Managerment Progress",
      dataIndex: "idCourse",
      key: "progress",
      align: "center",
      render: (value) => (
        <FileSearchOutlined
          onClick={() => navigate(`${value}/progress`)}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>Managerment Course</Title>
      </Col>

      <Col span={24} className="col-btn">
        <Button onClick={() => navigate("/course/add-course")}>
          Add Course
        </Button>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={listCourse} scroll={{ x: 1500 }} />
      </Col>
    </RowStyled>
  );
};

export default Course;
