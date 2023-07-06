import React, { useState, useEffect } from "react";
import { Col, Table, Typography, message, Image, Button } from "antd";
import axios from "axios";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled } from "./styled";

const { Title } = Typography;

const Teacher = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const getListTeacher = async () => {
    const res = await axios.get(`${domainAPI}/teacher`);
    setListTeacher(res.data);
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`${domainAPI}/teacher/delete/${id}`);
      message.success("Delete teacher success!!!");
    } catch (error) {
      message.error("Delete teacher error!!!");
    }
  };

  useEffect(() => {
    getListTeacher();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "idTeacher",
      key: "idTeacher",
      width: "100px",
      align: "center",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "100px",
      align: "center",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "100px",
      align: "center",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "descriptionTeacher",
      width: "150px",
    },

    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "Avatar",
      align: "center",
      render: (value) => <Image src={value} alt="avatar" />,
    },

    {
      title: "Edit",
      dataIndex: "idTeacher",
      key: "edit",
      align: "center",
      render: (value) => (
        <EditOutlined
          onClick={async () => {
            await deleteTeacher(value);
            await getListTeacher();
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
            await deleteTeacher(value);
            await getListTeacher();
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>Managerment Teacher</Title>
      </Col>

      <Col span={24} className="col-btn">
        <Button>Add Teacher</Button>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={listTeacher}
          scroll={{ x: 1000 }}
        />
      </Col>
    </RowStyled>
  );
};

export default Teacher;
