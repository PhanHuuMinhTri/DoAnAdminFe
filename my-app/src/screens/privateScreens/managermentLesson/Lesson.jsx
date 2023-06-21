import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Table, Typography, Button } from "antd";
import axios from "axios";

import { EditOutlined, FileSearchOutlined } from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled, ImageStyled } from "./styled";
import { TYPE_LESSON } from "../../../constants/common";

const { Title } = Typography;

const Lesson = () => {
  const [listLesson, setListLesson] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const getListLesson = async () => {
    const res = await axios.get(`${domainAPI}/lesson/course/${id}`);
    setListLesson(res.data);
  };

  useEffect(() => {
    getListLesson();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "idLesson",
      key: "idLesson",
      width: "100px",
      align: "center",
    },

    {
      title: "Type lesson",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (value) => {
        return value === TYPE_LESSON.GRAMMAR
          ? "Ngữ pháp"
          : value === TYPE_LESSON.KANJI
          ? "Kanji"
          : "Từ vựng";
      },
    },
    {
      title: "Video URL",
      dataIndex: "videoUrl",
      key: "videoUrl",
      align: "center",
    },

    {
      title: "Edit",
      dataIndex: "idLesson",
      key: "edit",
      align: "center",
      render: (value) => (
        <EditOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      ),
    },

    {
      title: "Managerment question",
      dataIndex: "idLesson",
      key: "lesson",
      align: "center",
      render: (value) => (
        <FileSearchOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      ),
    },

    {
      title: "Managerment FlashCard",
      dataIndex: "idLesson",
      key: "lesson",
      align: "center",
      render: (value) => (
        <FileSearchOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      ),
    },
  ];

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>Managerment Lesson</Title>
      </Col>

      <Col span={24} className="col-btn">
        <Button onClick={() => navigate(`/course/${id}/lesson/add`)}>
          Add Lesson
        </Button>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={listLesson} scroll={{ x: 1500 }} />
      </Col>
    </RowStyled>
  );
};

export default Lesson;
