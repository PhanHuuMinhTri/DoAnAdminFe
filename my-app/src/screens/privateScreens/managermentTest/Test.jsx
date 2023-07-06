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

import { useNavigate } from "react-router-dom";

import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled } from "./styled";

const { Title } = Typography;

const Test = () => {
  const navigate = useNavigate();
  const [listTest, setListTest] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [testActive, setTestActive] = useState(null);

  useEffect(() => {
    form.setFieldsValue(testActive);
  }, [form, testActive]);

  const getListTest = async () => {
    const res = await axios.get(`${domainAPI}/test-online`);
    setListTest(res.data);
  };

  const deleteTest = async (id) => {
    try {
      await axios.delete(`${domainAPI}/test-online/delete/${id}`);
      message.success("Delete test success!!!");
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
      dataIndex: "idLessonTest",
      key: "idLessonTest",
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
      dataIndex: "idLessonTest",
      key: "edit",
      align: "center",
      render: (value) => (
        <FileSearchOutlined
          onClick={async () => {
            navigate(`/test/${value}/questions`);
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  const onCancel = () => {
    setShowModal(false);
    setTestActive(null);
    form.resetFields();
  };

  const onFinish = async (value) => {
    if (testActive) {
      try {
        const payload = { ...value, idLessonTest: testActive?.idLessonTest };

        await axios.post(`${domainAPI}/test-online/edit`, payload);
        message.success("Edit test sucess!!!");
        await getListTest();
      } catch (error) {
        console.log("err", error);
        message.error("Edit test error!!!");
      }
    } else {
      try {
        await axios.post(`${domainAPI}/test-online/add`, value);
        message.success("Add test sucess!!!");
        await getListTest();
      } catch (error) {
        console.log("err", error);
        message.error("Add test error!!!");
      }
    }
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
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="nameTest" label="Name test">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button onClick={onCancel}>Cancel</Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </RowStyled>
  );
};

export default Test;
