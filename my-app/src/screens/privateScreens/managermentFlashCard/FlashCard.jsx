import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Col,
  Table,
  Typography,
  Button,
  message,
  Modal,
  Input,
  Form,
} from "antd";
import axios from "axios";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled } from "./styled";

const { Title } = Typography;

const FlashCard = () => {
  const [listFlashCard, setListFlashCard] = useState([]);
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [initValue, setInitValue] = useState({});
  const [flashCardActive, setFlashCardActive] = useState(null);

  const getListFlashCard = async () => {
    const res = await axios.get(`${domainAPI}/flask-card/${id}`);
    setListFlashCard(res.data);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initValue);
  }, [form, initValue]);

  const getFlashCardInfo = async (id) => {
    const res = await axios.get(`${domainAPI}/flask-card/item/${id}`);
    setInitValue({
      idFlaskCard: res.data[0].idFlaskCard,
      sidebefore: res.data[0].sidebefore,
      sideafter: res.data[0].sideafter,
    });
    setShow(true);
  };

  const deleteFlashCard = async (id) => {
    try {
      await axios.delete(`${domainAPI}/flask-card/delete/${id}`);
      message.success("Delete flash card success!!!");
    } catch (error) {
      message.error("Delete flash card error!!!");
    }
  };

  useEffect(() => {
    getListFlashCard();
  }, []);

  const onCancel = () => {
    setShow(false);
    setInitValue({});
    setFlashCardActive(null);
    form.resetFields();
  };

  const onFinish = async (value) => {
    try {
      if (initValue?.idFlaskCard) {
        await axios.post(`${domainAPI}/flask-card/edit`, {
          ...value,
          idFlaskCard: flashCardActive,
        });
        await getListFlashCard();
      } else {
        await axios.post(`${domainAPI}/flask-card/add`, {
          ...value,
          idLesson: id,
        });
        await getListFlashCard();
      }
      form.resetFields();
      setInitValue({});
      setFlashCardActive(null);
      setShow("");
      message.success("Update flash card success!");
    } catch (error) {}
  };

  const columns = [
    {
      title: "id",
      dataIndex: "idFlaskCard",
      key: "idLesidFlaskCardson",
      width: "100px",
      align: "center",
    },

    {
      title: "Before",
      dataIndex: "sidebefore",
      key: "sideBefore",
      align: "center",
    },

    {
      title: "After",
      dataIndex: "sideafter",
      key: "sideafter",
      align: "center",
    },

    {
      title: "Edit",
      dataIndex: "idFlaskCard",
      key: "edit",
      align: "center",
      render: (value) => (
        <EditOutlined
          onClick={() => {
            setFlashCardActive(value);
            getFlashCardInfo(value);
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },

    {
      title: "Delete",
      dataIndex: "idFlaskCard",
      key: "edit",
      align: "center",
      render: (value) => (
        <DeleteOutlined
          onClick={async () => {
            await deleteFlashCard(value);
            await getListFlashCard();
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>Managerment Flash Card</Title>
      </Col>

      <Col span={24} className="col-btn">
        <Button
          onClick={() => {
            setShow(true);
          }}
        >
          Add Flash Card
        </Button>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={listFlashCard}
          scroll={{ x: 1200 }}
        />
      </Col>

      <Modal
        onCancel={onCancel}
        open={show}
        footer={false}
        title="Add flash card"
      >
        <Form
          layout="vertical"
          name="control-hooks"
          initValue={initValue}
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: "100%" }}
        >
          <Form.Item
            label="Side before"
            name="sidebefore"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mặt trước",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Side after"
            name="sideafter"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mặt sau",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button style={{ marginRight: "20px" }} onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Add flashcard
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </RowStyled>
  );
};

export default FlashCard;
