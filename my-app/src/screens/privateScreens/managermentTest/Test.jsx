import React, { useState, useEffect } from "react";
import {
  Col,
  Table,
  Typography,
  message,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
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
  const [isShowModal, setShowModal] = useState(false);
  const [testActive, setTestActive] = useState(null);
  console.log("test", testActive);
  const getListTest = async () => {
    const res = await axios.get(`${domainAPI}/test-online`);
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
      dataIndex: "idLessonTest",
      key: "idLessonTest",
      width: "100px",
      align: "center",
    },

    {
      title: "Name Test",
      dataIndex: "nameTest",
      key: "nameTest",
      width: "100px",
      align: "center",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "descriptionTeacher",
    },

    {
      title: "Edit",
      dataIndex: "idLessonTest",
      key: "edit",
      align: "center",
      render: (value, row) => (
        <EditOutlined
          onClick={async () => {
            setTestActive(row);
            setShowModal(true);
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
      title: "Management Question",
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

  const onCancel = () => {
    setShowModal(false);
    setTestActive(null);
  };

  const onFinish = (value) => {
    console.log("value", value);
  };

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>Managerment Test</Title>
      </Col>

      <Col span={24} className="col-btn">
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Test
        </Button>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={listTest} scroll={{ x: 1000 }} />
      </Col>

      <Modal
        footer={false}
        onCancel={onCancel}
        open={isShowModal}
        title={!testActive ? "Add Test" : "Edit Test"}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name={"nameTest"} label="Name test">
            <Input />
          </Form.Item>
          <Form.Item name={"description"} label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>

        <Form.Item>
          <Button onClick={onCancel}>Cancel</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Modal>
    </RowStyled>
  );
};

export default Test;
