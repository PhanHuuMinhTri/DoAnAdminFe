import React, { useState, useEffect } from "react";
import {
  Col,
  Table,
  Typography,
  message,
  Image,
  Button,
  Form,
  Modal,
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

import { RowStyled, ButtonStyled } from "./styled";

const { Title } = Typography;

const Test = () => {
  const [listTest, setListTest] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [testActive, setTestActive] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue(testActive);
  }, [form, testActive]);

  const getListTest = async () => {
    const res = await axios.get(`${domainAPI}/write-kanji/practice-kanji`);
    setListTest(res.data);
  };

  const deleteTest = async (id) => {
    try {
      await axios.delete(`${domainAPI}/write-kanji/delete/${id}`);
      message.success("Delete testsuccess!!!");
    } catch (error) {
      message.error("Delete test error!!!");
    }
  };

  const onCancel = () => {
    setShowModal(false);
    setTestActive(null);
    form.resetFields();
  };

  const onFinish = async (value) => {
    if (testActive) {
      try {
        const payload = { ...value, id: testActive?.id };

        await axios.post(`${domainAPI}/write-kanji/edit`, payload);
        message.success("Edit test sucess!!!");
        await getListTest();
      } catch (error) {
        console.log("err", error);
        message.error("Edit test error!!!");
      }
    } else {
      try {
        await axios.post(`${domainAPI}/write-kanji/add`, value);
        message.success("Add test sucess!!!");
        await getListTest();
      } catch (error) {
        console.log("err", error);
        message.error("Add test error!!!");
      }
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
      dataIndex: "id",
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
      dataIndex: "id",
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
      dataIndex: "id",
      key: "edit",
      align: "center",
      render: (value) => (
        <FileSearchOutlined
          onClick={async () => {
            navigate(`/test-kanji/${value}/kanji`);
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
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Test Kanji
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
          <Form.Item name="level" label="Level">
            <Input />
          </Form.Item>
          <Form.Item name="namePractice" label="Name Test">
            <Input />
          </Form.Item>

          <Form.Item>
            <ButtonStyled onClick={onCancel} className="btn-left">
              Cancel
            </ButtonStyled>
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
