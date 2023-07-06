import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Col,
  Table,
  Typography,
  Button,
  message,
  Input,
  Modal,
  Form,
  Space,
  Row,
  Checkbox,
} from "antd";
import axios from "axios";

import {
  EditOutlined,
  FileSearchOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import { domainAPI } from "../../../configs/dev";

import { RowStyled, ModalStyled } from "./styled";
import { TYPE_SHOW } from "../../../constants/common";

const { Title } = Typography;

const QuestionTest = () => {
  const [listQuestion, setListQuestion] = useState([]);
  const [show, setShow] = useState("");
  const [initValue, setInitValue] = useState({});
  const [initValueOption, setInitValueOption] = useState({ options: [] });
  const [questionActive, setQuestionActive] = useState(null);

  const { id } = useParams();
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initValue);
  }, [form, initValue]);

  const getListQuestion = async () => {
    const res = await axios.get(`${domainAPI}/question/lesson-question/${id}`);
    setListQuestion(res.data);
  };

  const getInfoQuestion = async (id) => {
    const res = await axios.get(`${domainAPI}/question/${id}`);
    setInitValue({ question: res.data[0].question });
    setShow(TYPE_SHOW.ADD_QUESTION);
  };

  const getListOptions = async (id) => {
    const res = await axios.get(`${domainAPI}/question/${id}/options`);
    const arrayInitValue = res.data.map((item) => ({
      idOption: item.idOption,
      optionText: item.optionText,
      isCorrect: item.isCorrect === 1,
    }));

    form1.setFieldsValue({ options: arrayInitValue });
    setInitValueOption({ options: arrayInitValue });
    setQuestionActive(id);
    setShow(TYPE_SHOW.ADD_OPTIONS);
  };

  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`${domainAPI}/question/delete/${id}`);
      message.success("Delete question success!!!");
    } catch (error) {
      message.error("Delete question error!!!");
    }
  };

  useEffect(() => {
    getListQuestion();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "idQuestion",
      key: "idQuestion",
      width: "100px",
      align: "center",
    },

    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      align: "center",
    },

    {
      title: "Edit",
      dataIndex: "idQuestion",
      key: "edit",
      align: "center",
      render: (value) => (
        <EditOutlined
          onClick={() => {
            getInfoQuestion(value);
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },

    {
      title: "Delete",
      dataIndex: "idQuestion",
      key: "edit",
      align: "center",
      render: (value) => (
        <DeleteOutlined
          onClick={async () => {
            await deleteQuestion(value);
            await getListQuestion();
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },

    {
      title: "Managerment options",
      dataIndex: "idQuestion",
      key: "options",
      align: "center",
      render: (value) => (
        <FileSearchOutlined
          onClick={() => {
            getListOptions(value);
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  console.log("init", initValueOption);

  const onCancel = () => {
    setShow("");
    setInitValue({});
    form.resetFields();
  };

  const onCacelFormOption = () => {
    setShow("");
    setQuestionActive(null);
    setInitValueOption({ options: [] });
  };

  const onFinish = async (value) => {
    try {
      if (initValue?.quesiton) {
        await axios.post(`${domainAPI}/question/edit`, {
          ...value,
          idQuestion: initValue?.idQuestion,
        });
        await getListQuestion();
      } else {
        await axios.post(`${domainAPI}/question/add`, {
          ...value,
          idLesson: id,
        });
        await getListQuestion();
      }

      form.resetFields();
      setInitValueOption({ options: [] });
      setQuestionActive(null);
      setShow("");
      message.success("Update question success!");
    } catch (error) {}
  };

  const onFinishUploadOption = async (value) => {
    await axios.post(
      `${domainAPI}/question/${questionActive}/options/upload`,
      value
    );
    message.success("Update option success!!!");
    form1.resetFields();
    setShow("");
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  return (
    <RowStyled>
      <Col span={24}>
        <Title style={{ textAlign: "center" }}>
          Managerment questions test
        </Title>
      </Col>

      <Col span={24} className="col-btn">
        <Button onClick={() => setShow(TYPE_SHOW.ADD_QUESTION)}>
          Add question
        </Button>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={listQuestion}
          scroll={{ x: 1500 }}
        />
      </Col>

      <Modal
        onCancel={onCancel}
        open={show === TYPE_SHOW.ADD_QUESTION}
        footer={false}
        title="Add question"
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
            label="Question"
            name="question"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập câu hỏi",
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
              Add question
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ModalStyled
        onCancel={onCacelFormOption}
        open={show === TYPE_SHOW.ADD_OPTIONS}
        footer={false}
        title="Update option"
      >
        <Form
          layout="vertical"
          name="control-hooks"
          form={form1}
          initialValues={initValueOption}
          onFinish={onFinishUploadOption}
          {...formItemLayoutWithOutLabel}
          style={{ maxWidth: "100%" }}
        >
          <Form.List
            name="options"
            rules={[
              {
                validator: async (_, options) => {
                  if (!options || options.length < 4) {
                    return Promise.reject(new Error("At least 4 option"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Row>
                      <Col span={19}>
                        <Form.Item
                          {...restField}
                          name={[name, "optionText"]}
                          rules={[
                            { required: true, message: "Missing option text" },
                          ]}
                        >
                          <Input placeholder="Option" />
                        </Form.Item>
                      </Col>

                      <Col span={2} offset={1}>
                        <Form.Item
                          {...restField}
                          valuePropName="checked"
                          name={[name, "isCorrect"]}
                        >
                          <Checkbox />
                        </Form.Item>
                      </Col>

                      <Col span={2}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  </Space>
                ))}

                <Form.ErrorList errors={errors} />

                {fields.length < 4 && (
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button style={{ marginRight: "20px" }} onClick={onCacelFormOption}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update option
            </Button>
          </Form.Item>
        </Form>
      </ModalStyled>
    </RowStyled>
  );
};

export default QuestionTest;
