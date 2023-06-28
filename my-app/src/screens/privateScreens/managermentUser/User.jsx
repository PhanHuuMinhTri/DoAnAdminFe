import React, { useState, useEffect } from "react";
import { Col, Table, Typography, message, Image } from "antd";
import axios from "axios";

import { DeleteOutlined } from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled } from "./styled";
import { TYPE_LESSON } from "../../../constants/common";

const { Title } = Typography;

const User = () => {
  const [listUser, setListUser] = useState([]);
  const getListUser = async () => {
    const res = await axios.get(`${domainAPI}/auth/user`);
    setListUser(res.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${domainAPI}/auth/delete/${id}`);
      message.success("Delete user success!!!");
    } catch (error) {
      message.error("Delete user error!!!");
    }
  };

  useEffect(() => {
    getListUser();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "IdUser",
      key: "IdUser",
      width: "100px",
      align: "center",
    },

    {
      title: "Email",
      dataIndex: "EmailAddress",
      key: "EmailAddress",
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
      dataIndex: "IdUser",
      key: "edit",
      align: "center",
      render: (value) => (
        <DeleteOutlined
          onClick={async () => {
            await deleteUser(value);
            await getListUser();
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>Managerment User</Title>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={listUser} scroll={{ x: 1000 }} />
      </Col>
    </RowStyled>
  );
};

export default User;
